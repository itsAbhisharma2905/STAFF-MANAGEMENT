import {
  Activity,
  Bell,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FileBarChart2,
  Filter,
  LayoutDashboard,
  LogOut,
  Menu,
  Minus,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type ModuleId = "dashboard" | "employees" | "departments" | "attendance" | "leave" | "payroll" | "recruitment" | "reports" | "settings";
type AuthMode = "login" | "signup";
type Detail = { title: string; subtitle: string; fields: Record<string, string>; insights?: string[]; mode?: "createEmployee" | "editEmployee"; employeeId?: string } | null;
type Toast = { id: number; message: string };
type DemoRow = Record<string, string>;
type AnalysisReport = {
  generatedAt: string;
  engine: string;
  averageScore: number;
  status: string;
  attentionAreas: string[];
  areas: { area: string; score: number; status: string; findings: string[]; recommendations: string[] }[];
};
type CustomAnalysis = {
  generatedAt: string;
  engine: string;
  score: number;
  status: string;
  detectedAreas: string[];
  findings: string[];
  recommendations: string[];
};

type Employee = DemoRow & {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
  attendance: string;
  leave: string;
  salary: string;
  avatar: string;
};

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
];

const demoAccounts = [
  { email: "admin@staffmanager.dev", password: "Admin@123", role: "Super Admin" },
  { email: "hr@staffmanager.dev", password: "Hr@12345", role: "HR Manager" },
  { email: "manager@staffmanager.dev", password: "Manager@123", role: "Department Manager" },
  { email: "employee@staffmanager.dev", password: "Employee@123", role: "Employee" }
];

const employeesSeed: Employee[] = [
  { id: "EMP-1024", name: "Aarav Mehta", role: "Product Designer", department: "Design", status: "Active", attendance: "On site", leave: "12 days", salary: "$7,800", avatar: avatars[1], manager: "Rohan Iyer", location: "Mumbai", performance: "Exceeds", risk: "Low" },
  { id: "EMP-1025", name: "Nisha Rao", role: "HR Manager", department: "People", status: "Active", attendance: "Remote", leave: "8 days", salary: "$8,400", avatar: avatars[0], manager: "Super Admin", location: "Bengaluru", performance: "Strong", risk: "Low" },
  { id: "EMP-1026", name: "Dev Patel", role: "Frontend Engineer", department: "Engineering", status: "Probation", attendance: "Late", leave: "15 days", salary: "$9,200", avatar: avatars[3], manager: "Rohan Iyer", location: "Pune", performance: "Watch", risk: "Medium" },
  { id: "EMP-1027", name: "Maya Singh", role: "Payroll Lead", department: "Finance", status: "Active", attendance: "On site", leave: "10 days", salary: "$8,900", avatar: avatars[2], manager: "Sana Khan", location: "Delhi", performance: "Strong", risk: "Low" },
  { id: "EMP-1028", name: "Kabir Shah", role: "Recruiter", department: "People", status: "Contract", attendance: "Absent", leave: "5 days", salary: "$5,600", avatar: avatars[1], manager: "Nisha Rao", location: "Hyderabad", performance: "Stable", risk: "Medium" },
  { id: "EMP-1029", name: "Ira Kapoor", role: "Backend Engineer", department: "Engineering", status: "Active", attendance: "Remote", leave: "9 days", salary: "$9,700", avatar: avatars[0], manager: "Rohan Iyer", location: "Noida", performance: "Exceeds", risk: "Low" },
  { id: "EMP-1030", name: "Rohan Iyer", role: "Engineering Manager", department: "Engineering", status: "Active", attendance: "On site", leave: "11 days", salary: "$12,800", avatar: avatars[3], manager: "Super Admin", location: "Mumbai", performance: "Strong", risk: "Low" },
  { id: "EMP-1031", name: "Sana Khan", role: "Operations Head", department: "Operations", status: "Active", attendance: "On site", leave: "7 days", salary: "$11,200", avatar: avatars[2], manager: "Super Admin", location: "Delhi", performance: "Strong", risk: "Low" },
  { id: "EMP-1032", name: "Neel Varma", role: "Data Analyst", department: "Analytics", status: "Active", attendance: "Remote", leave: "14 days", salary: "$7,200", avatar: avatars[1], manager: "Maya Singh", location: "Chennai", performance: "Stable", risk: "Low" },
  { id: "EMP-1033", name: "Tara Dsouza", role: "QA Engineer", department: "Engineering", status: "Notice", attendance: "Late", leave: "3 days", salary: "$6,900", avatar: avatars[0], manager: "Rohan Iyer", location: "Goa", performance: "Watch", risk: "High" }
];

