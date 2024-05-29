import express from "express";
import { semesterController } from "./semester.controller";

const router = express.Router();
router.post("/create-semester", semesterController.createSemester);

export const semesterRouter = router;
