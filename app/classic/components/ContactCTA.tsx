"use client";

import { Calendar, Phone, Mail, MessageCircle } from "lucide-react";

interface ContactCTAProps {
  contact: {
    phone: string;
    email: string;
    calendly?: string;
    whatsapp?: string;
  };
}

export default function ContactCTA({ contact }: ContactCTAProps) {
  return (
    <div className="px-4 pb-8">
      {/* Section Header */}
      <h2 className="text-sm font-semibold text-[var(--g360-accent)] uppercase tracking-wider mb-4 text-center">
        Get in Touch
      </h2>

      {/* Primary CTA - Schedule Call */}
      {contact.calendly && (
        <a
          href={contact.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="g360-button-primary w-full flex items-center justify-center gap-2 mb-4"
        >
          <Calendar size={18} />
          <span>Schedule a Call</span>
        </a>
      )}

      {/* Secondary CTAs */}
      <div className="grid grid-cols-3 gap-3">
        {/* Phone */}
        <a
          href={`tel:${contact.phone.replace(/\D/g, "")}`}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--g360-card)] hover:bg-[var(--g360-card-hover)] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--g360-dark)] flex items-center justify-center group-hover:bg-[var(--g360-accent)] transition-colors">
            <Phone size={18} className="text-[var(--g360-gray)] group-hover:text-[var(--g360-darker)]" />
          </div>
          <span className="text-xs text-[var(--g360-gray-light)]">Call</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${contact.email}`}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--g360-card)] hover:bg-[var(--g360-card-hover)] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--g360-dark)] flex items-center justify-center group-hover:bg-[var(--g360-accent)] transition-colors">
            <Mail size={18} className="text-[var(--g360-gray)] group-hover:text-[var(--g360-darker)]" />
          </div>
          <span className="text-xs text-[var(--g360-gray-light)]">Email</span>
        </a>

        {/* WhatsApp */}
        {contact.whatsapp ? (
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--g360-card)] hover:bg-[var(--g360-card-hover)] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--g360-dark)] flex items-center justify-center group-hover:bg-green-500 transition-colors">
              <MessageCircle size={18} className="text-[var(--g360-gray)] group-hover:text-white" />
            </div>
            <span className="text-xs text-[var(--g360-gray-light)]">WhatsApp</span>
          </a>
        ) : (
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--g360-card)] opacity-50">
            <div className="w-10 h-10 rounded-full bg-[var(--g360-dark)] flex items-center justify-center">
              <MessageCircle size={18} className="text-[var(--g360-gray)]" />
            </div>
            <span className="text-xs text-[var(--g360-gray-light)]">WhatsApp</span>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-8 pt-4 border-t border-[var(--g360-card)] text-center">
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
  );
}
