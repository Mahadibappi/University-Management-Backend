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
semesterSchema.pre("save", async function (next) {
  const isSemesterExist = await semesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new Error("Semester already exist");
  }
  next();
});

export const semesterModel = model<TSemester>("Semester", semesterSchema);
