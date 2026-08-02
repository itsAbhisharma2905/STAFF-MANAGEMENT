import crypto from "node:crypto";
import { seedEmployees } from "../data/seed";
import { Employee } from "../types";
import { createEmployee, deleteEmployee, findEmployees, updateEmployee } from "../repositories/employeeRepository";
import { employeeCreateSchema, employeeUpdateSchema } from "../validations/employeeValidation";

const avatars = seedEmployees.map((employee) => employee.avatar);

function nextId() {
  return `EMP-${crypto.randomInt(2000, 9999)}`;
}

export async function listEmployees() {
  return findEmployees();
}

export async function addEmployee(payload: unknown) {
  const parsed = employeeCreateSchema.parse(payload);
  const employee: Employee = {
    id: nextId(),
    name: parsed.name,
    role: parsed.role,
    department: parsed.department,
    status: parsed.status ?? "Active",
    attendance: parsed.attendance ?? "On site",
    leave: parsed.leave ?? "14 days",
    salary: parsed.salary ?? "$6,500",
    avatar: parsed.avatar ?? avatars[crypto.randomInt(0, avatars.length)],
    manager: parsed.manager ?? "Nisha Rao",
    location: parsed.location ?? "Bengaluru",
    performance: parsed.performance ?? "New",
    risk: parsed.risk ?? "Low"
  };
  return createEmployee(employee);
}

export async function editEmployee(id: string, payload: unknown) {
  const parsed = employeeUpdateSchema.parse(payload);
  return updateEmployee(id, parsed);
}

export async function removeEmployee(id: string) {
  return deleteEmployee(id);
}
