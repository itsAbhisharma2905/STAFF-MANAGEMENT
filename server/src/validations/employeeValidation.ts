import { z } from "zod";

export const employeeCreateSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  department: z.string().min(2),
  status: z.string().optional(),
  attendance: z.string().optional(),
  leave: z.string().optional(),
  salary: z.string().optional(),
  avatar: z.string().url().optional(),
  manager: z.string().optional(),
  location: z.string().optional(),
  performance: z.string().optional(),
  risk: z.string().optional()
});

export const employeeUpdateSchema = employeeCreateSchema.partial();
