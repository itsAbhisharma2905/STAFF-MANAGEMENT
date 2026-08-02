import { Router } from "express";
import { addEmployee, editEmployee, listEmployees, removeEmployee } from "../services/employeeService";

export const employeeRoutes = Router();

employeeRoutes.get("/", async (_request, response, next) => {
  try {
    response.json(await listEmployees());
  } catch (error) {
    next(error);
  }
});

employeeRoutes.post("/", async (request, response, next) => {
  try {
    response.status(201).json(await addEmployee(request.body));
  } catch (error) {
    next(error);
  }
});

employeeRoutes.patch("/:id", async (request, response, next) => {
  try {
    const employee = await editEmployee(request.params.id, request.body);
    if (!employee) return response.status(404).json({ message: "Employee not found" });
    response.json(employee);
  } catch (error) {
    next(error);
  }
});

employeeRoutes.delete("/:id", async (request, response, next) => {
  try {
    const removed = await removeEmployee(request.params.id);
    if (!removed) return response.status(404).json({ message: "Employee not found" });
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});
