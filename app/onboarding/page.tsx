"use client";

import { useState } from "react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    contactName: "",
    email: "",
    teamName: "",
    agentCount: "",
    complianceType: "",
    auditFrequency: "",
    callFile: "",
  });

 const updateField = (
  field: keyof typeof formData,
  value: string
) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};
   
const nextStep = () => {
  setStep((currentStep) => Math.min(currentStep + 1, 4));
};

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  const steps = [
    "Company",
    "Team",
    "Compliance",
    "Review",
  ];

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">

      {/* NAVBAR */}

      <nav className="flex items-center justify-between border-b border-gray-800 px-6 py-5 md:px-12">

        <h1 className="text-2xl font-bold">
          <span className="text-blue-500">Comply</span>AI
        </h1>

        <a
          href="/"
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          ← Dashboard
        </a>

      </nav>

      <div className="mx-auto max-w-5xl px-6 py-12">

        {!completed ? (

          <>

            {/* HEADER */}

            <div className="mb-10">

              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
                Customer Onboarding
              </p>

              <h1 className="text-3xl font-bold md:text-4xl">
                Welcome to ComplyAI
              </h1>

              <p className="mt-3 text-gray-400">
                Let's configure your call intelligence workspace.
                Complete these steps to get started.
              </p>

            </div>

            {/* PROGRESS */}

            <div className="mb-10">

              <div className="mb-4 flex justify-between text-sm text-gray-400">

                <span>
                  Step {step} of 4
                </span>

                <span>
                  {Math.round((step / 4) * 100)}% Complete
                </span>

              </div>

              <div className="h-2 w-full rounded-full bg-gray-800">

                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${(step / 4) * 100}%`,
                  }}
                />

              </div>

              <div className="mt-5 grid grid-cols-4 gap-2">

                {steps.map((item, index) => (

                  <div
                    key={item}
                    className={`text-center text-sm ${
                      step >= index + 1
                        ? "text-blue-400"
                        : "text-gray-500"
                    }`}
                  >

                    <div
                      className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= index + 1
                          ? "bg-blue-600"
                          : "bg-gray-800"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {item}

                  </div>

                ))}

              </div>

            </div>

            {/* MAIN CARD */}

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 md:p-10">

              {/* STEP 1 */}

              {step === 1 && (

                <div>

                  <div className="mb-8">

                    <h2 className="text-2xl font-bold">
                      Company Information
                    </h2>

                    <p className="mt-2 text-gray-400">
                      Tell us about your organization.
                    </p>

                  </div>

                  <div className="space-y-6">

                    {/* COMPANY NAME */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Company Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={(e) =>
                          updateField("companyName", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    {/* INDUSTRY */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Industry
                      </label>

                      <select
                        value={formData.industry}
                        onChange={(e) =>
                          updateField("industry", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      >

                        <option value="">
                          Select Industry
                        </option>

                        <option value="Banking">
                          Banking & Finance
                        </option>

                        <option value="Insurance">
                          Insurance
                        </option>

                        <option value="Healthcare">
                          Healthcare
                        </option>

                        <option value="Telecom">
                          Telecom
                        </option>

                        <option value="Retail">
                          Retail
                        </option>

                        <option value="Customer Support">
                          Customer Support
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                    </div>

                    {/* COMPANY SIZE */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Company Size
                      </label>

                      <select
                        value={formData.companySize}
                        onChange={(e) =>
                          updateField("companySize", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      >

                        <option value="">
                          Select Company Size
                        </option>

                        <option value="1-10">
                          1–10 Employees
                        </option>

                        <option value="11-50">
                          11–50 Employees
                        </option>

                        <option value="51-200">
                          51–200 Employees
                        </option>

                        <option value="201-500">
                          201–500 Employees
                        </option>

                        <option value="500+">
                          500+ Employees
                        </option>

                      </select>

                    </div>

                    {/* CONTACT NAME */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Primary Contact Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter contact name"
                        value={formData.contactName}
                        onChange={(e) =>
                          updateField("contactName", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    {/* EMAIL */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Business Email
                      </label>

                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          updateField("email", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>

                </div>

              )}

              {/* STEP 2 */}

              {step === 2 && (

                <div>

                  <div className="mb-8">

                    <h2 className="text-2xl font-bold">
                      Team Configuration
                    </h2>

                    <p className="mt-2 text-gray-400">
                      Configure the team whose calls will be analyzed.
                    </p>

                  </div>

                  <div className="space-y-6">

                    {/* TEAM NAME */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Team Name
                      </label>

                      <input
                        type="text"
                        placeholder="e.g. Customer Support Team"
                        value={formData.teamName}
                        onChange={(e) =>
                          updateField("teamName", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    {/* AGENT COUNT */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Number of Agents
                      </label>

                      <select
                        value={formData.agentCount}
                        onChange={(e) =>
                          updateField("agentCount", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      >

                        <option value="">
                          Select Number of Agents
                        </option>

                        <option value="1-10">
                          1–10 Agents
                        </option>

                        <option value="11-25">
                          11–25 Agents
                        </option>

                        <option value="26-50">
                          26–50 Agents
                        </option>

                        <option value="51-100">
                          51–100 Agents
                        </option>

                        <option value="100+">
                          100+ Agents
                        </option>

                      </select>

                    </div>

                    {/* TEAM INFORMATION */}

                    <div className="rounded-xl border border-blue-900 bg-blue-950/30 p-5">

                      <h3 className="font-semibold text-blue-400">
                        Team Setup
                      </h3>

                      <p className="mt-2 text-sm text-gray-400">
                        Your team configuration helps ComplyAI organize
                        call audits, agent performance, and compliance
                        reports.
                      </p>

                    </div>

                  </div>

                </div>

              )}

              {/* STEP 3 */}

              {step === 3 && (

                <div>

                  <div className="mb-8">

                    <h2 className="text-2xl font-bold">
                      Compliance Configuration
                    </h2>

                    <p className="mt-2 text-gray-400">
                      Customize your call audit requirements.
                    </p>

                  </div>

                  <div className="space-y-6">

                    {/* COMPLIANCE FRAMEWORK */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Compliance Framework
                      </label>

                      <select
                        value={formData.complianceType}
                        onChange={(e) =>
                          updateField("complianceType", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      >

                        <option value="">
                          Select Compliance Framework
                        </option>

                        <option value="Internal Policies">
                          Internal Company Policies
                        </option>

                        <option value="Financial">
                          Financial Compliance
                        </option>

                        <option value="Healthcare">
                          Healthcare Compliance
                        </option>

                        <option value="Telecom">
                          Telecom Compliance
                        </option>

                        <option value="Customer Service">
                          Customer Service Standards
                        </option>

                        <option value="Custom">
                          Custom Compliance Rules
                        </option>

                      </select>

                    </div>

                    {/* AUDIT FREQUENCY */}

                    <div>

                      <label className="mb-2 block text-sm text-gray-300">
                        Audit Frequency
                      </label>

                      <select
                        value={formData.auditFrequency}
                        onChange={(e) =>
                          updateField("auditFrequency", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                      >

                        <option value="">
                          Select Audit Frequency
                        </option>

                        <option value="Daily">
                          Daily
                        </option>

                        <option value="Weekly">
                          Weekly
                        </option>

                        <option value="Monthly">
                          Monthly
                        </option>

                        <option value="On Demand">
                          On Demand
                        </option>

                      </select>

                    </div>

                    {/* AI AUDITING INFO */}

                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

                      <h3 className="font-semibold">
                        AI-Powered Call Auditing
                      </h3>

                      <p className="mt-2 text-sm text-gray-400">
                        ComplyAI analyzes calls against your selected
                        compliance requirements and identifies potential
                        violations, risks, and performance insights.
                      </p>

                    </div>

                  </div>

                </div>

              )}

              {/* STEP 4 */}

              {step === 4 && (

                <div>

                  <div className="mb-8">

                    <h2 className="text-2xl font-bold">
                      Review Your Setup
                    </h2>

                    <p className="mt-2 text-gray-400">
                      Verify your information before completing onboarding.
                    </p>

                  </div>

                  <div className="space-y-4">

                    {[
                      ["Company Name", formData.companyName],
                      ["Industry", formData.industry],
                      ["Company Size", formData.companySize],
                      ["Contact Person", formData.contactName],
                      ["Email", formData.email],
                      ["Team Name", formData.teamName],
                      ["Number of Agents", formData.agentCount],
                      ["Compliance Framework", formData.complianceType],
                      ["Audit Frequency", formData.auditFrequency],
                    ].map(([label, value]) => (

                      <div
                        key={label}
                        className="flex flex-col gap-1 rounded-xl border border-gray-800 bg-gray-950 p-4 md:flex-row md:justify-between"
                      >

                        <span className="text-gray-400">
                          {label}
                        </span>

                        <span className="font-medium text-white">
                          {value || "Not provided"}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              )}
              {/* NAVIGATION BUTTONS */}

              <div className="mt-10 flex items-center justify-between border-t border-gray-800 pt-6">

                {step > 1 ? (

                  <button
                    onClick={previousStep}
                    className="rounded-xl border border-gray-700 px-6 py-3 text-gray-300 hover:bg-gray-800"
                  >
                    ← Back
                  </button>

                ) : (

                  <div />

                )}

                {step < 4 ? (

                  <button
                    onClick={nextStep}
                    className="rounded-xl bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
                  >
                    Continue →
                  </button>

                ) : (

                  <button
                    onClick={handleComplete}
                    className="rounded-xl bg-green-600 px-8 py-3 font-semibold hover:bg-green-700"
                  >
                    Complete Setup ✓
                  </button>

                )}

              </div>

            </div>

            {/* FOOTER */}

            <p className="mt-8 text-center text-sm text-gray-500">
              Secure onboarding powered by ComplyAI
            </p>

          </>

        ) : (

          /* COMPLETION SCREEN */

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">

            <div className="mb-6 text-6xl">
              🎉
            </div>

            <h1 className="text-3xl font-bold">
              Onboarding Completed!
            </h1>

            <p className="mt-4 text-gray-400">
              Your ComplyAI workspace has been configured successfully.
            </p>

            {/* WORKSPACE SUMMARY */}

            <div className="mx-auto mt-8 max-w-xl rounded-xl border border-gray-800 bg-gray-950 p-6 text-left">

              <h3 className="mb-4 text-lg font-semibold">
                Workspace Summary
              </h3>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Company:</span>{" "}
                {formData.companyName}
              </p>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Industry:</span>{" "}
                {formData.industry}
              </p>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Company Size:</span>{" "}
                {formData.companySize}
              </p>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Contact Person:</span>{" "}
                {formData.contactName}
              </p>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Email:</span>{" "}
                {formData.email}
              </p>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Team:</span>{" "}
                {formData.teamName}
              </p>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Agents:</span>{" "}
                {formData.agentCount}
              </p>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Compliance:</span>{" "}
                {formData.complianceType}
              </p>

              <p className="mb-2 text-gray-300">
                <span className="text-gray-500">Audit Frequency:</span>{" "}
                {formData.auditFrequency}
              </p>

            </div>

            {/* DASHBOARD BUTTON */}

            <button
              onClick={() => window.location.href = "/dashboard"}
              className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Go to Dashboard →
            </button>

          </div>

        )}

      </div>

    </main>
  );
}