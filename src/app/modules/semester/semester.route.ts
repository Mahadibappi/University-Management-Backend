import express from "express";
import { semesterController } from "./semester.controller";
import { semesterValidation } from "./semester.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.post(
  "/create-semester",
  validateRequest(semesterValidation.createSemesterValidation),
  semesterController.createSemester
);

router.get("/:semesterId", semesterController.getSingleAcademicSemester);

router.patch(
  "/:semesterId",
  validateRequest(semesterValidation.updateSemesterValidation),
  semesterController.updateAcademicSemester
);

router.get("/", semesterController.getAllAcademicSemesters);

export const semesterRouter = router;
