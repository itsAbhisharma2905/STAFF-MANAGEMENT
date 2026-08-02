import type { DemoModule } from "../services/aiAnalyzerService";

export const modules: DemoModule[] = [
  {
    id: "departments",
    title: "Department Directory",
    rows: [
      { Department: "Engineering", Head: "Rohan Iyer", Staff: "82", "Open Roles": "6", Budget: "$182k", Health: "Healthy" },
      { Department: "People", Head: "Nisha Rao", Staff: "18", "Open Roles": "3", Budget: "$42k", Health: "Healthy" },
      { Department: "Finance", Head: "Maya Singh", Staff: "24", "Open Roles": "1", Budget: "$68k", Health: "Healthy" },
      { Department: "Operations", Head: "Sana Khan", Staff: "44", "Open Roles": "4", Budget: "$96k", Health: "Review" },
      { Department: "Design", Head: "Aarav Mehta", Staff: "16", "Open Roles": "2", Budget: "$51k", Health: "Healthy" },
      { Department: "Analytics", Head: "Neel Varma", Staff: "12", "Open Roles": "2", Budget: "$39k", Health: "Healthy" },
      { Department: "Sales", Head: "Priya Menon", Staff: "29", "Open Roles": "3", Budget: "$72k", Health: "Review" },
      { Department: "Support", Head: "Amir Khan", Staff: "31", "Open Roles": "1", Budget: "$61k", Health: "Healthy" },
      { Department: "Legal", Head: "Meera Das", Staff: "7", "Open Roles": "0", Budget: "$28k", Health: "Healthy" },
      { Department: "Admin", Head: "Vikram Jain", Staff: "11", "Open Roles": "1", Budget: "$24k", Health: "Watch" }
    ]
  },
  {
    id: "attendance",
    title: "Attendance Control",
    rows: [
      { Employee: "Aarav Mehta", Shift: "General", Status: "Present", Overtime: "1h" },
      { Employee: "Nisha Rao", Shift: "Remote", Status: "Present", Overtime: "0h" },
      { Employee: "Dev Patel", Shift: "General", Status: "Late", Overtime: "0h" },
      { Employee: "Maya Singh", Shift: "Morning", Status: "Present", Overtime: "2h" },
      { Employee: "Kabir Shah", Shift: "General", Status: "Absent", Overtime: "0h" },
      { Employee: "Ira Kapoor", Shift: "Remote", Status: "Present", Overtime: "1h" },
      { Employee: "Rohan Iyer", Shift: "General", Status: "Present", Overtime: "2h" },
      { Employee: "Sana Khan", Shift: "Morning", Status: "Present", Overtime: "0h" },
      { Employee: "Neel Varma", Shift: "Remote", Status: "Late", Overtime: "0h" },
      { Employee: "Tara Dsouza", Shift: "General", Status: "Late", Overtime: "0h" }
    ]
  },
  {
    id: "leave",
    title: "Leave Queue",
    rows: [
      { Employee: "Aarav Mehta", Type: "Annual", Days: "5", Status: "Pending" },
      { Employee: "Maya Singh", Type: "Medical", Days: "1", Status: "Approved" },
      { Employee: "Dev Patel", Type: "Casual", Days: "2", Status: "Pending" },
      { Employee: "Kabir Shah", Type: "Comp off", Days: "1", Status: "Rejected" },
      { Employee: "Ira Kapoor", Type: "Annual", Days: "5", Status: "Pending" },
      { Employee: "Rohan Iyer", Type: "Personal", Days: "1", Status: "Approved" },
      { Employee: "Sana Khan", Type: "Medical", Days: "3", Status: "Pending" },
      { Employee: "Neel Varma", Type: "Annual", Days: "4", Status: "Approved" },
      { Employee: "Tara Dsouza", Type: "Casual", Days: "1", Status: "Pending" },
      { Employee: "Priya Menon", Type: "Annual", Days: "3", Status: "Pending" }
    ]
  },
  {
    id: "payroll",
    title: "Payroll Cycle",
    rows: [
      { Employee: "Aarav Mehta", Net: "$7,520", Status: "Ready" },
      { Employee: "Nisha Rao", Net: "$8,240", Status: "Ready" },
      { Employee: "Dev Patel", Net: "$8,280", Status: "Review" },
      { Employee: "Maya Singh", Net: "$8,660", Status: "Ready" },
      { Employee: "Kabir Shah", Net: "$5,180", Status: "Hold" },
      { Employee: "Ira Kapoor", Net: "$9,620", Status: "Ready" },
      { Employee: "Rohan Iyer", Net: "$12,680", Status: "Ready" },
      { Employee: "Sana Khan", Net: "$11,100", Status: "Ready" },
      { Employee: "Neel Varma", Net: "$6,830", Status: "Review" },
      { Employee: "Tara Dsouza", Net: "$6,210", Status: "Hold" }
    ]
  },
  {
    id: "recruitment",
    title: "Hiring Pipeline",
    rows: [
      { Role: "Backend Engineer", "Pipeline Stage": "Sourcing", Candidates: "18", Priority: "High" },
      { Role: "HR Associate", "Pipeline Stage": "Screening", Candidates: "21", Priority: "Medium" },
      { Role: "Data Analyst", "Pipeline Stage": "Technical Interview", Candidates: "8", Priority: "High" },
      { Role: "Ops Manager", "Pipeline Stage": "Panel Interview", Candidates: "5", Priority: "High" },
      { Role: "QA Engineer", "Pipeline Stage": "Offer", Candidates: "2", Priority: "Medium" },
      { Role: "Payroll Analyst", "Pipeline Stage": "Background Check", Candidates: "3", Priority: "Medium" },
      { Role: "UX Researcher", "Pipeline Stage": "Sourcing", Candidates: "13", Priority: "Low" },
      { Role: "Sales Lead", "Pipeline Stage": "Screening", Candidates: "16", Priority: "High" },
      { Role: "Support Specialist", "Pipeline Stage": "Technical Interview", Candidates: "7", Priority: "Medium" },
      { Role: "Legal Counsel", "Pipeline Stage": "Offer", Candidates: "1", Priority: "Low" }
    ]
  },
  {
    id: "reports",
    title: "Report Library",
    rows: [
      { Report: "Attendance Report", Cadence: "Daily", Status: "Ready" },
      { Report: "Salary Report", Cadence: "Monthly", Status: "Ready" },
      { Report: "Leave Report", Cadence: "Weekly", Status: "Ready" },
      { Report: "Department Report", Cadence: "Monthly", Status: "Ready" },
      { Report: "Recruitment Funnel", Cadence: "Weekly", Status: "Ready" },
      { Report: "Performance Summary", Cadence: "Quarterly", Status: "Review" },
      { Report: "Overtime Report", Cadence: "Weekly", Status: "Ready" },
      { Report: "Audit Log", Cadence: "Daily", Status: "Ready" },
      { Report: "Birthday Calendar", Cadence: "Monthly", Status: "Ready" },
      { Report: "Attrition Risk", Cadence: "Monthly", Status: "Review" }
    ]
  },
  {
    id: "settings",
    title: "System Settings",
    rows: [
      { Area: "Roles", Configuration: "RBAC matrix", Status: "Enabled" },
      { Area: "Security", Configuration: "MFA required", Status: "Enabled" },
      { Area: "Notifications", Configuration: "Email + in-app", Status: "Enabled" },
      { Area: "Audit Logs", Configuration: "365 day retention", Status: "Enabled" },
      { Area: "Leave Policy", Configuration: "Auto balance accrual", Status: "Enabled" },
      { Area: "Payroll", Configuration: "Maker-checker approval", Status: "Enabled" },
      { Area: "Attendance", Configuration: "Geo + QR check-in", Status: "Review" },
      { Area: "Documents", Configuration: "Cloud storage", Status: "Enabled" },
      { Area: "Recruitment", Configuration: "Pipeline SLA rules", Status: "Enabled" },
      { Area: "AI Assistant", Configuration: "Policy + analytics helper", Status: "Enabled" }
    ]
  }
];
