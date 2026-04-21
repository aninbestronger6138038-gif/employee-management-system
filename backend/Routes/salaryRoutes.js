import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import { getSalaries, addSalary ,getSalaryByEmployeeId } from '../Controlers/salaryControllers.js';


const router = express.Router();

router.get("/", authMiddleware, getSalaries);
router.get("/:id", authMiddleware, getSalaryByEmployeeId);
router.post("/add", authMiddleware , addSalary );

export default router;