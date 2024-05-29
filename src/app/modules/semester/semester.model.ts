import { months, semesterCode, semesterName } from "./semester.constant";
import { TSemester } from "./semester.interface";
import { Schema, model } from "mongoose";

const semesterSchema = new Schema<TSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: semesterName,
    },
    year: { type: String, required: true },
    code: {
      type: String,
      enum: semesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  { timestamps: true }
);

export const semesterModel = model<TSemester>("Semester", semesterSchema);
