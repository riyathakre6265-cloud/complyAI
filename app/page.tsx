"use client"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">

      <div className="max-w-6xl w-full">

        {/* NAVBAR */}

        <nav className="flex justify-between items-center py-6">

          <h1 className="text-3xl font-bold text-blue-400">
            ComplyAI
          </h1>

          <a
            href="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Login →
          </a>

        </nav>

        {/* HERO SECTION */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">

          {/* LEFT CONTENT */}

          <div>

            <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
              AI Powered Compliance Platform
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">

              Welcome to

              <span className="text-blue-400 block">
                ComplyAI
              </span>

            </h1>

            <p className="text-gray-400 text-lg mt-6 leading-8">

              Transform your customer conversations with
              AI-powered call intelligence, compliance
              monitoring, and automated risk detection.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4 mt-8">

              <a
                href="/onboarding"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
              >
                Get Started →
              </a>

              <a
                href="/dashboard"
                className="border border-gray-700 hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold transition"
              >
                Explore Dashboard
              </a>

            </div>

          </div>

          {/* RIGHT CONTENT */}

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-8">

              <div>

                <p className="text-gray-400 text-sm">
                  AI Compliance Overview
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  Intelligent Call Monitoring
                </h2>

              </div>

              <div className="bg-blue-500/10 text-blue-400 p-4 rounded-2xl text-3xl">
                🤖
              </div>

            </div>

            {/* FEATURE CARDS */}

            <div className="space-y-4">

              <div className="bg-gray-800 rounded-2xl p-5">

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-gray-400 text-sm">
                      Compliance Score
                    </p>

                    <h3 className="text-3xl font-bold text-green-400 mt-2">
                      94.8%
                    </h3>

                  </div>

                  <div className="text-3xl">
                    📊
                  </div>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-gray-800 rounded-2xl p-5">

                  <p className="text-gray-400 text-sm">
                    Calls Analyzed
                  </p>

                  <h3 className="text-2xl font-bold mt-2">
                    1,248
                  </h3>

                </div>

                <div className="bg-gray-800 rounded-2xl p-5">

                  <p className="text-gray-400 text-sm">
                    AI Insights
                  </p>

                  <h3 className="text-2xl font-bold text-blue-400 mt-2">
                    24/7
                  </h3>

                </div>

              </div>

              <div className="bg-gray-800 rounded-2xl p-5">

                <div className="flex gap-3 items-center">

                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>

                  <p className="text-gray-300">
                    AI Monitoring System Active
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>
        {/* FEATURES */}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              🎧
            </div>

            <h3 className="text-xl font-semibold">
              Call Intelligence
            </h3>

            <p className="text-gray-400 mt-3 leading-7">
              Analyze customer calls using AI and
              automatically generate insights.
            </p>

          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              🛡️
            </div>

            <h3 className="text-xl font-semibold">
              Compliance Monitoring
            </h3>

            <p className="text-gray-400 mt-3 leading-7">
              Identify compliance violations and
              monitor business regulations.
            </p>

          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              📈
            </div>

            <h3 className="text-xl font-semibold">
              Risk Analytics
            </h3>

            <p className="text-gray-400 mt-3 leading-7">
              Understand call risks, customer sentiment,
              and performance through analytics.
            </p>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="border-t border-gray-800 py-6 text-center text-gray-500">

          © 2026 ComplyAI. AI Powered Compliance Intelligence.

        </footer>

      </div>

    </main>
  );
}
