import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";
import { semesterRouter } from "../modules/semester/semester.route";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
