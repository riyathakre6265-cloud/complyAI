"use client";

import { useState } from "react";

/* ==============================
   TYPES
============================== */

type CallResult = {
  id: string;
  agent: string;
  customer: string;
  file: string;
  complianceScore: number;
  riskLevel: string;
  violations: string[];
  summary: string;
  sentiment: string;
  transcript: string;
  date: string;
};

type AnalysisData = {
  complianceScore: number;
  riskLevel: string;
  violations: string[];
  summary: string;
  sentiment: string;
};

/* ==============================
   MAIN COMPONENT
============================== */

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [calls, setCalls] = useState<CallResult[]>([]);

  const [file, setFile] = useState<File | null>(null);

  const [agentName, setAgentName] = useState("");

  const [customerName, setCustomerName] = useState("");

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState<CallResult | null>(null);

  const [error, setError] = useState("");

  /* ==============================
     ANALYZE CALL
  ============================== */

  async function analyzeCall() {
    if (!file) {
      alert("Please upload an audio file first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();

      formData.append("audio", file);

      const response = await fetch(
        "http://localhost:5000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Backend Response:", data);
      console.log("Full Backend Data:", JSON.stringify(data, null, 2));
      console.log("Analysis Data:", data.analysis);
      console.log("AI Result:", data.aiResult);

      
       if (!response.ok) {
        throw new Error(
          data.message || "Backend analysis failed."
        );
      }

      const aiResult =
        data.analysis ||
        data.aiResult ||
        data.result?.analysis ||
        data.result;

      if (!aiResult) {
        throw new Error(
          "AI analysis data is missing. Check backend response."
        );
      }

      const result: CallResult = {
        id: "CALL-" + Date.now().toString().slice(-5),

        agent: agentName || "Unknown Agent",

        customer: customerName || "Unknown Customer",

        file: file.name,

        complianceScore:
          Number(aiResult.complianceScore) || 0,

        riskLevel:
          aiResult.riskLevel || "Unknown",

        violations:
          Array.isArray(aiResult.violations)
            ? aiResult.violations
            : [],

        summary:
          aiResult.summary || "No summary available.",

        sentiment:
          aiResult.sentiment || "Unknown",

        transcript:
          data.transcript || data.text || "",

        date: new Date().toLocaleDateString(),
      };

      setAnalysis(result);

      setCalls((previousCalls) => [
        result,
        ...previousCalls,
      ]);

      alert("AI Analysis completed successfully!");

    } catch (err: any) {
      console.error("Analysis Error:", err);

      setError(
        err.message || "Something went wrong."
      );

      alert(
        err.message || "Analysis failed."
      );

    } finally {
      setLoading(false);
    }
  }

  /* ==============================
     NAVIGATION
  ============================== */

  function navigate(tab: string) {
    setActiveTab(tab);
    setAnalysis(null);
    setError("");
  }

  /* ==============================
     STATISTICS
  ============================== */

  const totalCalls = calls.length;

  const averageScore =
    totalCalls > 0
      ? Math.round(
          calls.reduce(
            (total, call) =>
              total + call.complianceScore,
            0
          ) / totalCalls
        )
      : 0;

  const highRiskCalls = calls.filter(
    (call) => call.riskLevel.toLowerCase() === "high"
  ).length;

  const totalViolations = calls.reduce(
    (total, call) =>
      total + call.violations.length,
    0
  );

  /* ==============================
     RISK COLORS
  ============================== */

  function getRiskColor(risk: string) {
    switch (risk?.toLowerCase()) {
      case "high":
        return "text-red-400 bg-red-500/20";

      case "medium":
        return "text-yellow-400 bg-yellow-500/20";

      case "low":
        return "text-green-400 bg-green-500/20";

      default:
        return "text-gray-400 bg-gray-500/20";
    }
  }

  /* ==============================
     DASHBOARD
  ============================== */

  function Dashboard() {
    return (
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome to ComplyAI Call Intelligence
          </p>
        </div>

        {/* STATISTICS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Total Calls
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              {totalCalls}
            </h2>

            <p className="text-blue-400 text-sm mt-2">
              Calls analyzed
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Average Compliance
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              {averageScore}%
            </h2>

            <p className="text-green-400 text-sm mt-2">
              Overall compliance score
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400">
              High Risk Calls
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              {highRiskCalls}
            </h2>

            <p className="text-red-400 text-sm mt-2">
              Require attention
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Total Violations
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              {totalViolations}
            </h2>

            <p className="text-yellow-400 text-sm mt-2">
              Compliance issues detected
            </p>
          </div>

        </div>

        {/* RECENT CALLS */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold text-white">
              Recent Calls
            </h2>

            <button
              onClick={() => navigate("calls")}
              className="text-blue-400 hover:text-blue-300"
            >
              View All →
            </button>

          </div>

          {calls.length === 0 ? (
            <div className="text-center py-12">

              <p className="text-gray-400">
                No calls analyzed yet.
              </p>

              <button
                onClick={() => navigate("upload")}
                className="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white"
              >
                Analyze Your First Call
              </button>

            </div>
          ) : (
            <CallsTable calls={calls.slice(0, 5)} />
          )}

        </div>

      </div>
    );
  }
  /* ==============================
     UPLOAD CALL PAGE
  ============================== */

  function UploadCall() {
    return (
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Upload Call
          </h1>

          <p className="text-gray-400 mt-2">
            Upload your audio recording for AI compliance analysis
          </p>
        </div>

        {/* UPLOAD FORM */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* AGENT */}

            <div>
              <label className="block text-gray-300 mb-2">
                Agent Name
              </label>

              <input
                type="text"
                value={agentName}
                onChange={(e) =>
                  setAgentName(e.target.value)
                }
                placeholder="Enter agent name"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* CUSTOMER */}

            <div>
              <label className="block text-gray-300 mb-2">
                Customer Name
              </label>

              <input
                type="text"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                placeholder="Enter customer name"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-blue-500"
              />
            </div>

          </div>

          {/* AUDIO FILE */}

          <div className="mt-8">

            <label className="block text-gray-300 mb-3">
              Audio Recording
            </label>

            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center">

              <div className="text-5xl mb-4">
                🎧
              </div>

              <p className="text-white font-medium">
                Upload Audio File
              </p>

              <p className="text-gray-400 text-sm mt-2">
                MP3, WAV, M4A or other supported audio formats
              </p>

              <input
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const selectedFile =
                    e.target.files?.[0] || null;

                  setFile(selectedFile);
                  setAnalysis(null);
                  setError("");
                }}
                className="mt-6 block mx-auto text-gray-300"
              />

              {file && (
                <div className="mt-5 bg-gray-800 rounded-xl p-4">

                  <p className="text-green-400">
                    File Selected ✓
                  </p>

                  <p className="text-white mt-2 break-all">
                    {file.name}
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">

              <p className="text-red-400 font-medium">
                Analysis Error
              </p>

              <p className="text-red-300 text-sm mt-2">
                {error}
              </p>

            </div>
          )}

          {/* ANALYZE BUTTON */}

          <button
            onClick={analyzeCall}
            disabled={loading || !file}
            className={`w-full mt-8 py-4 rounded-xl font-semibold text-white transition ${
              loading || !file
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            {loading ? (
              <span>
                AI is Analyzing Call...
              </span>
            ) : (
              <span>
                🤖 Analyze Call with AI
              </span>
            )}

          </button>

        </div>

        {/* ANALYSIS RESULT */}

        {analysis && (
          <AnalysisResult
            analysis={analysis}
            getRiskColor={getRiskColor}
          />
        )}

      </div>
    );
  }
  /* ==============================
     CALLS PAGE
  ============================== */

  function CallsPage() {
    return (
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            All Calls
          </h1>

          <p className="text-gray-400 mt-2">
            View and manage analyzed calls
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          {calls.length === 0 ? (
            <div className="text-center py-12">

              <p className="text-gray-400">
                No calls available.
              </p>

              <button
                onClick={() => navigate("upload")}
                className="mt-5 bg-blue-600 px-5 py-3 rounded-xl text-white"
              >
                Upload a Call
              </button>

            </div>
          ) : (
            <CallsTable calls={calls} />
          )}

        </div>

      </div>
    );
  }

  /* ==============================
     CALLS TABLE COMPONENT
  ============================== */

  function CallsTable({
    calls,
  }: {
    calls: CallResult[];
  }) {
    return (
      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b border-gray-800">

              <th className="p-4 text-gray-400">
                Call ID
              </th>

              <th className="p-4 text-gray-400">
                Agent
              </th>

              <th className="p-4 text-gray-400">
                Customer
              </th>

              <th className="p-4 text-gray-400">
                Score
              </th>

              <th className="p-4 text-gray-400">
                Risk
              </th>

              <th className="p-4 text-gray-400">
                Sentiment
              </th>

              <th className="p-4 text-gray-400">
                Date
              </th>

            </tr>
          </thead>

          <tbody>

            {calls.map((call) => (
              <tr
                key={call.id}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >

                <td className="p-4 text-blue-400">
                  {call.id}
                </td>

                <td className="p-4 text-white">
                  {call.agent}
                </td>

                <td className="p-4 text-gray-300">
                  {call.customer}
                </td>

                <td className="p-4">

                  <span className="text-green-400 font-semibold">
                    {call.complianceScore}%
                  </span>

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getRiskColor(
                      call.riskLevel
                    )}`}
                  >
                    {call.riskLevel}
                  </span>

                </td>

                <td className="p-4 text-gray-300">
                  {call.sentiment}
                </td>

                <td className="p-4 text-gray-400">
                  {call.date}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    );
  }
  /* ==============================
     VIOLATIONS PAGE
  ============================== */

  function ViolationsPage() {
    const violationCalls = calls.filter(
      (call) => call.violations.length > 0
    );

    return (
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Compliance Violations
          </h1>

          <p className="text-gray-400 mt-2">
            Review detected compliance issues
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          {violationCalls.length === 0 ? (
            <div className="text-center py-12">

              <div className="text-5xl mb-4">
                ✅
              </div>

              <p className="text-white text-lg">
                No violations detected
              </p>

              <p className="text-gray-400 mt-2">
                Analyze calls to see compliance violations here.
              </p>

            </div>
          ) : (
            <div className="space-y-6">

              {violationCalls.map((call) => (
                <div
                  key={call.id}
                  className="border border-gray-800 rounded-xl p-5"
                >

                  <div className="flex flex-wrap justify-between gap-4">

                    <div>
                      <h3 className="text-white font-semibold">
                        {call.id}
                      </h3>

                      <p className="text-gray-400 text-sm mt-1">
                        Agent: {call.agent}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm h-fit ${getRiskColor(
                        call.riskLevel
                      )}`}
                    >
                      {call.riskLevel} Risk
                    </span>

                  </div>

                  <div className="mt-5">

                    <h4 className="text-red-400 font-medium mb-3">
                      Detected Violations
                    </h4>

                    <ul className="space-y-2">

                      {call.violations.map(
                        (violation, index) => (
                          <li
                            key={index}
                            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-300"
                          >
                            • {violation}
                          </li>
                        )
                      )}

                    </ul>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    );
  }

  /* ==============================
     RISK ANALYTICS
  ============================== */

  function RiskAnalytics() {
    const lowRisk = calls.filter(
      (call) => call.riskLevel.toLowerCase() === "low"
    ).length;

    const mediumRisk = calls.filter(
      (call) => call.riskLevel.toLowerCase() === "medium"
    ).length;

    const highRisk = calls.filter(
      (call) => call.riskLevel.toLowerCase() === "high"
    ).length;

    return (
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Risk Analytics
          </h1>

          <p className="text-gray-400 mt-2">
            Analyze call risk distribution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gray-900 border border-green-500/20 rounded-2xl p-6">

            <p className="text-gray-400">
              Low Risk Calls
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              {lowRisk}
            </h2>

          </div>

          <div className="bg-gray-900 border border-yellow-500/20 rounded-2xl p-6">

            <p className="text-gray-400">
              Medium Risk Calls
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-3">
              {mediumRisk}
            </h2>

          </div>

          <div className="bg-gray-900 border border-red-500/20 rounded-2xl p-6">

            <p className="text-gray-400">
              High Risk Calls
            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">
              {highRisk}
            </h2>

          </div>

        </div>

        {/* RISK DISTRIBUTION */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <h2 className="text-xl font-bold text-white mb-6">
            Risk Distribution
          </h2>

          {calls.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              No data available yet.
            </p>
          ) : (
            <div className="space-y-6">

              {/* LOW */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-green-400">
                    Low Risk
                  </span>

                  <span className="text-white">
                    {lowRisk}
                  </span>

                </div>

                <div className="w-full bg-gray-800 rounded-full h-3">

                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${
                        (lowRisk / calls.length) * 100
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* MEDIUM */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-yellow-400">
                    Medium Risk
                  </span>

                  <span className="text-white">
                    {mediumRisk}
                  </span>

                </div>

                <div className="w-full bg-gray-800 rounded-full h-3">

                  <div
                    className="bg-yellow-500 h-3 rounded-full"
                    style={{
                      width: `${
                        (mediumRisk / calls.length) * 100
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* HIGH */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-red-400">
                    High Risk
                  </span>

                  <span className="text-white">
                    {highRisk}
                  </span>

                </div>

                <div className="w-full bg-gray-800 rounded-full h-3">

                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{
                      width: `${
                        (highRisk / calls.length) * 100
                      }%`,
                    }}
                  />

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    );
  }
  /* ==============================
     AUDIT REPORTS
  ============================== */

  function AuditReports() {
    return (
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Audit Reports
          </h1>

          <p className="text-gray-400 mt-2">
            Compliance analysis reports
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold text-white">
              Call Audit Summary
            </h2>

            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Print Report
            </button>

          </div>

          {calls.length === 0 ? (
            <div className="text-center py-12">

              <p className="text-gray-400">
                No reports available.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-gray-800">

                    <th className="p-4 text-gray-400">
                      Call ID
                    </th>

                    <th className="p-4 text-gray-400">
                      Agent
                    </th>

                    <th className="p-4 text-gray-400">
                      Compliance
                    </th>

                    <th className="p-4 text-gray-400">
                      Risk
                    </th>

                    <th className="p-4 text-gray-400">
                      Violations
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {calls.map((call) => (
                    <tr
                      key={call.id}
                      className="border-b border-gray-800"
                    >

                      <td className="p-4 text-blue-400">
                        {call.id}
                      </td>

                      <td className="p-4 text-white">
                        {call.agent}
                      </td>

                      <td className="p-4 text-green-400">
                        {call.complianceScore}%
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getRiskColor(
                            call.riskLevel
                          )}`}
                        >
                          {call.riskLevel}
                        </span>

                      </td>

                      <td className="p-4 text-gray-300">
                        {call.violations.length}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    );
  }

  /* ==============================
     ANALYSIS RESULT
  ============================== */

  function AnalysisResult({
    analysis,
    getRiskColor,
  }: {
    analysis: CallResult;
    getRiskColor: (risk: string) => string;
  }) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-8">

        {/* HEADER */}

        <div>

          <h2 className="text-2xl font-bold text-green-400">
            Analysis Complete ✓
          </h2>

          <p className="text-gray-400 mt-2">
            AI compliance analysis completed successfully
          </p>

        </div>

        {/* SCORE */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gray-800 rounded-xl p-5">

            <p className="text-gray-400">
              Compliance Score
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              {analysis.complianceScore}%
            </h2>

          </div>

          <div className="bg-gray-800 rounded-xl p-5">

            <p className="text-gray-400">
              Risk Level
            </p>

            <h2
              className={`text-3xl font-bold mt-3 ${getRiskColor(
                analysis.riskLevel
              )}`}
            >
              {analysis.riskLevel}
            </h2>

          </div>

          <div className="bg-gray-800 rounded-xl p-5">

            <p className="text-gray-400">
              Customer Sentiment
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-3">
              {analysis.sentiment}
            </h2>

          </div>

        </div>

        {/* SUMMARY */}

        <div>

          <h3 className="text-xl font-bold text-white mb-4">
            AI Summary
          </h3>

          <div className="bg-gray-800 rounded-xl p-5">

            <p className="text-gray-300 leading-7">
              {analysis.summary}
            </p>

          </div>

        </div>

        {/* VIOLATIONS */}

        <div>

          <h3 className="text-xl font-bold text-white mb-4">
            Compliance Violations
          </h3>

          {analysis.violations.length === 0 ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">

              <p className="text-green-400">
                ✓ No compliance violations detected.
              </p>

            </div>
          ) : (
            <div className="space-y-3">

              {analysis.violations.map(
                (violation, index) => (
                  <div
                    key={index}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
                  >

                    <p className="text-red-300">
                      {index + 1}. {violation}
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* TRANSCRIPT */}

        <div>

          <h3 className="text-xl font-bold text-white mb-4">
            Call Transcript
          </h3>

          <div className="bg-gray-800 rounded-xl p-5">

            {analysis.transcript ? (
              <p className="text-gray-300 whitespace-pre-wrap leading-7">
                {analysis.transcript}
              </p>
            ) : (
              <p className="text-gray-500">
                Transcript unavailable.
              </p>
            )}

          </div>

        </div>

        {/* DETAILS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-gray-800 p-4 rounded-xl">

            <p className="text-gray-400 text-sm">
              Agent
            </p>

            <p className="text-white mt-2">
              {analysis.agent}
            </p>

          </div>

          <div className="bg-gray-800 p-4 rounded-xl">

            <p className="text-gray-400 text-sm">
              Customer
            </p>

            <p className="text-white mt-2">
              {analysis.customer}
            </p>

          </div>

          <div className="bg-gray-800 p-4 rounded-xl">

            <p className="text-gray-400 text-sm">
              File
            </p>

            <p className="text-white mt-2 break-all">
              {analysis.file}
            </p>

          </div>

          <div className="bg-gray-800 p-4 rounded-xl">

            <p className="text-gray-400 text-sm">
              Analysis Date
            </p>

            <p className="text-white mt-2">
              {analysis.date}
            </p>

          </div>

        </div>

      </div>
    );
  }
  /* ==============================
     MAIN CONTENT
  ============================== */

  function renderContent() {
    switch (activeTab) {

      case "dashboard":
        return <Dashboard />;

      case "upload":
        return <UploadCall />;

      case "calls":
        return <CallsPage />;

      case "violations":
        return <ViolationsPage />;

      case "analytics":
        return <RiskAnalytics />;

      case "reports":
        return <AuditReports />;

      default:
        return <Dashboard />;
    }
  }

  /* ==============================
     MAIN UI
  ============================== */

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <div className="flex min-h-screen">

        {/* SIDEBAR */}

        <aside className="w-64 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col">

          {/* LOGO */}

          <div className="p-6 border-b border-gray-800">

            <h1 className="text-2xl font-bold text-blue-400">
              ComplyAI
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Call Intelligence
            </p>

          </div>

          {/* NAVIGATION */}

          <nav className="p-4 space-y-2 flex-1">

            <button
              onClick={() => navigate("dashboard")}
              className={`w-full text-left px-4 py-3 rounded-xl ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              📊 Dashboard
            </button>

            <button
              onClick={() => navigate("upload")}
              className={`w-full text-left px-4 py-3 rounded-xl ${
                activeTab === "upload"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              🎧 Upload Call
            </button>

            <button
              onClick={() => navigate("calls")}
              className={`w-full text-left px-4 py-3 rounded-xl ${
                activeTab === "calls"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              📞 Recent Calls
            </button>

            <button
              onClick={() => navigate("violations")}
              className={`w-full text-left px-4 py-3 rounded-xl ${
                activeTab === "violations"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              ⚠️ Violations
            </button>

            <button
              onClick={() => navigate("analytics")}
              className={`w-full text-left px-4 py-3 rounded-xl ${
                activeTab === "analytics"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              📈 Risk Analytics
            </button>

            <button
              onClick={() => navigate("reports")}
              className={`w-full text-left px-4 py-3 rounded-xl ${
                activeTab === "reports"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              📋 Audit Reports
            </button>

          </nav>

          {/* FOOTER */}

          <div className="p-4 border-t border-gray-800">

            <p className="text-gray-500 text-sm">
              AI Powered Compliance
            </p>

            <p className="text-blue-400 text-xs mt-1">
              ComplyAI © 2026
            </p>

          </div>

        </aside>

        {/* MAIN CONTENT AREA */}

        <main className="flex-1 min-w-0">

          {/* TOP BAR */}

          <header className="bg-gray-900 border-b border-gray-800 px-6 py-5">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold text-white">
                  ComplyAI
                </h2>

                <p className="text-gray-400 text-sm">
                  AI Compliance Monitoring System
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                  AI
                </div>

              </div>

            </div>

          </header>

          {/* MOBILE NAVIGATION */}

          <div className="md:hidden bg-gray-900 border-b border-gray-800 p-3">

            <div className="flex gap-2 overflow-x-auto">

              <button
                onClick={() => navigate("dashboard")}
                className="bg-gray-800 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Dashboard
              </button>

              <button
                onClick={() => navigate("upload")}
                className="bg-gray-800 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Upload
              </button>

              <button
                onClick={() => navigate("calls")}
                className="bg-gray-800 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Calls
              </button>

              <button
                onClick={() => navigate("violations")}
                className="bg-gray-800 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Violations
              </button>

              <button
                onClick={() => navigate("analytics")}
                className="bg-gray-800 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Analytics
              </button>

              <button
                onClick={() => navigate("reports")}
                className="bg-gray-800 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Reports
              </button>

            </div>

          </div>

          {/* PAGE CONTENT */}

          <div className="p-6 md:p-8">

            {renderContent()}

          </div>

        </main>

      </div>

    </div>
  );
}