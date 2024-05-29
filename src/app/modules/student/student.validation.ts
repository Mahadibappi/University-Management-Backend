import { z } from "zod";

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First Name is Required" })
    .trim()
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: "First Name must start with an uppercase letter",
    }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: "Last Name is Required" }),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's Name is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's Occupation is required" }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's Contact Number is required" }),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

// LocalGuardian schema
export const localGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Student schema
export const studentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      id: z.string().nonempty({ message: "ID is required" }),
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "others"], {
        message: "Gender is not valid",
      }),
      dateOfBarth: z.string().optional(),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }),
      contactNo: z.string().nonempty({ message: "Contact Must Needed" }),
      emergencyContactNo: z
        .string()
        .nonempty({ message: "Emergency Contact Number is required" }),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z
        .string()
        .nonempty({ message: "Present Address is required" }),
      permanentAddress: z
        .string()
        .nonempty({ message: "Permanent Address is required" }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = { studentValidationSchema };
