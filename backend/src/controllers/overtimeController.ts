import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { AuthenticatedRequest } from "../types"

const prisma = new PrismaClient()

export const getOvertimeEntries = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const overtimeEntries = await prisma.overtimeEntry.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                date: "desc",
            },
        })

        res.json(overtimeEntries)
    } catch (error) {
        console.error("Get overtime entries error:", error)
        res.status(500).json({ message: "Failed to fetch overtime entries" })
    }
}

// Get all overtime entries (for timetable - managers/admins can see everyone's)
export const getAllOvertimeEntries = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const overtimeEntries = await prisma.overtimeEntry.findMany({
            include: {
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
                date: "desc",
            },
        })

        res.json(overtimeEntries)
    } catch (error) {
        console.error("Get all overtime entries error:", error)
        res.status(500).json({ message: "Failed to fetch all overtime entries" })
    }
}

export const createOvertimeEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { date, hours, description, category } = req.body

        // Validate required fields
        if (!date || !hours) {
            res.status(400).json({ message: "Missing required fields" })
            return
        }

        // Validate hours
        if (hours <= 0 || hours > 24) {
            res.status(400).json({ message: "Hours must be between 0 and 24" })
            return
        }

        // Create overtime entry
        const overtimeEntry = await prisma.overtimeEntry.create({
            data: {
                userId: req.user.id,
                date: new Date(date),
                hours: parseFloat(hours),
                description: description || "",
                category: category || "REGULAR",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })

        res.status(201).json(overtimeEntry)
    } catch (error) {
        console.error("Create overtime entry error:", error)
        res.status(500).json({ message: "Failed to create overtime entry" })
    }
}

export const updateOvertimeEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { id } = req.params
        const { date, hours, description, category } = req.body

        // Check if overtime entry exists and belongs to user
        const existingEntry = await prisma.overtimeEntry.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        })

        if (!existingEntry) {
            res.status(404).json({ message: "Overtime entry not found" })
            return
        }

        // Only allow updates if status is pending
        if (existingEntry.status !== "PENDING") {
            res.status(400).json({ message: "Cannot update non-pending overtime entry" })
            return
        }

        // Validate hours if provided
        if (hours && (hours <= 0 || hours > 24)) {
            res.status(400).json({ message: "Hours must be between 0 and 24" })
            return
        }

        // Update overtime entry
        const updatedEntry = await prisma.overtimeEntry.update({
            where: { id },
            data: {
                date: date ? new Date(date) : undefined,
                hours: hours ? parseFloat(hours) : undefined,
                description: description || undefined,
                category: category || undefined,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })

        res.json(updatedEntry)
    } catch (error) {
        console.error("Update overtime entry error:", error)
        res.status(500).json({ message: "Failed to update overtime entry" })
    }
}

export const deleteOvertimeEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { id } = req.params

        // Check if overtime entry exists and belongs to user
        const existingEntry = await prisma.overtimeEntry.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        })

        if (!existingEntry) {
            res.status(404).json({ message: "Overtime entry not found" })
            return
        }

        // Only allow deletion if status is pending
        if (existingEntry.status !== "PENDING") {
            res.status(400).json({ message: "Cannot delete non-pending overtime entry" })
            return
        }

        // Delete overtime entry
        await prisma.overtimeEntry.delete({
            where: { id },
        })

        res.status(204).send()
    } catch (error) {
        console.error("Delete overtime entry error:", error)
        res.status(500).json({ message: "Failed to delete overtime entry" })
    }
}

// Get all pending overtime entries (for admins/managers)
export const getPendingOvertimeEntries = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }
        if (req.user.role !== "ADMIN" && req.user.role !== "MANAGER") {
            res.status(403).json({ message: "Access denied. Admin or manager role required." })
            return
        }
        const pendingEntries = await prisma.overtimeEntry.findMany({
            where: { status: "PENDING" },
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
            orderBy: { date: "desc" },
        })
        res.json(pendingEntries)
    } catch (error) {
        console.error("Get pending overtime entries error:", error)
        res.status(500).json({ message: "Failed to fetch pending overtime entries" })
    }
}

// Approve an overtime entry (for admins/managers)
export const approveOvertimeEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }
        if (req.user.role !== "ADMIN" && req.user.role !== "MANAGER") {
            res.status(403).json({ message: "Access denied. Admin or manager role required." })
            return
        }
        const { id } = req.params
        const entry = await prisma.overtimeEntry.findUnique({ where: { id }, include: { user: true } })
        if (!entry) {
            res.status(404).json({ message: "Overtime entry not found" })
            return
        }
        if (entry.status !== "PENDING") {
            res.status(400).json({ message: "Cannot approve non-pending overtime entry" })
            return
        }
        const updated = await prisma.overtimeEntry.update({
            where: { id },
            data: {
                status: "APPROVED",
                approvedBy: req.user.id,
                approvedAt: new Date(),
            },
        })
        // Optionally, create a TOIL entry for the user
        await prisma.tOILEntry.create({
            data: {
                userId: entry.userId,
                earnedDate: entry.date,
                hours: entry.hours,
                expiryDate: new Date(new Date(entry.date).setFullYear(new Date(entry.date).getFullYear() + 1)),
                status: "ACTIVE",
            },
        })
        res.json(updated)
    } catch (error) {
        console.error("Approve overtime entry error:", error)
        res.status(500).json({ message: "Failed to approve overtime entry" })
    }
}

// Reject an overtime entry (for admins/managers)
export const rejectOvertimeEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }
        if (req.user.role !== "ADMIN" && req.user.role !== "MANAGER") {
            res.status(403).json({ message: "Access denied. Admin or manager role required." })
            return
        }
        const { id } = req.params
        const entry = await prisma.overtimeEntry.findUnique({ where: { id } })
        if (!entry) {
            res.status(404).json({ message: "Overtime entry not found" })
            return
        }
        if (entry.status !== "PENDING") {
            res.status(400).json({ message: "Cannot reject non-pending overtime entry" })
            return
        }
        const updated = await prisma.overtimeEntry.update({
            where: { id },
            data: {
                status: "REJECTED",
                approvedBy: req.user.id,
                approvedAt: new Date(),
            },
        })
        res.json(updated)
    } catch (error) {
        console.error("Reject overtime entry error:", error)
        res.status(500).json({ message: "Failed to reject overtime entry" })
    }
}
