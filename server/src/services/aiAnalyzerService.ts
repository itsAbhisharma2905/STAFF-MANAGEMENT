import { modules } from "../data/moduleSeed";
import { findEmployees } from "../repositories/employeeRepository";

export type DemoModule = {
  id: string;
  title: string;
  rows: Record<string, string>[];
};

export type AreaAnalysis = {
  area: string;
  score: number;
  status: "Healthy" | "Review" | "Attention";
  findings: string[];
  recommendations: string[];
};

function ratio(count: number, total: number) {
  return total === 0 ? 0 : Math.round((count / total) * 100);
}

function countByValue(rows: Record<string, string>[], values: string[]) {
  return rows.filter((row) => Object.values(row).some((value) => values.includes(value))).length;
}

function statusFromScore(score: number): AreaAnalysis["status"] {
  if (score >= 82) return "Healthy";
  if (score >= 64) return "Review";
  return "Attention";
}

export async function analyzeWorkspace() {
  const employees = await findEmployees();
  const areas: AreaAnalysis[] = [];

  const highRisk = employees.filter((employee) => employee.risk === "High").length;
  const mediumRisk = employees.filter((employee) => employee.risk === "Medium").length;
  const lateOrAbsent = employees.filter((employee) => ["Late", "Absent"].includes(employee.attendance)).length;
  const employeeScore = Math.max(55, 96 - highRisk * 14 - mediumRisk * 6 - lateOrAbsent * 4);

  areas.push({
    area: "Employees",
    score: employeeScore,
    status: statusFromScore(employeeScore),
    findings: [
      `${employees.length} employee records available in persistent storage.`,
      `${highRisk} high-risk and ${mediumRisk} medium-risk employee records detected.`,
      `${lateOrAbsent} employees show late or absent attendance signals.`
    ],
    recommendations: [
      "Schedule retention check-ins for high-risk and notice-period employees.",
      "Review attendance pattern alongside performance before payroll approval."
    ]
  });

  for (const module of modules) {
    const reviewCount = countByValue(module.rows, ["Review", "Watch", "Pending", "Hold", "High", "Late", "Absent"]);
    const healthyRatio = 100 - ratio(reviewCount, module.rows.length);
    const score = Math.max(50, Math.min(98, healthyRatio + 8));
    const firstColumn = Object.keys(module.rows[0] ?? {})[0] ?? "Record";

    areas.push({
      area: module.title,
      score,
      status: statusFromScore(score),
      findings: [
        `${module.rows.length} demo records checked.`,
        `${reviewCount} records contain review, pending, hold, high-priority, late, or absent signals.`,
        `Primary tracking field is ${firstColumn}.`
      ],
      recommendations: recommendationsFor(module.id)
    });
  }

  const averageScore = Math.round(areas.reduce((sum, area) => sum + area.score, 0) / areas.length);
  const attentionAreas = areas.filter((area) => area.status !== "Healthy").map((area) => area.area);

  return {
    generatedAt: new Date().toISOString(),
    engine: "Built-in deterministic HR analyzer",
    averageScore,
    status: statusFromScore(averageScore),
    attentionAreas,
    areas
  };
}

export function analyzeCustomInput(input: string) {
  const normalized = input.toLowerCase();
  const signals = [
    ["attendance", ["late", "absent", "overtime", "shift"]],
    ["leave", ["leave", "holiday", "medical", "approval"]],
    ["payroll", ["salary", "payroll", "deduction", "bonus", "net"]],
    ["recruitment", ["candidate", "interview", "offer", "pipeline", "hiring"]],
    ["risk", ["risk", "notice", "attrition", "resign", "performance"]]
  ] as const;

  const matched = signals
    .map(([area, words]) => ({ area, hits: words.filter((word) => normalized.includes(word)).length }))
    .filter((item) => item.hits > 0)
    .sort((a, b) => b.hits - a.hits);

  const riskWords = ["late", "absent", "hold", "pending", "high", "notice", "rejected", "overdue", "risk"];
  const riskCount = riskWords.filter((word) => normalized.includes(word)).length;
  const score = Math.max(35, 92 - riskCount * 9 - Math.max(0, input.length - 600) / 40);
  const roundedScore = Math.round(score);

  return {
    generatedAt: new Date().toISOString(),
    engine: "Built-in custom text analyzer",
    score: roundedScore,
    status: statusFromScore(roundedScore),
    detectedAreas: matched.map((item) => item.area),
    findings: [
      matched.length ? `Detected focus areas: ${matched.map((item) => item.area).join(", ")}.` : "No strong HR area keywords detected.",
      `${riskCount} risk-oriented terms found in the submitted text.`,
      `Input length checked: ${input.length} characters.`
    ],
    recommendations: [
      riskCount >= 3 ? "Escalate this item to HR/manager review before taking automated action." : "This looks suitable for normal HR review workflow.",
      matched.some((item) => item.area === "payroll") ? "Verify payroll amounts and approval status against source records." : "Attach supporting evidence before closing the case.",
      matched.some((item) => item.area === "risk") ? "Create a retention or performance follow-up task." : "Run another analysis after adding dates, owner, and status fields."
    ]
  };
}

function recommendationsFor(id: string) {
  const map: Record<string, string[]> = {
    departments: ["Rebalance hiring load across departments with Watch or Review health.", "Confirm each open role maps to an approved budget owner."],
    attendance: ["Trigger manager review for repeated late entries.", "Compare overtime hours against payroll exceptions before closing cycle."],
    leave: ["Prioritize pending leave requests older than two business days.", "Check overlapping team leave before approval."],
    payroll: ["Resolve Hold and Review records before payout freeze.", "Run maker-checker approval for all deduction anomalies."],
    recruitment: ["Move high-priority roles out of Sourcing within 48 hours.", "Use pipeline SLA alerts for Technical Interview and Offer stages."],
    reports: ["Schedule recurring leadership reports and archive stale exports.", "Review reports marked Review before monthly close."],
    settings: ["Close configuration items in Review before production deployment.", "Keep RBAC, MFA, and audit log settings enabled."]
  };
  return map[id] ?? ["Review owner accountability.", "Attach an audit note after action."];
}
