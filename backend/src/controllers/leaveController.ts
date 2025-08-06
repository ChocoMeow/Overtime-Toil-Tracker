import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { AuthenticatedRequest } from "../types"

const prisma = new PrismaClient()

export const getLeaveRequests = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const leaveRequests = await prisma.leaveRequest.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                leaveType: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        res.json(leaveRequests)
    } catch (error) {
        console.error("Get leave requests error:", error)
        res.status(500).json({ message: "Failed to fetch leave requests" })
    }
}

// Get all leave requests (for timetable - managers/admins can see everyone's)
export const getAllLeaveRequests = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const leaveRequests = await prisma.leaveRequest.findMany({
            include: {
                leaveType: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        department: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        res.json(leaveRequests)
    } catch (error) {
        console.error("Get all leave requests error:", error)
        res.status(500).json({ message: "Failed to fetch all leave requests" })
    }
}

/**
 * Create a new leave request
 *
 * @body {string} leaveTypeId - The ID of the leave type
 * @body {string} startDate - Start date in YYYY-MM-DD format
 * @body {string} endDate - End date in YYYY-MM-DD format
 * @body {string} [startTime] - Start time in HH:MM format (optional, defaults to 09:00)
 * @body {string} [endTime] - End time in HH:MM format (optional, defaults to 17:00)
 * @body {string} [reason] - Reason for leave (optional)
 *
 * @returns {Object} The created leave request with user and leave type details
 */
export const createLeaveRequest = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { leaveTypeId, startDate, endDate, startTime, endTime, reason } = req.body

        // Validate required fields
        if (!leaveTypeId || !startDate || !endDate) {
            res.status(400).json({ message: "Missing required fields" })
            return
        }

        // Check if leave type exists
        const leaveType = await prisma.leaveType.findUnique({
            where: { id: leaveTypeId },
        })

        if (!leaveType) {
            res.status(404).json({ message: "Leave type not found" })
            return
        }

        // Combine date and time for start and end dates
        const startDateTime = startTime ? new Date(`${startDate}T${startTime}`) : new Date(startDate)
        const endDateTime = endTime ? new Date(`${endDate}T${endTime}`) : new Date(endDate)

        // Create leave request
        const leaveRequest = await prisma.leaveRequest.create({
            data: {
                userId: req.user.id,
                leaveTypeId,
                startDate: startDateTime,
                endDate: endDateTime,
                reason: reason || "",
            },
            include: {
                leaveType: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })

        res.status(201).json(leaveRequest)
    } catch (error) {
        console.error("Create leave request error:", error)
        res.status(500).json({ message: "Failed to create leave request" })
    }
}

/**
 * Update an existing leave request
 *
 * @param {string} id - The leave request ID
 * @body {string} [startDate] - Start date in YYYY-MM-DD format
 * @body {string} [endDate] - End date in YYYY-MM-DD format
 * @body {string} [startTime] - Start time in HH:MM format
 * @body {string} [endTime] - End time in HH:MM format
 * @body {string} [reason] - Reason for leave
 *
 * @returns {Object} The updated leave request with user and leave type details
 */
export const updateLeaveRequest = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { id } = req.params
        const { startDate, endDate, startTime, endTime, reason } = req.body

        // Check if leave request exists and belongs to user
        const existingRequest = await prisma.leaveRequest.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        })

        if (!existingRequest) {
            res.status(404).json({ message: "Leave request not found" })
            return
        }

        // Only allow updates if status is pending
        if (existingRequest.status !== "PENDING") {
            res.status(400).json({ message: "Cannot update non-pending leave request" })
            return
        }

        // Combine date and time for start and end dates if provided
        const startDateTime = startDate && startTime ? new Date(`${startDate}T${startTime}`) : startDate ? new Date(startDate) : undefined
        const endDateTime = endDate && endTime ? new Date(`${endDate}T${endTime}`) : endDate ? new Date(endDate) : undefined

        // Update leave request
        const updatedRequest = await prisma.leaveRequest.update({
            where: { id },
            data: {
                startDate: startDateTime,
                endDate: endDateTime,
                reason: reason || undefined,
            },
            include: {
                leaveType: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })

        res.json(updatedRequest)
    } catch (error) {
        console.error("Update leave request error:", error)
        res.status(500).json({ message: "Failed to update leave request" })
    }
}

