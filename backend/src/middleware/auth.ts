import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import { verifyToken, extractTokenFromHeader } from "../utils/auth"
import { AuthenticatedRequest, UserRole } from "../types"

const prisma = new PrismaClient()

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            res.status(401).json({ message: "Access token required" })
            return
        }

        const decoded = verifyToken(token) as any
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                department: true,
                joinDate: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        if (!user) {
            res.status(401).json({ message: "Invalid token" })
            return
        }

        req.user = {
            ...user,
            role: user.role as UserRole,
        }
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}

export const requireRole = (roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: "Insufficient permissions" })
            return
        }

        next()
    }
}

export const requireManagerOrAdmin = requireRole(["MANAGER", "ADMIN"])
export const requireAdmin = requireRole(["ADMIN"])
