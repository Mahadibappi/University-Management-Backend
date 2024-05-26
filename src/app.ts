import express, { Application, Response, Request } from "express";
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route";
import { userRoute } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/students", StudentRoute);
app.use("/api/v1/users", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello this server is running");
});

app.use(globalErrorHandler);
export default app;