export const deleteLeaveRequest = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { id } = req.params

        // Check if leave request exists and belongs to user
        const existingRequest = await prisma.leaveRequest.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        })

        if (!existingRequest) {
            res.status(404).json({ message: "Leave request not found" })
            return
        }

        // Only allow deletion if status is pending
        if (existingRequest.status !== "PENDING") {
            res.status(400).json({ message: "Cannot delete non-pending leave request" })
            return
        }

        // Delete leave request
        await prisma.leaveRequest.delete({
            where: { id },
        })

        res.status(204).send()
    } catch (error) {
        console.error("Delete leave request error:", error)
        res.status(500).json({ message: "Failed to delete leave request" })
    }
}

// Get all pending leave requests (for managers/admins)
export const getPendingLeaveRequests = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        // Check if user is manager or admin
        if (req.user.role !== "MANAGER" && req.user.role !== "ADMIN") {
            res.status(403).json({ message: "Access denied. Manager or admin role required." })
            return
        }

        const pendingRequests = await prisma.leaveRequest.findMany({
            where: {
                status: "PENDING",
            },
            include: {
                leaveType: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        department: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        res.json(pendingRequests)
    } catch (error) {
        console.error("Get pending leave requests error:", error)
        res.status(500).json({ message: "Failed to fetch pending leave requests" })
    }
}

// Approve or reject a leave request (for managers/admins)
export const updateLeaveRequestStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        // Check if user is manager or admin
        if (req.user.role !== "MANAGER" && req.user.role !== "ADMIN") {
            res.status(403).json({ message: "Access denied. Manager or admin role required." })
            return
        }

        const { id } = req.params
        const { status } = req.body

        // Validate status
        if (!["APPROVED", "REJECTED"].includes(status)) {
            res.status(400).json({ message: "Invalid status. Must be 'APPROVED' or 'REJECTED'" })
            return
        }

        // Check if leave request exists
        const existingRequest = await prisma.leaveRequest.findUnique({
            where: { id },
            include: {
                user: true,
                leaveType: true,
            },
        })

        if (!existingRequest) {
            res.status(404).json({ message: "Leave request not found" })
            return
        }

        // Only allow status updates for pending requests
        if (existingRequest.status !== "PENDING") {
            res.status(400).json({ message: "Cannot update status of non-pending leave request" })
            return
        }

        // Update leave request status
        const updatedRequest = await prisma.leaveRequest.update({
            where: { id },
            data: {
                status,
                approvedBy: req.user.id,
                approvedAt: new Date(),
            },
            include: {
                leaveType: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        department: true,
                    },
                },
            },
        })

        // If approved, update leave balance
        if (status === "APPROVED") {
            const startDate = new Date(existingRequest.startDate)
            const endDate = new Date(existingRequest.endDate)
            const daysRequested = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
            const year = startDate.getFullYear()

            // Find or create leave balance for this year
            const leaveBalance = await prisma.leaveBalance.upsert({
                where: {
                    userId_leaveTypeId_year: {
                        userId: existingRequest.userId,
                        leaveTypeId: existingRequest.leaveTypeId,
                        year,
                    },
                },
                update: {
                    currentBalance: {
                        decrement: daysRequested,
                    },
                    totalUsed: {
                        increment: daysRequested,
                    },
                },
                create: {
                    userId: existingRequest.userId,
                    leaveTypeId: existingRequest.leaveTypeId,
                    currentBalance: -daysRequested,
                    totalEarned: 0,
                    totalUsed: daysRequested,
                    year,
                },
            })
        }

        res.json(updatedRequest)
    } catch (error) {
        console.error("Update leave request status error:", error)
        res.status(500).json({ message: "Failed to update leave request status" })
    }
}

export const getLeaveBalance = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const currentYear = new Date().getFullYear()

        const leaveBalances = await prisma.leaveBalance.findMany({
            where: {
                userId: req.user.id,
                year: currentYear,
            },
            include: {
                leaveType: true,
            },
        })

        res.json(leaveBalances)
    } catch (error) {
        console.error("Get leave balance error:", error)
        res.status(500).json({ message: "Failed to fetch leave balance" })
    }
}

export const getLeaveTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const leaveTypes = await prisma.leaveType.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                name: "asc",
            },
        })

        res.json(leaveTypes)
    } catch (error) {
        console.error("Get leave types error:", error)
        res.status(500).json({ message: "Failed to fetch leave types" })
    }
}
