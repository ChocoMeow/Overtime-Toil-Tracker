import { Request, Response, NextFunction } from "express"

// Validation schemas
export const leaveRequestSchema = {
    leaveTypeId: (value: any) => {
        if (!value || typeof value !== "string") {
            throw new Error("Leave type ID is required and must be a string")
        }
        return true
    },
    startDate: (value: any) => {
        if (!value || typeof value !== "string") {
            throw new Error("Start date is required and must be a string")
        }
        if (isNaN(Date.parse(value))) {
            throw new Error("Start date must be a valid date")
        }
        return true
    },
    endDate: (value: any) => {
        if (!value || typeof value !== "string") {
            throw new Error("End date is required and must be a string")
        }
        if (isNaN(Date.parse(value))) {
            throw new Error("End date must be a valid date")
        }
        return true
    },
    startTime: (value: any) => {
        if (value && typeof value !== "string") {
            throw new Error("Start time must be a string")
        }
        if (value && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            throw new Error("Start time must be in HH:MM format")
        }
        return true
    },
    endTime: (value: any) => {
        if (value && typeof value !== "string") {
            throw new Error("End time must be a string")
        }
        if (value && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            throw new Error("End time must be in HH:MM format")
        }
        return true
    },
    reason: (value: any) => {
        if (value && typeof value !== "string") {
            throw new Error("Reason must be a string")
        }
        return true
    },
}

export const validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { error } = schema.validate(req.body)
            if (error) {
                res.status(400).json({
                    message: "Validation error",
                    errors: error.details.map((detail: any) => detail.message),
                })
                return
            }
            next()
        } catch (error) {
            res.status(500).json({ message: "Validation middleware error" })
        }
    }
}

export const validateLeaveRequest = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { leaveTypeId, startDate, endDate, startTime, endTime, reason } = req.body

        // Validate required fields
        leaveRequestSchema.leaveTypeId(leaveTypeId)
        leaveRequestSchema.startDate(startDate)
        leaveRequestSchema.endDate(endDate)

        // Validate optional fields
        if (startTime) leaveRequestSchema.startTime(startTime)
        if (endTime) leaveRequestSchema.endTime(endTime)
        if (reason) leaveRequestSchema.reason(reason)

        // Validate date logic
        const start = new Date(startDate)
        const end = new Date(endDate)
        if (start > end) {
            res.status(400).json({ message: "Start date cannot be after end date" })
            return
        }

        // Validate time logic if both times are provided
        if (startTime && endTime && startDate === endDate) {
            if (startTime >= endTime) {
                res.status(400).json({ message: "Start time must be before end time for same-day leave" })
                return
            }
        }

        next()
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    console.error("Error:", error)

    if (error.name === "ValidationError") {
        res.status(400).json({
            message: "Validation error",
            errors: error.errors,
        })
        return
    }

    if (error.name === "PrismaClientKnownRequestError") {
        if (error.code === "P2002") {
            res.status(409).json({
                message: "Resource already exists",
            })
            return
        }
    }

    res.status(500).json({
        message: "Internal server error",
    })
}

export const notFound = (req: Request, res: Response): void => {
    res.status(404).json({
        message: "Route not found",
    })
}