const moduleData: Record<Exclude<ModuleId, "dashboard" | "employees">, { title: string; columns: string[]; rows: DemoRow[]; metrics: string[] }> = {
  departments: {
    title: "Department Directory",
    columns: ["Department", "Head", "Staff", "Open Roles", "Budget", "Health"],
    metrics: ["8 departments", "23 open roles", "$812k monthly budget"],
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
  attendance: {
    title: "Attendance Control",
    columns: ["Employee", "Shift", "Check In", "Check Out", "Status", "Overtime"],
    metrics: ["91% present", "14 late entries", "46 overtime hours"],
    rows: [
      { Employee: "Aarav Mehta", Shift: "General", "Check In": "09:06", "Check Out": "18:12", Status: "Present", Overtime: "1h" },
      { Employee: "Nisha Rao", Shift: "Remote", "Check In": "09:22", "Check Out": "18:00", Status: "Present", Overtime: "0h" },
      { Employee: "Dev Patel", Shift: "General", "Check In": "10:18", "Check Out": "18:45", Status: "Late", Overtime: "0h" },
      { Employee: "Maya Singh", Shift: "Morning", "Check In": "08:55", "Check Out": "17:40", Status: "Present", Overtime: "2h" },
      { Employee: "Kabir Shah", Shift: "General", "Check In": "-", "Check Out": "-", Status: "Absent", Overtime: "0h" },
      { Employee: "Ira Kapoor", Shift: "Remote", "Check In": "09:00", "Check Out": "18:30", Status: "Present", Overtime: "1h" },
      { Employee: "Rohan Iyer", Shift: "General", "Check In": "09:12", "Check Out": "19:10", Status: "Present", Overtime: "2h" },
      { Employee: "Sana Khan", Shift: "Morning", "Check In": "08:45", "Check Out": "17:15", Status: "Present", Overtime: "0h" },
      { Employee: "Neel Varma", Shift: "Remote", "Check In": "09:34", "Check Out": "18:05", Status: "Late", Overtime: "0h" },
      { Employee: "Tara Dsouza", Shift: "General", "Check In": "10:02", "Check Out": "18:25", Status: "Late", Overtime: "0h" }
    ]
  },
  leave: {
    title: "Leave Queue",
    columns: ["Employee", "Type", "Dates", "Days", "Approver", "Status"],
    metrics: ["23 pending", "7 urgent", "4 policy conflicts"],
    rows: [
      { Employee: "Aarav Mehta", Type: "Annual", Dates: "Aug 05-09", Days: "5", Approver: "Rohan Iyer", Status: "Pending" },
      { Employee: "Maya Singh", Type: "Medical", Dates: "Aug 12", Days: "1", Approver: "Nisha Rao", Status: "Approved" },
      { Employee: "Dev Patel", Type: "Casual", Dates: "Aug 18-19", Days: "2", Approver: "Rohan Iyer", Status: "Pending" },
      { Employee: "Kabir Shah", Type: "Comp off", Dates: "Aug 22", Days: "1", Approver: "Nisha Rao", Status: "Rejected" },
      { Employee: "Ira Kapoor", Type: "Annual", Dates: "Aug 25-29", Days: "5", Approver: "Rohan Iyer", Status: "Pending" },
      { Employee: "Rohan Iyer", Type: "Personal", Dates: "Sep 02", Days: "1", Approver: "Nisha Rao", Status: "Approved" },
      { Employee: "Sana Khan", Type: "Medical", Dates: "Sep 04-06", Days: "3", Approver: "Nisha Rao", Status: "Pending" },
      { Employee: "Neel Varma", Type: "Annual", Dates: "Sep 10-13", Days: "4", Approver: "Maya Singh", Status: "Approved" },
      { Employee: "Tara Dsouza", Type: "Casual", Dates: "Sep 16", Days: "1", Approver: "Rohan Iyer", Status: "Pending" },
      { Employee: "Priya Menon", Type: "Annual", Dates: "Sep 21-23", Days: "3", Approver: "Nisha Rao", Status: "Pending" }
    ]
  },
  payroll: {
    title: "Payroll Cycle",
    columns: ["Employee", "Gross", "Bonus", "Deduction", "Net", "Status"],
    metrics: ["$482k gross", "$22k deductions", "3 exceptions"],
    rows: [
      { Employee: "Aarav Mehta", Gross: "$7,800", Bonus: "$500", Deduction: "$780", Net: "$7,520", Status: "Ready" },
      { Employee: "Nisha Rao", Gross: "$8,400", Bonus: "$700", Deduction: "$860", Net: "$8,240", Status: "Ready" },
      { Employee: "Dev Patel", Gross: "$9,200", Bonus: "$0", Deduction: "$920", Net: "$8,280", Status: "Review" },
      { Employee: "Maya Singh", Gross: "$8,900", Bonus: "$650", Deduction: "$890", Net: "$8,660", Status: "Ready" },
      { Employee: "Kabir Shah", Gross: "$5,600", Bonus: "$0", Deduction: "$420", Net: "$5,180", Status: "Hold" },
      { Employee: "Ira Kapoor", Gross: "$9,700", Bonus: "$900", Deduction: "$980", Net: "$9,620", Status: "Ready" },
      { Employee: "Rohan Iyer", Gross: "$12,800", Bonus: "$1,200", Deduction: "$1,320", Net: "$12,680", Status: "Ready" },
      { Employee: "Sana Khan", Gross: "$11,200", Bonus: "$1,000", Deduction: "$1,100", Net: "$11,100", Status: "Ready" },
      { Employee: "Neel Varma", Gross: "$7,200", Bonus: "$350", Deduction: "$720", Net: "$6,830", Status: "Review" },
      { Employee: "Tara Dsouza", Gross: "$6,900", Bonus: "$0", Deduction: "$690", Net: "$6,210", Status: "Hold" }
    ]
  },
  recruitment: {
    title: "Hiring Pipeline",
    columns: ["Role", "Pipeline Stage", "Candidates", "Owner", "Priority", "Target"],
    metrics: ["96 candidates", "11 interviews", "4 offers"],
    rows: [
      { Role: "Backend Engineer", "Pipeline Stage": "Sourcing", Candidates: "18", Owner: "Kabir Shah", Priority: "High", Target: "Aug 16" },
      { Role: "HR Associate", "Pipeline Stage": "Screening", Candidates: "21", Owner: "Nisha Rao", Priority: "Medium", Target: "Aug 30" },
      { Role: "Data Analyst", "Pipeline Stage": "Technical Interview", Candidates: "8", Owner: "Maya Singh", Priority: "High", Target: "Aug 08" },
      { Role: "Ops Manager", "Pipeline Stage": "Panel Interview", Candidates: "5", Owner: "Sana Khan", Priority: "High", Target: "Aug 20" },
      { Role: "QA Engineer", "Pipeline Stage": "Offer", Candidates: "2", Owner: "Rohan Iyer", Priority: "Medium", Target: "Aug 18" },
      { Role: "Payroll Analyst", "Pipeline Stage": "Background Check", Candidates: "3", Owner: "Maya Singh", Priority: "Medium", Target: "Aug 25" },
      { Role: "UX Researcher", "Pipeline Stage": "Sourcing", Candidates: "13", Owner: "Aarav Mehta", Priority: "Low", Target: "Sep 03" },
      { Role: "Sales Lead", "Pipeline Stage": "Screening", Candidates: "16", Owner: "Priya Menon", Priority: "High", Target: "Aug 28" },
      { Role: "Support Specialist", "Pipeline Stage": "Technical Interview", Candidates: "7", Owner: "Amir Khan", Priority: "Medium", Target: "Sep 05" },
      { Role: "Legal Counsel", "Pipeline Stage": "Offer", Candidates: "1", Owner: "Meera Das", Priority: "Low", Target: "Sep 10" }
    ]
  },
  reports: {
    title: "Report Library",
    columns: ["Report", "Owner", "Cadence", "Last Run", "Exports", "Status"],
    metrics: ["42 saved reports", "8 scheduled", "5 exports today"],
    rows: [
      { Report: "Attendance Report", Owner: "HR", Cadence: "Daily", "Last Run": "Today 09:00", Exports: "PDF, Excel", Status: "Ready" },
      { Report: "Salary Report", Owner: "Finance", Cadence: "Monthly", "Last Run": "Jul 31", Exports: "Excel", Status: "Ready" },
      { Report: "Leave Report", Owner: "People", Cadence: "Weekly", "Last Run": "Jul 29", Exports: "PDF", Status: "Ready" },
      { Report: "Department Report", Owner: "Admin", Cadence: "Monthly", "Last Run": "Jul 30", Exports: "PDF, Excel", Status: "Ready" },
      { Report: "Recruitment Funnel", Owner: "People", Cadence: "Weekly", "Last Run": "Jul 28", Exports: "CSV", Status: "Ready" },
      { Report: "Performance Summary", Owner: "Managers", Cadence: "Quarterly", "Last Run": "Jul 15", Exports: "PDF", Status: "Review" },
      { Report: "Overtime Report", Owner: "Operations", Cadence: "Weekly", "Last Run": "Jul 27", Exports: "Excel", Status: "Ready" },
      { Report: "Audit Log", Owner: "Compliance", Cadence: "Daily", "Last Run": "Today 08:00", Exports: "CSV", Status: "Ready" },
      { Report: "Birthday Calendar", Owner: "HR", Cadence: "Monthly", "Last Run": "Aug 01", Exports: "PDF", Status: "Ready" },
      { Report: "Attrition Risk", Owner: "Leadership", Cadence: "Monthly", "Last Run": "Jul 26", Exports: "PDF", Status: "Review" }
    ]
  },
  settings: {
    title: "System Settings",
    columns: ["Area", "Configuration", "Owner", "Review Cycle", "Access", "Status"],
    metrics: ["4 roles", "MFA enabled", "365 day audit retention"],
    rows: [
      { Area: "Roles", Configuration: "RBAC matrix", Owner: "Super Admin", "Review Cycle": "Quarterly", Access: "Admin only", Status: "Enabled" },
      { Area: "Security", Configuration: "MFA required", Owner: "IT", "Review Cycle": "Monthly", Access: "All users", Status: "Enabled" },
      { Area: "Notifications", Configuration: "Email + in-app", Owner: "HR", "Review Cycle": "Quarterly", Access: "Managers", Status: "Enabled" },
      { Area: "Audit Logs", Configuration: "365 day retention", Owner: "Compliance", "Review Cycle": "Annual", Access: "Admin only", Status: "Enabled" },
      { Area: "Leave Policy", Configuration: "Auto balance accrual", Owner: "HR", "Review Cycle": "Quarterly", Access: "All users", Status: "Enabled" },
      { Area: "Payroll", Configuration: "Maker-checker approval", Owner: "Finance", "Review Cycle": "Monthly", Access: "Finance", Status: "Enabled" },
      { Area: "Attendance", Configuration: "Geo + QR check-in", Owner: "Operations", "Review Cycle": "Monthly", Access: "All users", Status: "Review" },
      { Area: "Documents", Configuration: "Cloud storage", Owner: "Admin", "Review Cycle": "Quarterly", Access: "HR", Status: "Enabled" },
      { Area: "Recruitment", Configuration: "Pipeline SLA rules", Owner: "People", "Review Cycle": "Monthly", Access: "Recruiters", Status: "Enabled" },
      { Area: "AI Assistant", Configuration: "Policy + analytics helper", Owner: "Super Admin", "Review Cycle": "Monthly", Access: "Managers", Status: "Enabled" }
    ]
  }
};

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "employees", label: "Employees", icon: UsersRound },
  { id: "departments", label: "Departments", icon: BriefcaseBusiness },
  { id: "attendance", label: "Attendance", icon: Clock3 },
  { id: "leave", label: "Leave", icon: CalendarClock },
  { id: "payroll", label: "Payroll", icon: CircleDollarSign },
  { id: "recruitment", label: "Recruitment", icon: ClipboardCheck },
  { id: "reports", label: "Reports", icon: FileBarChart2 },
  { id: "settings", label: "Settings", icon: Settings }
] satisfies { id: ModuleId; label: string; icon: typeof LayoutDashboard }[];

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [user, setUser] = useState(demoAccounts[1]);
  const [isAuthed, setIsAuthed] = useState(false);
  const [active, setActive] = useState<ModuleId>("dashboard");
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("All");
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [detail, setDetail] = useState<Detail>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [employees, setEmployees] = useState(employeesSeed);
  const [analysis, setAnalysis] = useState<AnalysisReport | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [customAnalysis, setCustomAnalysis] = useState<CustomAnalysis | null>(null);
  const [customAnalysisLoading, setCustomAnalysisLoading] = useState(false);

  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => setToast((current) => (current?.id === id ? null : current)), 2600);
  };

  const openModule = (id: ModuleId) => {
    setActive(id);
    setMenu(null);
    setMobileOpen(false);
    setFilterOpen(false);
    setNotifyOpen(false);
  };

  const loadEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) throw new Error("Failed to load employees");
      setEmployees(await response.json());
    } catch {
      showToast("API unavailable. Using in-memory demo data.");
    }
  };

  const runAnalysis = async () => {
    setAnalysisLoading(true);
    try {
      const response = await fetch("/api/ai/analyze");
      if (!response.ok) throw new Error("Failed to run analysis");
      const report = await response.json();
      setAnalysis(report);
      showToast(`AI analyzer complete: ${report.status} (${report.averageScore}/100).`);
    } catch {
      showToast("AI analyzer API is unavailable.");
    } finally {
      setAnalysisLoading(false);
    }
  };

  const runCustomAnalysis = async (input: string) => {
    setCustomAnalysisLoading(true);
    try {
      const response = await fetch("/api/ai/custom-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      });
      if (!response.ok) throw new Error("Custom analysis failed");
      const report = await response.json();
      setCustomAnalysis(report);
      showToast(`Custom AI analysis complete: ${report.status} (${report.score}/100).`);
    } catch {
      showToast("Custom AI analyzer API is unavailable.");
    } finally {
      setCustomAnalysisLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthed) {
      void loadEmployees();
      void runAnalysis();
    }
  }, [isAuthed]);

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const account = demoAccounts.find((item) => item.email === email && item.password === password) ?? demoAccounts[1];
    setUser(account);
    setIsAuthed(true);
    showToast(`Logged in as ${account.role}.`);
  };

  const signup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "new.user@staffmanager.dev");
    setUser({ email, password: "Created in demo", role: "HR Manager" });
    setIsAuthed(true);
    showToast("Demo account created.");
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((row) => {
      const q = Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase());
      const s = segment === "All" || Object.values(row).includes(segment);
      return q && s;
    });
  }, [employees, query, segment]);

  const createEmployee = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const role = String(data.get("role") || "").trim();
    const department = String(data.get("department") || "People");
    if (!name || !role) {
      showToast("Enter name and role first.");
      return;
    }
    const payload = {
      name,
      role,
      department,
      status: "Active",
      attendance: "On site",
      leave: "14 days",
      salary: "$6,500",
      avatar: avatars[employees.length % avatars.length],
      manager: "Nisha Rao",
      location: "Bengaluru",
      performance: "New",
      risk: "Low"
    };
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Create failed");
      const next = await response.json();
      setEmployees([next, ...employees]);
      setDetail(null);
      openModule("employees");
      showToast(`${name} stored in database.`);
      void runAnalysis();
    } catch {
      showToast("Could not store employee. Check API server.");
    }
  };

  const updateEmployee = async (id: string, patch: Partial<Employee>) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch)
      });
      if (!response.ok) throw new Error("Update failed");
      const updated = await response.json();
      setEmployees(employees.map((employee) => (employee.id === id ? updated : employee)));
      showToast(`${updated.name} updated in database.`);
      void runAnalysis();
    } catch {
      showToast("Could not update employee. Check API server.");
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const response = await fetch(`/api/employees/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      setEmployees(employees.filter((employee) => employee.id !== id));
      showToast("Employee removed from database.");
      void runAnalysis();
    } catch {
      showToast("Could not delete employee. Check API server.");
    }
  };

  if (!isAuthed) {
    return <AuthScreen mode={authMode} setMode={setAuthMode} onLogin={login} onSignup={signup} />;
  }

  return (
    <div className="app-shell min-h-screen bg-paper text-graphite">
      <aside className={`sidebar-panel fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-soil/15 bg-[#f9f5ed] transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="w-full border-b border-soil/15 px-5 py-5 text-left" onClick={() => openModule("dashboard")}>
          <div className="font-display text-2xl font-semibold text-emeraldInk">Staff Manager</div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-soil/55">{user.role}</div>
        </button>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const selected = active === item.id;
            return (
              <button key={item.id} onClick={() => openModule(item.id)} className={`nav-item flex h-11 w-full items-center gap-3 border px-3 text-left text-sm ${selected ? "border-emeraldInk bg-emeraldInk text-paper" : "border-transparent text-soil hover:border-soil/20 hover:bg-stone/55"}`}>
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-soil/15 p-4">
          <button className="action-button flex w-full items-center gap-3 text-left" onClick={() => setIsAuthed(false)}>
            <img src={avatars[0]} alt="" className="h-10 w-10 border border-soil/20 object-cover" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{user.email}</span>
              <span className="block truncate text-xs text-soil/60">{user.role}</span>
            </span>
            <LogOut className="ml-auto text-soil/50" size={18} />
          </button>
        </div>
      </aside>

      {mobileOpen && <button aria-label="Close navigation" className="drawer-backdrop fixed inset-0 z-30 bg-soil/30 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-soil/15 bg-paper/92 backdrop-blur">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button className="icon-button border border-soil/20 p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={18} /></button>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-soil/45" size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all visible records" className="h-10 w-full border border-soil/20 bg-[#fbf8f1] pl-9 pr-3 text-sm outline-none" />
            </div>
            <div className="relative">
              <button className="action-button flex h-10 items-center gap-2 border border-soil/20 px-3 text-sm" onClick={() => { setFilterOpen(!filterOpen); setNotifyOpen(false); }}>
                <Filter size={16} /> Filter
              </button>
              {filterOpen && <FilterPanel segment={segment} setSegment={setSegment} onClose={() => setFilterOpen(false)} />}
            </div>
            <div className="relative">
              <button className="icon-button h-10 border border-soil/20 px-3" aria-label="Notifications" onClick={() => { setNotifyOpen(!notifyOpen); setFilterOpen(false); }}><Bell size={18} /></button>
              {notifyOpen && <NotificationsPanel openModule={openModule} />}
            </div>
          </div>
        </header>

        <section className="page-stage px-4 py-6 sm:px-6 lg:px-8">
          {active === "dashboard" && <Dashboard employees={filteredEmployees} openModule={openModule} openDetail={setDetail} showToast={showToast} menu={menu} setMenu={setMenu} />}
          {active === "employees" && <EmployeesView employees={filteredEmployees} openDetail={setDetail} showToast={showToast} menu={menu} setMenu={setMenu} createEmployee={createEmployee} updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} />}
          {active !== "dashboard" && active !== "employees" && <ModuleView id={active} query={query} segment={segment} openDetail={setDetail} showToast={showToast} menu={menu} setMenu={setMenu} />}
        </section>
      </main>

      <AIPanel active={active} employees={employees} openModule={openModule} analysis={analysis} runAnalysis={runAnalysis} loading={analysisLoading} customAnalysis={customAnalysis} runCustomAnalysis={runCustomAnalysis} customLoading={customAnalysisLoading} />
      {detail && <DetailDrawer detail={detail} close={() => setDetail(null)} createEmployee={detail.mode === "createEmployee" ? createEmployee : undefined} updateEmployee={detail.mode === "editEmployee" && detail.employeeId ? updateEmployee : undefined} />}
      {toast && <div className="toast fixed bottom-5 right-5 z-50 border border-emeraldInk bg-emeraldInk px-4 py-3 text-sm text-paper shadow-lift">{toast.message}</div>}
    </div>
  );
}

function AuthScreen({ mode, setMode, onLogin, onSignup }: { mode: AuthMode; setMode: (mode: AuthMode) => void; onLogin: (event: FormEvent<HTMLFormElement>) => void; onSignup: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <main className="auth-screen grid min-h-screen lg:grid-cols-[1fr_520px]">
      <section className="hidden border-r border-soil/15 bg-emeraldInk p-10 text-paper lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="font-display text-4xl font-semibold">Staff Manager</div>
          <p className="mt-4 max-w-lg text-paper/75">Enterprise HR operations with employee records, attendance, payroll, recruitment pipeline, settings, and AI-assisted decisions.</p>
        </div>
        <div className="grid gap-3">
          {demoAccounts.map((account) => (
            <div key={account.email} className="border border-paper/20 bg-paper/5 p-3 text-sm">
              <div className="font-semibold">{account.role}</div>
              <div className="text-paper/70">{account.email} / {account.password}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex items-center justify-center p-5">
        <form className="panel w-full max-w-md border border-soil/15 bg-[#fbf8f1] p-6 shadow-lift" onSubmit={mode === "login" ? onLogin : onSignup}>
          <div className="flex border border-soil/15 p-1">
            <button type="button" className={`h-10 flex-1 text-sm ${mode === "login" ? "bg-emeraldInk text-paper" : ""}`} onClick={() => setMode("login")}>Login</button>
            <button type="button" className={`h-10 flex-1 text-sm ${mode === "signup" ? "bg-emeraldInk text-paper" : ""}`} onClick={() => setMode("signup")}>Sign up</button>
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold text-emeraldInk">{mode === "login" ? "Welcome back" : "Create workspace"}</h1>
          <div className="mt-5 space-y-3">
            {mode === "signup" && <input name="name" className="h-11 w-full border border-soil/20 bg-paper px-3 text-sm outline-none" placeholder="Full name" />}
            <input name="email" defaultValue="hr@staffmanager.dev" className="h-11 w-full border border-soil/20 bg-paper px-3 text-sm outline-none" placeholder="Email" />
            <input name="password" defaultValue="Hr@12345" type="password" className="h-11 w-full border border-soil/20 bg-paper px-3 text-sm outline-none" placeholder="Password" />
          </div>
          <button className="primary-button mt-5 h-11 w-full border border-emeraldInk bg-emeraldInk px-3 text-sm text-paper">{mode === "login" ? "Login to dashboard" : "Create demo account"}</button>
          <p className="mt-4 text-xs text-soil/60">Use any listed demo account. Invalid login falls back to HR Manager for demo flow.</p>
        </form>
      </section>
    </main>
  );
}

function Dashboard({ employees, openModule, openDetail, showToast, menu, setMenu }: { employees: Employee[]; openModule: (id: ModuleId) => void; openDetail: (detail: Detail) => void; showToast: (message: string) => void; menu: string | null; setMenu: (menu: string | null) => void }) {
  const kpis = [
    ["Employee Count", String(employees.length), "employees"],
    ["Today's Attendance", "91%", "attendance"],
    ["Pending Leaves", "23", "leave"],
    ["Payroll Summary", "$482k", "payroll"]
  ] as const;
  return (
    <div className="page-enter space-y-5">
      <section className="panel hero-panel border border-soil/15 bg-[#fbf8f1] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-soil/55">Saturday, August 1, 2026</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-emeraldInk">Operations desk</h1>
          </div>
          <button className="primary-button flex h-10 items-center gap-2 border border-emeraldInk bg-emeraldInk px-3 text-sm text-paper" onClick={() => openDetail({ title: "New Employee", subtitle: "Create employee", fields: {}, mode: "createEmployee" })}><Plus size={16} /> Add employee</button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map(([label, value, target]) => (
            <article key={label} className="kpi-card border border-soil/15 bg-paper p-4">
              <button className="w-full text-left" onClick={() => openModule(target as ModuleId)}>
                <div className="font-display text-3xl font-semibold">{value}</div>
                <div className="mt-1 text-sm font-medium">{label}</div>
                <div className="mt-3 border-t border-soil/10 pt-3 text-xs text-soil/60">Click to open full module</div>
              </button>
            </article>
          ))}
        </div>
      </section>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <EmployeesTable rows={employees.slice(0, 10)} openDetail={openDetail} showToast={showToast} menu={menu} setMenu={setMenu} />
        <RecruitmentPipeline openModule={openModule} />
      </div>
    </div>
  );
}

function EmployeesView({ employees, openDetail, showToast, menu, setMenu, createEmployee, updateEmployee, deleteEmployee }: { employees: Employee[]; openDetail: (detail: Detail) => void; showToast: (message: string) => void; menu: string | null; setMenu: (menu: string | null) => void; createEmployee: (event: FormEvent<HTMLFormElement>) => Promise<void>; updateEmployee: (id: string, patch: Partial<Employee>) => Promise<void>; deleteEmployee: (id: string) => Promise<void> }) {
  return (
    <div className="page-enter space-y-4">
      <Toolbar eyebrow="Employee Management" title="People directory" primary="New employee" onPrimary={() => openDetail({ title: "New Employee", subtitle: "Add a person to the directory", fields: {}, mode: "createEmployee" })} />
      <EmployeesTable rows={employees} openDetail={openDetail} showToast={showToast} menu={menu} setMenu={setMenu} updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} createEmployee={createEmployee} />
    </div>
  );
}

function EmployeesTable({ rows, openDetail, showToast, menu, setMenu, updateEmployee, deleteEmployee }: { rows: Employee[]; openDetail: (detail: Detail) => void; showToast: (message: string) => void; menu: string | null; setMenu: (menu: string | null) => void; updateEmployee?: (id: string, patch: Partial<Employee>) => Promise<void>; deleteEmployee?: (id: string) => Promise<void>; createEmployee?: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  return (
    <section className="table-shell overflow-visible border border-soil/15 bg-[#fbf8f1]">
      <TableTitle title="Employees" menu="employee-table" menuState={menu} setMenu={setMenu} actions={[["Export CSV", () => showToast("Employee CSV prepared.")], ["Print", () => window.print()]]} />
      <DataTable
        columns={["name", "department", "status", "attendance", "leave", "salary", "risk"]}
        rows={rows}
        getTitle={(row) => row.name}
        menu={menu}
        setMenu={setMenu}
        onOpen={(row) => openDetail({ title: row.name, subtitle: `${row.role} | ${row.id}`, fields: row, insights: aiInsights("employees", row) })}
        actions={(row) => [
          ["View full profile", () => openDetail({ title: row.name, subtitle: `${row.role} | ${row.id}`, fields: row, insights: aiInsights("employees", row) })],
          ["Edit profile", () => openDetail({ title: `Edit ${row.name}`, subtitle: `${row.role} | ${row.id}`, fields: row, mode: "editEmployee", employeeId: row.id })],
          ["Mark present", () => showToast(`${row.name} marked present.`)],
          ["Mark present in DB", () => void updateEmployee?.(row.id, { attendance: "On site" })],
          ["Promote status", () => void updateEmployee?.(row.id, { status: "Active" })],
          ["Delete employee", () => void deleteEmployee?.(row.id)]
        ]}
      />
    </section>
  );
}

function ModuleView({ id, query, segment, openDetail, showToast, menu, setMenu }: { id: Exclude<ModuleId, "dashboard" | "employees">; query: string; segment: string; openDetail: (detail: Detail) => void; showToast: (message: string) => void; menu: string | null; setMenu: (menu: string | null) => void }) {
  const module = moduleData[id];
  const rows = module.rows.filter((row) => {
    const values = Object.values(row);
    return values.join(" ").toLowerCase().includes(query.toLowerCase()) && (segment === "All" || values.includes(segment));
  });
  return (
    <div className="page-enter space-y-4">
      <Toolbar eyebrow="Workspace module" title={module.title} primary="Create record" onPrimary={() => openDetail({ title: `Create ${module.title} Record`, subtitle: "Demo creation form", fields: {} })} />
      {id === "recruitment" && <RecruitmentPipeline openModule={() => undefined} />}
      <section className="table-shell overflow-visible border border-soil/15 bg-[#fbf8f1]">
        <div className="grid gap-3 border-b border-soil/15 p-4 sm:grid-cols-3">
          {module.metrics.map((metric) => <button key={metric} className="metric-card border border-soil/15 bg-paper p-3 text-left" onClick={() => showToast(`${metric} selected.`)}>{metric}</button>)}
        </div>
        <DataTable
          columns={module.columns}
          rows={rows}
          getTitle={(row) => row[module.columns[0]]}
          menu={menu}
          setMenu={setMenu}
          onOpen={(row) => openDetail({ title: row[module.columns[0]], subtitle: module.title, fields: row, insights: aiInsights(id, row) })}
          actions={(row) => [
            ["Open details", () => openDetail({ title: row[module.columns[0]], subtitle: module.title, fields: row, insights: aiInsights(id, row) })],
            ["Export row", () => showToast(`${row[module.columns[0]]} exported.`)],
            ["AI summarize", () => openDetail({ title: `AI Summary: ${row[module.columns[0]]}`, subtitle: module.title, fields: row, insights: aiInsights(id, row) })]
          ]}
        />
      </section>
    </div>
  );
}

function DataTable<T extends DemoRow>({ columns, rows, getTitle, onOpen, actions, menu, setMenu }: { columns: string[]; rows: T[]; getTitle: (row: T) => string; onOpen: (row: T) => void; actions: (row: T) => [string, () => void][]; menu: string | null; setMenu: (menu: string | null) => void }) {
  return (
    <div className="overflow-visible">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead className="bg-stone/55 text-xs uppercase tracking-[0.12em] text-soil/60">
          <tr>{columns.map((column) => <th key={column} className="border-b border-soil/15 px-4 py-3 font-semibold">{column}</th>)}<th className="border-b border-soil/15 px-4 py-3" /></tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${getTitle(row)}-${index}`} className="data-row hover:bg-stone/30">
              {columns.map((column, colIndex) => (
                <td key={column} className="border-b border-soil/10 px-4 py-3">
                  {colIndex === 0 ? <button className="font-semibold text-emeraldInk" onClick={() => onOpen(row)}>{row[column]}</button> : statusLike(column) ? <Status value={row[column]} /> : row[column]}
                </td>
              ))}
              <td className="relative border-b border-soil/10 px-4 py-3">
                <MenuButton id={`${getTitle(row)}-${index}`} menu={menu} setMenu={setMenu} actions={actions(row)} />
              </td>
            </tr>
          ))}
          {!rows.length && <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-soil/60">No records match this search or filter.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function Toolbar({ eyebrow, title, primary, onPrimary }: { eyebrow: string; title: string; primary: string; onPrimary: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><p className="text-xs uppercase tracking-[0.18em] text-soil/55">{eyebrow}</p><h1 className="mt-1 font-display text-3xl font-semibold text-emeraldInk">{title}</h1></div>
      <button className="primary-button flex h-10 items-center gap-2 border border-emeraldInk bg-emeraldInk px-3 text-sm text-paper" onClick={onPrimary}><Plus size={16} /> {primary}</button>
    </div>
  );
}

function TableTitle({ title, menu: id, menuState, setMenu, actions }: { title: string; menu: string; menuState: string | null; setMenu: (menu: string | null) => void; actions: [string, () => void][] }) {
  return <div className="flex items-center justify-between border-b border-soil/15 px-4 py-3"><h2 className="font-display text-xl font-semibold text-emeraldInk">{title}</h2><MenuButton id={id} menu={menuState} setMenu={setMenu} actions={actions} /></div>;
}

function MenuButton({ id, menu, setMenu, actions }: { id: string; menu: string | null; setMenu: (menu: string | null) => void; actions: [string, () => void][] }) {
  const open = menu === id;
  return (
    <div className="relative inline-flex">
      <button className="icon-button border border-soil/20 p-2" onClick={() => setMenu(open ? null : id)} aria-label="More actions" aria-expanded={open}><MoreHorizontal size={17} /></button>
      {open && <div className="action-menu absolute right-0 top-11 z-40 min-w-48 border border-soil/15 bg-[#fbf8f1] p-1 shadow-lift">{actions.map(([label, action]) => <button key={label} className="block w-full px-3 py-2 text-left text-sm hover:bg-stone/55" onClick={() => { action(); setMenu(null); }}>{label}</button>)}</div>}
    </div>
  );
}

function FilterPanel({ segment, setSegment, onClose }: { segment: string; setSegment: (segment: string) => void; onClose: () => void }) {
  const options = ["All", "Active", "Probation", "Contract", "Engineering", "People", "Finance", "Late", "Present", "Pending", "Ready", "Review", "High"];
  return (
    <div className="action-menu absolute right-0 top-12 z-40 w-72 border border-soil/15 bg-[#fbf8f1] p-3 shadow-lift">
      <div className="flex items-center justify-between"><div className="font-display text-lg font-semibold text-emeraldInk">Filters</div><button className="icon-button border border-soil/20 p-1" onClick={onClose}><X size={15} /></button></div>
      <div className="mt-3 grid grid-cols-2 gap-2">{options.map((item) => <button key={item} className={`border px-2 py-2 text-sm ${segment === item ? "border-emeraldInk bg-emeraldInk text-paper" : "border-soil/15 bg-paper"}`} onClick={() => setSegment(item)}>{item}</button>)}</div>
    </div>
  );
}

function NotificationsPanel({ openModule }: { openModule: (id: ModuleId) => void }) {
  return <div className="action-menu absolute right-0 top-12 z-40 w-80 border border-soil/15 bg-[#fbf8f1] p-2 shadow-lift">{[
    ["7 leave requests need manager approval", "leave"], ["3 payroll records are on hold", "payroll"], ["4 candidates reached offer stage", "recruitment"], ["MFA policy review is due", "settings"]
  ].map(([text, target]) => <button key={text} className="block w-full border-b border-soil/10 px-3 py-3 text-left text-sm last:border-b-0 hover:bg-stone/55" onClick={() => openModule(target as ModuleId)}>{text}</button>)}</div>;
}

function DetailDrawer({ detail, close, createEmployee, updateEmployee }: { detail: NonNullable<Detail>; close: () => void; createEmployee?: (event: FormEvent<HTMLFormElement>) => Promise<void>; updateEmployee?: (id: string, patch: Partial<Employee>) => Promise<void> }) {
  const isForm = Object.keys(detail.fields).length === 0 || detail.mode === "editEmployee";
  const saveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!detail.employeeId || !updateEmployee) return;
    const data = new FormData(event.currentTarget);
    await updateEmployee(detail.employeeId, {
      name: String(data.get("name") || detail.fields.name),
      role: String(data.get("role") || detail.fields.role),
      department: String(data.get("department") || detail.fields.department),
      status: String(data.get("status") || detail.fields.status),
      attendance: String(data.get("attendance") || detail.fields.attendance),
      salary: String(data.get("salary") || detail.fields.salary),
      manager: String(data.get("manager") || detail.fields.manager),
      location: String(data.get("location") || detail.fields.location),
      performance: String(data.get("performance") || detail.fields.performance),
      risk: String(data.get("risk") || detail.fields.risk)
    });
    close();
  };

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex justify-end bg-soil/35">
      <aside className="detail-drawer h-full w-full max-w-xl overflow-y-auto border-l border-soil/15 bg-[#fbf8f1] p-5 shadow-lift">
        <div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-2xl font-semibold text-emeraldInk">{detail.title}</h2><p className="mt-1 text-sm text-soil/60">{detail.subtitle}</p></div><button className="icon-button border border-soil/20 p-2" onClick={close}><X size={16} /></button></div>
        {isForm ? (
          <form className="mt-5 grid gap-3 sm:grid-cols-2" onSubmit={detail.mode === "editEmployee" ? saveEdit : createEmployee ?? ((event) => { event.preventDefault(); close(); })}>
            <input name="name" defaultValue={detail.fields.name ?? ""} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none" placeholder="Employee name" />
            <input name="role" defaultValue={detail.fields.role ?? ""} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none" placeholder="Role" />
            <select name="department" defaultValue={detail.fields.department ?? "People"} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none">
              {["People", "Engineering", "Finance", "Design", "Operations", "Analytics", "Sales", "Support"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select name="status" defaultValue={detail.fields.status ?? "Active"} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none">
              {["Active", "Probation", "Contract", "Notice"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select name="attendance" defaultValue={detail.fields.attendance ?? "On site"} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none">
              {["On site", "Remote", "Late", "Absent"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <input name="salary" defaultValue={detail.fields.salary ?? "$6,500"} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none" placeholder="Salary" />
            <input name="manager" defaultValue={detail.fields.manager ?? "Nisha Rao"} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none" placeholder="Manager" />
            <input name="location" defaultValue={detail.fields.location ?? "Bengaluru"} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none" placeholder="Location" />
            <select name="performance" defaultValue={detail.fields.performance ?? "New"} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none">
              {["New", "Stable", "Strong", "Exceeds", "Watch"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select name="risk" defaultValue={detail.fields.risk ?? "Low"} className="h-11 border border-soil/20 bg-paper px-3 text-sm outline-none">
              {["Low", "Medium", "High"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <button className="primary-button h-11 border border-emeraldInk bg-emeraldInk text-paper sm:col-span-2">{detail.mode === "editEmployee" ? "Save profile changes" : "Save employee"}</button>
          </form>
        ) : <div className="mt-5 grid gap-3">{Object.entries(detail.fields).filter(([key]) => key !== "avatar").map(([key, value]) => <div key={key} className="border border-soil/15 bg-paper p-3"><div className="text-xs uppercase tracking-[0.14em] text-soil/50">{key}</div><div className="mt-1 font-semibold">{value}</div></div>)}</div>}
        {detail.insights && <section className="mt-5 border border-emeraldInk/25 bg-emeraldInk/5 p-4"><div className="flex items-center gap-2 font-display text-lg font-semibold text-emeraldInk"><Sparkles size={18} /> AI recommendations</div><div className="mt-3 space-y-2">{detail.insights.map((item) => <div key={item} className="border-l border-amberLine pl-3 text-sm">{item}</div>)}</div></section>}
      </aside>
    </div>
  );
}

function AIPanel({ active, employees, openModule, analysis, runAnalysis, loading, customAnalysis, runCustomAnalysis, customLoading }: { active: ModuleId; employees: Employee[]; openModule: (id: ModuleId) => void; analysis: AnalysisReport | null; runAnalysis: () => Promise<void>; loading: boolean; customAnalysis: CustomAnalysis | null; runCustomAnalysis: (input: string) => Promise<void>; customLoading: boolean }) {
  const highRisk = employees.filter((item) => item.risk === "High").length;
  const activeArea = analysis?.areas.find((area) => area.area.toLowerCase().includes(active === "employees" ? "employees" : active));
  const [customInput, setCustomInput] = useState("Dev Patel is late repeatedly, payroll is in review, and one leave approval is pending.");
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <section className="ai-panel ai-panel-minimized fixed bottom-5 left-5 right-5 z-30 border border-soil/15 bg-[#fbf8f1] p-3 shadow-lift lg:left-auto lg:w-96">
        <div className="flex items-center gap-3">
          <button className="flex flex-1 items-center gap-2 text-left font-display text-lg font-semibold text-emeraldInk" onClick={() => setMinimized(false)} aria-label="Expand AI Analyzer">
            <BrainCircuit size={19} /> AI Analyzer
          </button>
          <span className="hidden text-xs text-soil/60 sm:inline">{analysis ? `${analysis.status} ${analysis.averageScore}/100` : "Ready"}</span>
          <button className="action-button border border-soil/20 px-2 py-1 text-xs" onClick={() => void runAnalysis()} disabled={loading}>{loading ? "Running" : "Run"}</button>
          <button className="icon-button border border-soil/20 p-2" onClick={() => setMinimized(false)} aria-label="Restore AI Analyzer">
            <Plus size={15} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="ai-panel fixed bottom-5 left-5 right-5 z-30 max-h-[70vh] overflow-y-auto border border-soil/15 bg-[#fbf8f1] p-3 shadow-lift lg:left-auto lg:w-[28rem]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-display text-lg font-semibold text-emeraldInk"><BrainCircuit size={19} /> AI Analyzer</div>
        <div className="flex items-center gap-2">
          <button className="action-button border border-soil/20 px-2 py-1 text-xs" onClick={() => void runAnalysis()} disabled={loading}>{loading ? "Running" : "Run"}</button>
          <button className="icon-button border border-soil/20 p-2" onClick={() => setMinimized(true)} aria-label="Minimize AI Analyzer">
            <Minus size={15} />
          </button>
        </div>
      </div>
      <div className="mt-2 grid gap-2 text-xs text-soil/70 sm:grid-cols-3">
        <div className="border border-soil/15 bg-paper p-2">Checks employee risk, attendance, leave, payroll, hiring, reports, settings.</div>
        <div className="border border-soil/15 bg-paper p-2">Scores each area and shows action recommendations.</div>
        <div className="border border-soil/15 bg-paper p-2">Accepts custom pasted HR data for instant analysis.</div>
      </div>
      <p className="mt-2 text-sm text-soil/70">
        {analysis ? `Workspace ${analysis.status}: ${analysis.averageScore}/100. ${analysis.attentionAreas.length} areas need review.` : `Context: ${active}. ${highRisk ? `${highRisk} high-risk employee needs retention follow-up.` : "Ready to analyze."}`}
      </p>
      {activeArea && (
        <div className="mt-3 border border-soil/15 bg-paper p-3">
          <div className="flex items-center justify-between text-sm"><strong>{activeArea.area}</strong><Status value={activeArea.status} /></div>
          <div className="mt-2 text-sm">Score: {activeArea.score}/100</div>
          <ul className="mt-2 space-y-1 text-xs text-soil/70">
            {activeArea.recommendations.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="action-button border border-soil/20 px-2 py-2 text-sm" onClick={() => openModule("leave")}>Predict leave</button>
        <button className="action-button border border-soil/20 px-2 py-2 text-sm" onClick={() => openModule("recruitment")}>Rank pipeline</button>
      </div>
      <div className="mt-3 border-t border-soil/10 pt-3">
        <label className="text-xs uppercase tracking-[0.14em] text-soil/50">Insert data to analyze</label>
        <textarea value={customInput} onChange={(event) => setCustomInput(event.target.value)} className="mt-2 min-h-24 w-full border border-soil/20 bg-paper p-2 text-sm outline-none" />
        <button className="primary-button mt-2 h-9 w-full border border-emeraldInk bg-emeraldInk text-sm text-paper" onClick={() => void runCustomAnalysis(customInput)} disabled={customLoading}>{customLoading ? "Analyzing..." : "Analyze inserted data"}</button>
        {customAnalysis && (
          <div className="mt-3 border border-soil/15 bg-paper p-3 text-sm">
            <div className="flex items-center justify-between"><strong>Custom result</strong><Status value={customAnalysis.status} /></div>
            <div className="mt-1">Score: {customAnalysis.score}/100</div>
            <div className="mt-2 text-xs text-soil/60">Detected: {customAnalysis.detectedAreas.length ? customAnalysis.detectedAreas.join(", ") : "general HR note"}</div>
            <ul className="mt-2 space-y-1 text-xs text-soil/70">
              {customAnalysis.recommendations.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function RecruitmentPipeline({ openModule }: { openModule: (id: ModuleId) => void }) {
  const stages = ["Sourcing", "Screening", "Technical Interview", "Panel Interview", "Offer", "Background Check"];
  return (
    <section className="panel border border-soil/15 bg-[#fbf8f1] p-5">
      <div className="flex items-center justify-between"><h2 className="font-display text-xl font-semibold text-emeraldInk">Pipeline classification</h2><button className="icon-button border border-soil/20 p-2" onClick={() => openModule("recruitment")}><Eye size={16} /></button></div>
      <div className="mt-4 grid gap-2">{stages.map((stage, index) => <div key={stage} className="border border-soil/15 bg-paper p-3"><div className="flex items-center justify-between text-sm"><span className="font-semibold">{stage}</span><span>{[50, 37, 22, 11, 4, 3][index]} candidates</span></div><div className="mt-2 h-2 bg-stone"><div className="h-full bg-emeraldInk" style={{ width: `${[92, 72, 54, 38, 20, 14][index]}%` }} /></div></div>)}</div>
    </section>
  );
}

function Status({ value }: { value: string }) {
  const text = String(value);
  const normalized = text.toLowerCase();
  const positive = ["active", "approved", "healthy", "enabled", "present", "ready", "low"].includes(normalized);
  const warning = ["pending", "probation", "late", "review", "watch", "medium", "screening", "technical interview", "panel interview", "background check"].includes(normalized);
  const Icon = positive ? Check : warning ? Clock3 : X;
  return <span className={`status-pill inline-flex h-7 items-center gap-1 border px-2 text-xs font-semibold ${positive ? "border-moss/40 bg-moss/10 text-emeraldInk" : warning ? "border-amberLine/50 bg-amberLine/10 text-soil" : "border-clay/40 bg-clay/10 text-clay"}`}><Icon size={13} />{text}</span>;
}

function statusLike(column: string) {
  return ["status", "Status", "Health", "Priority", "Pipeline Stage", "risk"].includes(column);
}

function aiInsights(module: ModuleId, row: DemoRow) {
  if (module === "recruitment") return [`Classified as ${row["Pipeline Stage"]}; next best action is owner follow-up within 24 hours.`, `AI priority score: ${row.Priority === "High" ? "88" : "64"}/100 based on target date and candidate volume.`];
  if (module === "employees") return [`Retention risk is ${row.risk}; schedule manager check-in if risk is Medium or High.`, `Recommended action: review leave balance, attendance pattern, and performance trend together.`];
  if (module === "payroll") return [`Payroll status is ${row.Status}; verify deductions before final approval.`, "AI anomaly check compares bonus, deduction, and net salary against peer bands."];
  if (module === "settings") return [`Configuration owner: ${row.Owner}. Keep review evidence attached to audit logs.`, "AI policy assistant can draft employee-facing policy text from this configuration."];
  return ["AI summary generated from visible fields.", "Recommended next action: open related report and verify owner accountability."];
}

export default App;
