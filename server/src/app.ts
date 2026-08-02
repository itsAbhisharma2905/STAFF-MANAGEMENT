import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { resetDatabase } from "./repositories/jsonDatabase";
import { aiRoutes } from "./routes/aiRoutes";
import { employeeRoutes } from "./routes/employeeRoutes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "staff-manager-api" });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/ai", aiRoutes);

app.post("/api/admin/reset-demo-data", async (_request, response, next) => {
  try {
    response.json(await resetDatabase());
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);
