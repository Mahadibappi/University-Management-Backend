import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
