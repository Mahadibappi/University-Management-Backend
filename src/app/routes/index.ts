import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";
import { semesterRouter } from "../modules/semester/semester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/students",
    route: StudentRoute,
  },
  {
    path: "/semesters",
    route: semesterRouter,
  },
  {
    path: "/faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/departments",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/faculty",
    route: FacultyRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
