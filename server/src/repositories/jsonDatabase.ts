import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Database } from "../types";
import { seedEmployees } from "../data/seed";

const dataDir = path.resolve(process.cwd(), "server", "data");
const dbPath = path.join(dataDir, "db.json");

const defaultDb: Database = {
  employees: seedEmployees
};

export async function ensureDatabase() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dbPath, "utf-8");
  } catch {
    await writeDatabase(defaultDb);
  }
}

export async function readDatabase(): Promise<Database> {
  await ensureDatabase();
  const raw = await readFile(dbPath, "utf-8");
  return JSON.parse(raw) as Database;
}

export async function writeDatabase(database: Database) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dbPath, `${JSON.stringify(database, null, 2)}\n`, "utf-8");
}

export async function resetDatabase() {
  await writeDatabase(defaultDb);
  return defaultDb;
}
