import Link from "next/link";

export default function Home() {
  const featuresData = [
    {
      title: "Anonymous Reporting",
      description:
        "Users can report incidents such as ragging, harassment, or drug abuse without revealing their identity. Complaints can include text descriptions, photos, videos, or audio as supporting evidence.",
      icon: (
        <svg
          className="h-6 w-6 text-sky-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Auto-Alert System",
      description: "College authorities receive anonymized reports, while law enforcement gets detailed information if the informer consents. Email and SMS notifications ensure that all parties stay informed, with a unique case ID for tracking.",
      
      icon: (
        <svg
          className="h-6 w-6 text-sky-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Secure Communication",
      description: "Hugging Face models analyze reports to categorize them by type and severity. Urgent cases, such as those mentioning violence or suicide, are flagged for immediate intervention.",
      icon: (
        <svg
          className="h-6 w-6 text-sky-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      title: "Time-Bound Escalation",
      description: "If no action is taken within 48 hours, cases escalate to higher authorities, such as anti-ragging cells or law enforcement. Escalation ensures accountability and prevents institutions from ignoring serious complaints.",
      icon: (
<svg
  className="h-6 w-6 text-blue-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 8v4l3 3m6-3a9 9 0 11-9-9"
  />
  <circle cx="12" cy="12" r="9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>

      ),
    },
    {
      title: "Basic Dashboard",
      description: "A public dashboard tracks the number of resolved and pending cases for each institution. Users can view safety ratings, filter data by district or institution type, and check student reviews to assess campus safety",
      icon: (
        <svg
  className="h-6 w-6 text-blue-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>

      ),
    },
  ];



  return (
    <main className="relative px-6 pt-32">
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
            Report Incident.
            <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Protect Identity.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Make your community safer without compromising your safety. Our
            advanced encryption ensures your identity remains completely
            anonymous.
          </p>

          <div className="mt-10 flex flex-col items-center sm:flex-row gap-4">
            <Link href={"/submit-report"}>
              <button className="group relative flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-sm font-medium text-white transition-all hover:bg-sky-400">
                Make Anonymous Report
              </button>
            </Link>
            <Link href={"/register"}>
              <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/5 px-8 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-28 grid gap-6 sm:grid-cols-3">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-xl bg-sky-500/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
     

        {/* College Complaint Statistics Section */}
        <div className="mt-28 rounded-2xl bg-zinc-900 p-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            College Complaint Statistics
          </h2>
          <p className="mt-3 text-lg text-zinc-400">
            View reports and complaint rates from registered colleges.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href={"/college-rating"}>
              <button className="group relative flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-sm font-medium text-white transition-all hover:bg-sky-400">
                View Complaint Rates
              </button>
            </Link>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-28 pb-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-5 py-2 text-sm text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Trusted by Law Enforcement Nationwide
          </div>
        </div>
      </div>
    </main>
  );
}
