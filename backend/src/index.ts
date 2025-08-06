import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { errorHandler, notFound } from "./middleware/validation"
import authRoutes from "./routes/auth"
import leaveRoutes from "./routes/leaves"
import overtimeRoutes from "./routes/overtime"
import toilRoutes from "./routes/toil"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
    })
)
app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/leaves", leaveRoutes)
app.use("/api/overtime", overtimeRoutes)
app.use("/api/toil", toilRoutes)

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/health`)
    console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`)
    console.log(`📅 Leave API: http://localhost:${PORT}/api/leaves`)
    console.log(`⏰ Overtime API: http://localhost:${PORT}/api/overtime`)
    console.log(`📋 TOIL API: http://localhost:${PORT}/api/toil`)
})

export default app
