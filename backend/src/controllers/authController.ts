import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { hashPassword, comparePassword, generateToken } from "../utils/auth"
import { LoginRequest, RegisterRequest, AuthResponse, AuthenticatedRequest } from "../types"

const prisma = new PrismaClient()

export const register = async (req: Request<{}, {}, RegisterRequest>, res: Response): Promise<void> => {
    try {
        const { email, password, name, role, department, managerId } = req.body

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            res.status(409).json({ message: "User already exists" })
            return
        }

        // Hash password
        const hashedPassword = await hashPassword(password)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || "EMPLOYEE",
                department,
                managerId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                department: true,
                managerId: true,
                joinDate: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        // Generate token
        const token = generateToken(user)

        const response: AuthResponse = {
            user,
            token,
        }

        res.status(201).json(response)
    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({ message: "Registration failed" })
    }
}

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" })
            return
        }

        // Check password
        const isValidPassword = await comparePassword(password, user.password)
        if (!isValidPassword) {
            res.status(401).json({ message: "Invalid credentials" })
            return
        }

        // Generate token
        const token = generateToken(user)

        const userWithoutPassword = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
            managerId: user.managerId,
            joinDate: user.joinDate,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        const response: AuthResponse = {
            user: userWithoutPassword,
            token,
        }

        res.json(response)
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ message: "Login failed" })
    }
}

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        res.json({ user: req.user })
    } catch (error) {
        console.error("Get profile error:", error)
        res.status(500).json({ message: "Failed to get profile" })
    }
}

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" })
            return
        }

        const { name, department } = req.body

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                name: name || req.user.name,
                department: department || req.user.department,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                department: true,
                managerId: true,
                joinDate: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        res.json({ user: updatedUser })
    } catch (error) {
        console.error("Update profile error:", error)
        res.status(500).json({ message: "Failed to update profile" })
    }
}
