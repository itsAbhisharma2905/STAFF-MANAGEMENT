import { Employee } from "../types";
import { readDatabase, writeDatabase } from "./jsonDatabase";

export async function findEmployees() {
  const db = await readDatabase();
  return db.employees;
}

export async function createEmployee(employee: Employee) {
  const db = await readDatabase();
  db.employees = [employee, ...db.employees];
  await writeDatabase(db);
  return employee;
}

export async function updateEmployee(id: string, patch: Partial<Employee>) {
  const db = await readDatabase();
  const existing = db.employees.find((employee) => employee.id === id);
  if (!existing) return null;

  db.employees = db.employees.map((employee) => (employee.id === id ? { ...employee, ...patch, id } : employee));
  await writeDatabase(db);
  return db.employees.find((employee) => employee.id === id) ?? null;
}

export async function deleteEmployee(id: string) {
  const db = await readDatabase();
  const sizeBefore = db.employees.length;
  db.employees = db.employees.filter((employee) => employee.id !== id);
  await writeDatabase(db);
  return db.employees.length < sizeBefore;
}
