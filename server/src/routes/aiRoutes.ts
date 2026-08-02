import { Router } from "express";
import { analyzeCustomInput, analyzeWorkspace } from "../services/aiAnalyzerService";

export const aiRoutes = Router();

aiRoutes.get("/analyze", async (_request, response, next) => {
  try {
    response.json(await analyzeWorkspace());
  } catch (error) {
    next(error);
  }
});

aiRoutes.post("/custom-analyze", async (request, response, next) => {
  try {
    const input = String(request.body?.input ?? "").trim();
    if (!input) return response.status(400).json({ message: "Input is required" });
    response.json(analyzeCustomInput(input));
  } catch (error) {
    next(error);
  }
});
