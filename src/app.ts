import express, { Application, Response, Request } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

//middleware
app.use(cors());
app.use(express.json());
// routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello this server is running");
});

app.use(globalErrorHandler);
export default app;
