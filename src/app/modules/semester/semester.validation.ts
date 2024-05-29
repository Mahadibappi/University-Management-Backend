import { z } from "zod";
import { months, semesterCode, semesterName } from "./semester.constant";

const createSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...semesterCode] as [string, ...string[]]),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});
export const semesterValidation = { createSemesterValidation };
