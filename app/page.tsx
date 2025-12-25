import Link from "next/link";
import { ArrowRight } from "lucide-react";

const prototypes = [
  {
    id: "classic",
    name: "Classic",
    description: "Compact header with inline social icons, expandable video introduction",
    href: "/classic",
  },
  {
    id: "prototype-2",
    name: "Prototype 2",
    description: "Duplicate of Classic - ready for independent modifications",
    href: "/prototype-2",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen g360-gradient">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">
            Giraffe360 Link-in-Bio
          </h1>
          <p className="text-[var(--g360-gray)]">
            Prototype showcase for real estate agents
          </p>
        </div>

        {/* Prototype Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {prototypes.map((prototype) => (
            <Link
              key={prototype.id}
              href={prototype.href}
              className="group block p-6 rounded-2xl bg-[var(--g360-card)] hover:bg-[var(--g360-card-hover)] transition-all border border-transparent hover:border-[var(--g360-accent)]/30"
            >
              {/* Preview placeholder */}
              <div className="aspect-[9/16] mb-4 rounded-xl bg-[var(--g360-dark)] flex items-center justify-center overflow-hidden">
                <div className="text-[var(--g360-gray)] text-sm">
                  Preview
                </div>
              </div>

              {/* Info */}
              <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-[var(--g360-accent)] transition-colors">
                {prototype.name}
              </h2>
              <p className="text-[var(--g360-gray)] text-sm mb-4">
                {prototype.description}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center gap-2 text-[var(--g360-accent)] text-sm font-medium">
                View Prototype
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-[var(--g360-gray)] text-xs">
            Powered by{" "}
            <a
              href="https://giraffe360.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--g360-accent)] hover:underline"
            >
              Giraffe360
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
