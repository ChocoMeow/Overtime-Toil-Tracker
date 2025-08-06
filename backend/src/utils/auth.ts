import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (user: any): string => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        throw new Error("Invalid token")
    }
}

export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null
    }
    return authHeader.substring(7)
}
