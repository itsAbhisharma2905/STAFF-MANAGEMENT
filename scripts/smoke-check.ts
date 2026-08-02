import { addEmployee, editEmployee, listEmployees, removeEmployee } from "../server/src/services/employeeService";
import { analyzeCustomInput, analyzeWorkspace } from "../server/src/services/aiAnalyzerService";
import { ensureDatabase } from "../server/src/repositories/jsonDatabase";

await ensureDatabase();

const before = await listEmployees();
const created = await addEmployee({
  name: "Smoke Test User",
  role: "QA Analyst",
  department: "Engineering",
  salary: "$5,500",
  risk: "Low"
});

const edited = await editEmployee(created.id, {
  role: "Senior QA Analyst",
  attendance: "Remote",
  risk: "Medium",
  location: "Test Lab"
});

if (!edited || edited.role !== "Senior QA Analyst" || edited.attendance !== "Remote") {
  throw new Error("Employee edit smoke check failed");
}

const removed = await removeEmployee(created.id);
if (!removed) {
  throw new Error("Employee delete smoke check failed");
}

const after = await listEmployees();
if (after.length !== before.length) {
  throw new Error("Employee cleanup smoke check failed");
}

const workspaceAnalysis = await analyzeWorkspace();
const customAnalysis = analyzeCustomInput("Two employees are late, payroll is on hold, one candidate is at offer, and leave approval is pending.");

console.log("Smoke check passed");
console.log(`Create/edit/delete employees: ok (${before.length} records restored)`);
console.log(`Workspace AI: ${workspaceAnalysis.status} ${workspaceAnalysis.averageScore}/100 across ${workspaceAnalysis.areas.length} areas`);
console.log(`Custom AI: ${customAnalysis.status} ${customAnalysis.score}/100, detected ${customAnalysis.detectedAreas.join(", ")}`);
