import { Router } from "express"
import { authenticateToken } from "../middleware/auth"
import { validateLeaveRequest } from "../middleware/validation"
import {
    getLeaveRequests,
    getAllLeaveRequests,
    createLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest,
    getLeaveBalance,
    getLeaveTypes,
    getPendingLeaveRequests,
    updateLeaveRequestStatus,
} from "../controllers/leaveController"

const router = Router()

// Protected routes
router.use(authenticateToken)

// Leave requests
router.get("/", getLeaveRequests)
router.get("/all", getAllLeaveRequests)
router.post("/", validateLeaveRequest, createLeaveRequest)
router.put("/:id", validateLeaveRequest, updateLeaveRequest)
router.delete("/:id", deleteLeaveRequest)

// Leave balance and types
router.get("/balance", getLeaveBalance)
router.get("/types", getLeaveTypes)

// Approval routes (for managers/admins)
router.get("/pending", getPendingLeaveRequests)
router.patch("/:id/status", updateLeaveRequestStatus)

export default router
