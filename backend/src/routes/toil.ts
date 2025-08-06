import { Router } from "express"
import { getTOILEntries, getAllTOILEntries, createTOILEntry, updateTOILEntry, deleteTOILEntry, useTOIL } from "../controllers/toilController"
import { authenticateToken } from "../middleware/auth"

const router = Router()

// All routes require authentication
router.use(authenticateToken)

// TOIL entries
router.get("/", getTOILEntries)
router.get("/all", getAllTOILEntries)
router.post("/", createTOILEntry)
router.put("/:id", updateTOILEntry)
router.delete("/:id", deleteTOILEntry)
router.post("/:id/use", useTOIL)

export default router
