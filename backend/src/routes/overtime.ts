import { Router } from "express"
import {
    getOvertimeEntries,
    getAllOvertimeEntries,
    createOvertimeEntry,
    updateOvertimeEntry,
    deleteOvertimeEntry,
    getPendingOvertimeEntries,
    approveOvertimeEntry,
    rejectOvertimeEntry,
} from "../controllers/overtimeController"
import { authenticateToken } from "../middleware/auth"

const router = Router()

// All routes require authentication
router.use(authenticateToken)

// Overtime entries
router.get("/", getOvertimeEntries)
router.get("/all", getAllOvertimeEntries)
router.post("/", createOvertimeEntry)
router.put("/:id", updateOvertimeEntry)
router.delete("/:id", deleteOvertimeEntry)

// Admin approval routes
router.get("/pending", getPendingOvertimeEntries)
router.post("/:id/approve", approveOvertimeEntry)
router.post("/:id/reject", rejectOvertimeEntry)

export default router
