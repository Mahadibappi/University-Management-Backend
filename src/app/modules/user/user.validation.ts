import { z } from "zod";

const userValidation = z.object({
  id: z.string(),
  password: z
    .string({ invalid_type_error: "password must be string" })
    .max(20, { message: "password should not more tha 20 characters" })
    .optional(),
  needPasswordChange: z.boolean().optional(),
  role: z.enum(["student", "faculty", "admin"]),
});

export default userValidation;
