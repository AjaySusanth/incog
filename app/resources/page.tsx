import Link from "next/link";

export default function resources() {
  const resources = [
    {
      title: "Understanding Your Rights",
      description: "Know your legal rights when reporting incidents anonymously.",
      link: "/rights",
    },
    {
      title: "How to Submit a Report",
      description: "Step-by-step guide to filing a secure and anonymous report.",
      link: "/submit-report",
    },
    {
      title: "Safety and Security Tips",
      description: "Best practices to stay safe when reporting sensitive information.",
      link: "/safety-tips",
    },
    {
      title: "FAQs",
      description: "Common questions and answers about the reporting process.",
      link: "/faq",
    },
    {
      title: "Support & Helplines",
      description: "Contact details for crisis support and legal aid organizations.",
      link: "/support",
    },
  ];

  return (
    <main className="relative px-6 pt-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-white text-center">Resources</h1>
        <p className="mt-4 text-center text-zinc-400">
          Find useful information to guide you through the reporting process and ensure your safety.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {resources.map((resource, index) => (
            <Link key={index} href={resource.link}>
              <div className="cursor-pointer group rounded-2xl bg-zinc-900 p-6 transition-all hover:bg-zinc-800">
                <h3 className="text-lg font-medium text-white group-hover:text-sky-400">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{resource.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
