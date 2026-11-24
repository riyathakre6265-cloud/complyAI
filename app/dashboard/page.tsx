"use client";

import { useEffect, useState } from "react";

/* ==============================
   TYPES
============================== */

type CallResult = {
  id: string;
  agent: string;
  customer: string;
  file?: string;
  date: string;
  duration: string;
  complianceScore: number;
  riskLevel: string;
  summary?: string;
  status: string;
  violations: string[];
};

/* ==============================
   SAMPLE DATA
============================== */

const initialCalls: CallResult[] = [
  {
    id: "CALL-001",
    agent: "Rahul Sharma",
    customer: "Amit Verma",
    date: "25 Nov 2026",
    duration: "05:42",
    complianceScore: 96,
    riskLevel: "Low",
    status: "Completed",
    violations: [],
  },
  {
    id: "CALL-002",
    agent: "Priya Singh",
    customer: "Neha Gupta",
    date: "25 Nov 2026",
    duration: "08:15",
    complianceScore: 72,
    riskLevel: "Medium",
    status: "Review Required",
    violations: ["Missing Disclosure"],
  },
  {
    id: "CALL-003",
    agent: "Aman Patel",
    customer: "Rohit Kumar",
    date: "24 Nov 2026",
    duration: "06:30",
    complianceScore: 48,
    riskLevel: "High",
    status: "Flagged",
    violations: [
      "Misleading Information",
      "Missing Consent",
    ],
  },
  {
    id: "CALL-004",
    agent: "Sneha Verma",
    customer: "Karan Mehta",
    date: "24 Nov 2026",
    duration: "04:50",
    complianceScore: 91,
    riskLevel: "Low",
    status: "Completed",
    violations: [],
  },
];

/* ==============================
   MAIN DASHBOARD
============================== */

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState("Dashboard");

  const [calls, setCalls] = useState<CallResult[]>(
    initialCalls
  );

  const [search, setSearch] = useState("");

  const [selectedCall, setSelectedCall] =
    useState<CallResult | null>(null);

  const [uploadFile, setUploadFile] =
    useState<File | null>(null);

  const [analyzing, setAnalyzing] = useState(false);
