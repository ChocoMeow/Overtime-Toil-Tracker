import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { AuthenticatedRequest } from "../types"

const prisma = new PrismaClient()

export const getTOILEntries = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const toilEntries = await prisma.tOILEntry.findMany({
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
                earnedDate: "desc",
            },
        })

        res.json(toilEntries)
    } catch (error) {
        console.error("Get TOIL entries error:", error)
        res.status(500).json({ message: "Failed to fetch TOIL entries" })
    }
}

// Get all TOIL entries (for timetable - managers/admins can see everyone's)
export const getAllTOILEntries = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const toilEntries = await prisma.tOILEntry.findMany({
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
                earnedDate: "desc",
            },
        })

        res.json(toilEntries)
    } catch (error) {
        console.error("Get all TOIL entries error:", error)
        res.status(500).json({ message: "Failed to fetch all TOIL entries" })
    }
}

export const createTOILEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { earnedDate, hours, expiryDate } = req.body

        // Validate required fields
        if (!earnedDate || !hours) {
            res.status(400).json({ message: "Missing required fields" })
            return
        }

        // Validate hours
        if (hours <= 0) {
            res.status(400).json({ message: "Hours must be greater than 0" })
            return
        }

        // Set default expiry date to 1 year from earned date if not provided
        const defaultExpiryDate = new Date(earnedDate)
        defaultExpiryDate.setFullYear(defaultExpiryDate.getFullYear() + 1)

        // Create TOIL entry
        const toilEntry = await prisma.tOILEntry.create({
            data: {
                userId: req.user.id,
                earnedDate: new Date(earnedDate),
                hours: parseFloat(hours),
                expiryDate: expiryDate ? new Date(expiryDate) : defaultExpiryDate,
                status: "ACTIVE",
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

        res.status(201).json(toilEntry)
    } catch (error) {
        console.error("Create TOIL entry error:", error)
        res.status(500).json({ message: "Failed to create TOIL entry" })
    }
}

export const updateTOILEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { id } = req.params
        const { earnedDate, hours, expiryDate, status } = req.body

        // Check if TOIL entry exists and belongs to user
        const existingEntry = await prisma.tOILEntry.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        })

        if (!existingEntry) {
            res.status(404).json({ message: "TOIL entry not found" })
            return
        }

        // Validate hours if provided
        if (hours && hours <= 0) {
            res.status(400).json({ message: "Hours must be greater than 0" })
            return
        }

        // Update TOIL entry
        const updatedEntry = await prisma.tOILEntry.update({
            where: { id },
            data: {
                earnedDate: earnedDate ? new Date(earnedDate) : undefined,
                hours: hours ? parseFloat(hours) : undefined,
                expiryDate: expiryDate ? new Date(expiryDate) : undefined,
                status: status || undefined,
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
        console.error("Update TOIL entry error:", error)
        res.status(500).json({ message: "Failed to update TOIL entry" })
    }
}

export const deleteTOILEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { id } = req.params

        // Check if TOIL entry exists and belongs to user
        const existingEntry = await prisma.tOILEntry.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        })

        if (!existingEntry) {
            res.status(404).json({ message: "TOIL entry not found" })
            return
        }

        // Only allow deletion if status is active
        if (existingEntry.status !== "ACTIVE") {
            res.status(400).json({ message: "Cannot delete non-active TOIL entry" })
            return
        }

        // Delete TOIL entry
        await prisma.tOILEntry.delete({
            where: { id },
        })

        res.status(204).send()
    } catch (error) {
        console.error("Delete TOIL entry error:", error)
        res.status(500).json({ message: "Failed to delete TOIL entry" })
    }
}

export const useTOIL = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { id } = req.params
        const { usedDate, startTime, endTime } = req.body

        // Validate required fields
        if (!usedDate) {
            res.status(400).json({ message: "Missing required field: usedDate" })
            return
        }

        // Validate time fields
        if (!startTime || !endTime) {
            res.status(400).json({ message: "Missing required fields: startTime and endTime" })
            return
        }

        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            res.status(400).json({ message: "Invalid time format. Use HH:MM format" })
            return
        }

        // Check if end time is after start time
        const [startHour, startMinute] = startTime.split(":").map(Number)
        const [endHour, endMinute] = endTime.split(":").map(Number)
        const startTotalMinutes = startHour * 60 + startMinute
        const endTotalMinutes = endHour * 60 + endMinute

        if (endTotalMinutes <= startTotalMinutes) {
            res.status(400).json({ message: "End time must be after start time" })
            return
        }

        // Calculate hours from time fields
        const hoursToUse = (endTotalMinutes - startTotalMinutes) / 60

        // Validate calculated hours
        if (hoursToUse <= 0) {
            res.status(400).json({ message: "Calculated hours must be greater than 0" })
            return
        }

        // Check if TOIL entry exists and belongs to user
        const existingEntry = await prisma.tOILEntry.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
        })

        if (!existingEntry) {
            res.status(404).json({ message: "TOIL entry not found" })
            return
        }

        // Check if TOIL entry is active
        if (existingEntry.status !== "ACTIVE") {
            res.status(400).json({ message: "Cannot use non-active TOIL entry" })
            return
        }

        // Check if TOIL has expired
        if (existingEntry.expiryDate && new Date() > existingEntry.expiryDate) {
            res.status(400).json({ message: "TOIL entry has expired" })
            return
        }

        // Check if user is trying to use more hours than available
        if (hoursToUse > existingEntry.hours) {
            res.status(400).json({ message: "Cannot use more hours than available in this TOIL entry" })
            return
        }

        // Update TOIL entry
        const updatedEntry = await prisma.tOILEntry.update({
            where: { id },
            data: {
                usedDate: new Date(usedDate),
                startTime: startTime || null,
                endTime: endTime || null,
                status: "USED",
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
        console.error("Use TOIL error:", error)
        res.status(500).json({ message: "Failed to use TOIL" })
    }
}
