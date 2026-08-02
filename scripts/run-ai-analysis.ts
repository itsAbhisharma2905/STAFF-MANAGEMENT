import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { analyzeWorkspace } from "../server/src/services/aiAnalyzerService";
import { ensureDatabase } from "../server/src/repositories/jsonDatabase";

await ensureDatabase();

const report = await analyzeWorkspace();
const reportDir = path.resolve(process.cwd(), "reports");
const reportPath = path.join(reportDir, "ai-analysis.json");

await mkdir(reportDir, { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf-8");

console.log(`AI analysis complete: ${report.status} (${report.averageScore}/100)`);
console.log(`Areas checked: ${report.areas.length}`);
console.log(`Attention areas: ${report.attentionAreas.length ? report.attentionAreas.join(", ") : "None"}`);
console.log(`Report saved: ${reportPath}`);