const [customerName, setCustomerName] = useState("");
const [agentName, setAgentName] = useState("");
const [callType, setCallType] = useState("Inbound");
const [callDate, setCallDate] = useState("");

  useEffect(() => {
  setCallDate(new Date().toISOString().split("T")[0]);
  }, []);

  const navigation = [
    { name: "Dashboard", icon: "📊" },
    { name: "Calls", icon: "📞" },
    { name: "Upload Call", icon: "📤" },
    { name: "Violations", icon: "🛡️" },
    { name: "Risk Analytics", icon: "📈" },
    { name: "Audit Reports", icon: "📑" },
  ];

  const totalCalls = calls.length;

  const averageScore = totalCalls
    ? Math.round(
        calls.reduce(
          (sum, call) => sum + call.complianceScore,
          0
        ) / totalCalls
      )
    : 0;

  const highRiskCalls = calls.filter(
    (call) => call.riskLevel === "High"
  ).length;

  const totalViolations = calls.reduce(
    (sum, call) => sum + call.violations.length,
    0
  );

  const filteredCalls = calls.filter(
    (call) =>
      call.agent.toLowerCase().includes(search.toLowerCase()) ||
      call.customer.toLowerCase().includes(search.toLowerCase()) ||
      call.id.toLowerCase().includes(search.toLowerCase())
  );
  /* ==============================
     REUSABLE COMPONENTS
  ============================== */

  const StatCard = ({
    title,
    value,
    icon,
    color,
    subtitle,
  }: {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    subtitle: string;
  }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {value}
          </h2>
        </div>

        <div className="text-3xl bg-slate-800 p-4 rounded-xl">
          {icon}
        </div>

      </div>

      <p className={`text-sm mt-4 ${color}`}>
        {subtitle}
      </p>

    </div>
  );

  const RiskBadge = ({ risk }: { risk: string }) => {

    const styles: Record<string, string> = {
      Low: "bg-green-500/10 text-green-400",
      Medium: "bg-yellow-500/10 text-yellow-400",
      High: "bg-red-500/10 text-red-400",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[risk] || ""}`}>
        {risk}
      </span>
    );
  };

  /* ==============================
     DASHBOARD OVERVIEW
  ============================== */

  const DashboardOverview = () => (

    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome to ComplyAI Call Intelligence.
          Here is your compliance overview.
        </p>
      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Calls"
          value={totalCalls}
          icon="📞"
          color="text-blue-400"
          subtitle="Total analyzed calls"
        />

        <StatCard
          title="Average Compliance"
          value={`${averageScore}%`}
          icon="🛡️"
          color="text-green-400"
          subtitle="Overall compliance score"
        />

        <StatCard
          title="High Risk Calls"
          value={highRiskCalls}
          icon="⚠️"
          color="text-red-400"
          subtitle="Calls requiring attention"
        />

        <StatCard
          title="Total Violations"
          value={totalViolations}
          icon="🚨"
          color="text-yellow-400"
          subtitle="Detected compliance issues"
        />

      </div>

      {/* CHART SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold">
            Call Performance Analytics
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Weekly call monitoring overview
          </p>

          <div className="flex items-end justify-around gap-3 h-56 mt-8 border-b border-slate-700">

            {[45, 70, 55, 85, 65, 95, 75].map(
              (height, index) => (

                <div
                  key={index}
                  className="flex flex-col items-center justify-end h-full gap-3"
                >

                  <div
                    className="w-7 sm:w-12 bg-blue-500 hover:bg-blue-400 rounded-t-lg transition"
                    style={{ height: `${height}%` }}
                  />

                  <span className="text-xs text-gray-400">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

        {/* COMPLIANCE SUMMARY */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold">
            Compliance Overview
          </h2>

          <div className="flex flex-col items-center justify-center py-8">

            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(#22c55e ${averageScore * 3.6}deg, #1e293b 0deg)`,
              }}
            >

              <div className="w-32 h-32 rounded-full bg-slate-900 flex items-center justify-center">

                <span className="text-3xl font-bold text-green-400">
                  {averageScore}%
                </span>

              </div>

            </div>

            <p className="text-gray-400 mt-5">
              Average Compliance Score
            </p>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-400">Low Risk</span>
              <span className="text-green-400">
                {calls.filter(c => c.riskLevel === "Low").length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Medium Risk</span>
              <span className="text-yellow-400">
                {calls.filter(c => c.riskLevel === "Medium").length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">High Risk</span>
              <span className="text-red-400">
                {highRiskCalls}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* RECENT CALLS */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              Recent Calls
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Latest analyzed customer conversations
            </p>
          </div>

          <button
            onClick={() => setActiveTab("Calls")}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            View All →
          </button>

        </div>

        <CallsTable
          data={calls.slice(0, 4)}
          onSelect={setSelectedCall}
        />

      </div>

    </div>
  );
  /* ==============================
     CALLS TABLE
  ============================== */

  const CallsTable = ({
    data,
    onSelect,
  }: {
    data: CallResult[];
    onSelect: (call: CallResult) => void;
  }) => (

    <div className="overflow-x-auto">

      <table className="w-full text-left min-w-[750px]">

        <thead className="text-gray-400 text-sm border-b border-slate-700">

          <tr>
            <th className="py-4">Call ID</th>
            <th>Agent</th>
            <th>Customer</th>
            <th>Score</th>
            <th>Risk Level</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {data.map((call) => (

            <tr
              key={call.id}
              className="border-b border-slate-800 hover:bg-slate-800/50"
            >

              <td className="py-5 text-blue-400">
                {call.id}
              </td>

              <td>{call.agent}</td>

              <td>{call.customer}</td>

              <td className="font-semibold">
                {call.complianceScore}%
              </td>

              <td>
                <RiskBadge risk={call.riskLevel} />
              </td>

              <td className="text-sm text-gray-300">
                {call.status}
              </td>

              <td>
                <button
                  onClick={() => onSelect(call)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  View
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {data.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          No calls found.
        </p>
      )}

    </div>

  );

  /* ==============================
     CALL MANAGEMENT
  ============================== */

  const CallsManagement = () => (

    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Calls Management
        </h1>

        <p className="text-gray-400 mt-2">
          Manage and monitor all customer calls.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">

        <input
          type="text"
          placeholder="Search by Call ID, Agent or Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={() => setActiveTab("Upload Call")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          + Upload New Call
        </button>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <CallsTable
          data={filteredCalls}
          onSelect={setSelectedCall}
        />

      </div>

    </div>

  );

  /* ==============================
     UPLOAD CALL
  ============================== */

const UploadCall = () => (

  <div className="space-y-6">

    <div>
      <h1 className="text-3xl font-bold">
        Upload Call
      </h1>

      <p className="text-gray-400 mt-2">
        Upload customer call recordings for compliance analysis.
      </p>
    </div>

    <div className="max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-8">

      {/* CUSTOMER NAME */}

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">
          Customer Name *
        </label>

        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* AGENT NAME */}

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">
          Agent Name *
        </label>

        <input
          type="text"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          placeholder="Enter agent name"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* CALL TYPE */}

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">
          Call Type *
        </label>

        <select
          value={callType}
          onChange={(e) => setCallType(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          <option value="Inbound">Inbound</option>
          <option value="Outbound">Outbound</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Support">Customer Support</option>
        </select>
      </div>

      {/* CALL DATE */}

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">
          Call Date *
        </label>

        <input
          type="date"
          value={callDate}
          onChange={(e) => setCallDate(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>
      {/* AUDIO UPLOAD */}

      <div className="border-2 border-dashed border-blue-500/50 rounded-2xl p-10 text-center">

        <div className="text-5xl mb-5">
          📤
        </div>

        <h2 className="text-xl font-semibold">
          Upload Audio Recording
        </h2>

        <p className="text-gray-400 text-sm mt-3">
          Select an audio file from your device.
        </p>

        <input
          type="file"
          accept="audio/*"
          onChange={(e) =>
            setUploadFile(e.target.files?.[0] || null)
          }
          className="mt-6 block w-full text-sm text-gray-400 file:bg-blue-600 file:text-white file:border-0 file:px-5 file:py-3 file:rounded-lg"
        />

      </div>

      {uploadFile && (

        <div className="bg-slate-800 rounded-xl p-4 mt-6">

          <p className="text-green-400 font-semibold">
            ✓ File Selected
          </p>

          <p className="text-gray-300 text-sm mt-2">
            {uploadFile.name}
          </p>

        </div>

      )}

      {/* ANALYZE BUTTON */}

      <button
        disabled={
          !customerName.trim() ||
          !agentName.trim() ||
          !callDate ||
          !uploadFile ||
          analyzing
        }
        onClick={() => {

          setAnalyzing(true);

          setTimeout(() => {

            const newCall: CallResult = {
              id: `CALL-${Date.now()}`,
              agent: agentName.trim(),
              customer: customerName.trim(),
              file: uploadFile!.name,
              date: callDate,
              duration: "Processing",
              complianceScore: 0,
              riskLevel: "Low",
              violations: [],
              summary: "Call uploaded. AI analysis is pending.",
              status: "Pending",
            };

            setCalls((previousCalls) => [
              newCall,
              ...previousCalls,
            ]);

            setAnalyzing(false);
            setUploadFile(null);
            setCustomerName("");
            setAgentName("");
            setCallType("Inbound");
            setCallDate(new Date().toISOString().split("T")[0]);

            alert("Call uploaded successfully!");

            setActiveTab("Calls");

          }, 1000);

        }}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-4 rounded-xl font-semibold mt-6"
      >
        {analyzing ? "Uploading..." : "Upload Call →"}
      </button>

    </div>

  </div>

);



  /* ==============================
     COMPLIANCE VIOLATIONS
  ============================== */

  const Violations = () => {

    const violationCalls = calls.filter(
      (call) => call.violations.length > 0
    );

    return (

      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Compliance Violations
          </h1>

          <p className="text-gray-400 mt-2">
            Identify and review compliance issues detected in calls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <StatCard
            title="Total Violations"
            value={totalViolations}
            icon="🚨"
            color="text-red-400"
            subtitle="Detected issues"
          />

          <StatCard
            title="Affected Calls"
            value={violationCalls.length}
            icon="📞"
            color="text-yellow-400"
            subtitle="Calls with violations"
          />

          <StatCard
            title="Clean Calls"
            value={calls.length - violationCalls.length}
            icon="✅"
            color="text-green-400"
            subtitle="No violations detected"
          />

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Detected Violations
          </h2>

          <div className="space-y-4">

            {violationCalls.map((call) => (

              <div
                key={call.id}
                className="bg-slate-800 rounded-xl p-5"
              >

                <div className="flex flex-wrap justify-between gap-3">

                  <div>
                    <h3 className="font-semibold">
                      {call.id}
                    </h3>

                    <p className="text-gray-400 text-sm mt-2">
                      Agent: {call.agent}
                    </p>
                  </div>

                  <RiskBadge risk={call.riskLevel} />

                </div>

                <div className="mt-4 space-y-2">

                  {call.violations.map((violation, index) => (

                    <p
                      key={index}
                      className="text-red-400 text-sm"
                    >
                      ⚠️ {violation}
                    </p>

                  ))}

                </div>

              </div>

            ))}

            {violationCalls.length === 0 && (
              <p className="text-gray-400">
                No violations detected.
              </p>
            )}

          </div>

        </div>

      </div>

    );
  };

  /* ==============================
     RISK ANALYTICS
  ============================== */

  const RiskAnalytics = () => (

    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Risk Analytics
        </h1>

        <p className="text-gray-400 mt-2">
          Monitor customer interaction risks and compliance performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <StatCard
          title="Low Risk"
          value={calls.filter(c => c.riskLevel === "Low").length}
          icon="🟢"
          color="text-green-400"
          subtitle="Safe interactions"
        />

        <StatCard
          title="Medium Risk"
          value={calls.filter(c => c.riskLevel === "Medium").length}
          icon="🟡"
          color="text-yellow-400"
          subtitle="Needs monitoring"
        />

        <StatCard
          title="High Risk"
          value={highRiskCalls}
          icon="🔴"
          color="text-red-400"
          subtitle="Immediate attention required"
        />

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Risk Distribution
        </h2>

        {[
          {
            name: "Low Risk",
            value: calls.filter(c => c.riskLevel === "Low").length,
            color: "bg-green-500",
          },
          {
            name: "Medium Risk",
            value: calls.filter(c => c.riskLevel === "Medium").length,
            color: "bg-yellow-500",
          },
          {
            name: "High Risk",
            value: highRiskCalls,
            color: "bg-red-500",
          },
        ].map((item) => (

          <div key={item.name} className="mb-7">

            <div className="flex justify-between mb-3">

              <span>{item.name}</span>

              <span className="text-gray-400">
                {item.value} Calls
              </span>

            </div>

            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">

              <div
                className={`${item.color} h-full rounded-full`}
                style={{
                  width: `${calls.length ? (item.value / calls.length) * 100 : 0}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          High Risk Call Details
        </h2>

        <CallsTable
          data={calls.filter(c => c.riskLevel === "High")}
          onSelect={setSelectedCall}
        />

      </div>

    </div>

  );
  /* ==============================
     AUDIT REPORTS
  ============================== */

  const AuditReports = () => (

    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Audit Reports
        </h1>

        <p className="text-gray-400 mt-2">
          Review compliance audit summaries and reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <StatCard
          title="Total Reports"
          value={calls.length}
          icon="📑"
          color="text-blue-400"
          subtitle="Available call reports"
        />

        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          icon="📊"
          color="text-green-400"
          subtitle="Audit performance"
        />

        <StatCard
          title="Flagged Reports"
          value={highRiskCalls}
          icon="🚩"
          color="text-red-400"
          subtitle="Require review"
        />

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Available Audit Reports
        </h2>

        <CallsTable
          data={calls}
          onSelect={setSelectedCall}
        />

        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl mt-6 font-semibold"
        >
          🖨️ Print Audit Report
        </button>

      </div>

    </div>

  );

  /* ==============================
     CALL DETAILS
  ============================== */

  const CallDetails = () => {

    if (!selectedCall) return null;

    return (

      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-7 max-w-lg w-full">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Call Details
            </h2>

            <button
              onClick={() => setSelectedCall(null)}
              className="text-gray-400 text-2xl"
            >
              ×
            </button>

          </div>

          <div className="space-y-4 mt-7">

            <p>Call ID: {selectedCall.id}</p>

            <p>Agent: {selectedCall.agent}</p>

            <p>Customer: {selectedCall.customer}</p>

            <p>Date: {selectedCall.date}</p>

            <p>Duration: {selectedCall.duration}</p>

            <p>
              Compliance Score: {selectedCall.complianceScore}%
            </p>

            <p>
              Risk Level: <RiskBadge risk={selectedCall.riskLevel} />
            </p>

            <div>
              <p className="font-semibold mb-2">
                Detected Violations:
              </p>

              {selectedCall.violations.length > 0
                ? selectedCall.violations.map((v, i) => (
                    <p key={i} className="text-red-400 text-sm">
                      ⚠️ {v}
                    </p>
                  ))
                : <p className="text-green-400">No violations detected.</p>
              }
            </div>

          </div>

        </div>

      </div>

    );
  };

  /* ==============================
     MAIN LAYOUT
  ============================== */

  return (

    <main className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}

      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 hidden md:flex flex-col">

        <h1 className="text-2xl font-bold text-blue-400 mb-10">
          ComplyAI
        </h1>

        <p className="text-xs text-gray-500 uppercase mb-4">
          Main Menu
        </p>

        <nav className="space-y-2">

          {navigation.map((item) => (

            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                activeTab === item.name
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"
              }`}
            >

              <span>{item.icon}</span>

              <span>{item.name}</span>

            </button>

          ))}

        </nav>

        <div className="mt-auto bg-slate-800 rounded-xl p-4">

          <p className="text-green-400 text-sm font-semibold">
            ● System Active
          </p>

          <p className="text-gray-400 text-xs mt-2">
            ComplyAI Monitoring System
          </p>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <section className="flex-1 min-w-0">

        {/* TOP NAVBAR */}

        <header className="border-b border-slate-800 bg-slate-900/80 px-5 md:px-8 py-5 flex justify-between items-center">

          <div>

            <h2 className="text-xl font-bold">
              {activeTab}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              AI Powered Compliance Platform
            </p>

          </div>

          <div className="flex items-center gap-3">

            <span className="hidden sm:block text-sm text-gray-400">
              Admin
            </span>

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              A
            </div>

          </div>

        </header>

        {/* MOBILE NAVIGATION */}

        <div className="md:hidden flex gap-2 overflow-x-auto p-4 border-b border-slate-800">

          {navigation.map((item) => (

            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm ${
                activeTab === item.name
                  ? "bg-blue-600"
                  : "bg-slate-800 text-gray-300"
              }`}
            >
              {item.icon} {item.name}
            </button>

          ))}

        </div>

        {/* PAGE CONTENT */}

        <div className="p-5 md:p-8">

          {activeTab === "Dashboard" && <DashboardOverview />}

          {activeTab === "Calls" && <CallsManagement />}

          {activeTab === "Upload Call" && UploadCall()}

          {activeTab === "Violations" && <Violations />}

          {activeTab === "Risk Analytics" && <RiskAnalytics />}

          {activeTab === "Audit Reports" && <AuditReports />}

        </div>

      </section>

      {/* CALL DETAILS MODAL */}

      {selectedCall && <CallDetails />}

    </main>

  );

}
