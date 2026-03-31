import { useState } from "react";
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import {
  CONTACT_AVAILABILITY_DELAY,
  CONTACT_COPY_DELAY,
  CONTACT_FORM_DELAY,
  CONTACT_HEADING_DELAY,
  CONTACT_SOCIAL_BASE_DELAY,
  CONTACT_SOCIAL_STEP,
  getLinearRevealDelay,
  toRevealDelayStyle,
} from "../../constants/motion";

const CONTACT_EMAIL = "shreyashukla11c@gmail.com";
const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT || "").trim();

function createMailtoHref(formData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subject = encodeURIComponent(`Portfolio inquiry from ${name || "Website visitor"}`);
  const body = encodeURIComponent(
    `Hi Shreya,\n\nName: ${name || "Not provided"}\nEmail: ${email || "Not provided"}\n\nMessage:\n${message || "Not provided"}\n`
  );

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  const isFormspreeConfigured = Boolean(FORMSPREE_ENDPOINT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const fallbackDraft = createMailtoHref(data);

    if (!isFormspreeConfigured) {
      setFallbackHref(fallbackDraft);
      setStatus("unconfigured");
      return;
    }

    if (String(data.get("website") || "").trim()) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");
    setFallbackHref("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setFallbackHref(fallbackDraft);
        setStatus("fallback");
      }
    } catch {
      setFallbackHref(fallbackDraft);
      setStatus("fallback");
    }
  };

  const socials = [
    {
      platform: "Email",
      handle: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      icon: <FaEnvelope size={16} />,
    },
    {
      platform: "GitHub",
      handle: "Shreya-Shukla27",
      href: "https://github.com/Shreya-Shukla27",
      icon: <FaGithub size={16} />,
    },
    {
      platform: "LinkedIn",
      handle: "shreya-shukla27",
      href: "https://www.linkedin.com/in/shreya-shukla27/",
      icon: <FaLinkedinIn size={16} />,
    },
    {
      platform: "Instagram",
      handle: "@shreyaaaaa2707",
      href: "https://instagram.com/shreyaaaaa2707",
      icon: <FaInstagram size={16} />,
    },
  ];

  return (
    <section
      id="contact"
      className="border-t border-solid border-[var(--border)] max-w-[1200px] mx-auto py-[120px] px-[52px] relative overflow-hidden max-[960px]:py-[80px] max-[960px]:px-[24px]"
    >
      <div
        className="absolute w-[460px] h-[460px] -right-[180px] -top-[120px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,102,245,0.15), transparent 68%)" }}
      />
      <div
        className="absolute w-[360px] h-[360px] -left-[160px] bottom-[0px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,102,184,0.12), transparent 68%)" }}
      />

      {/* Section Label */}
      <div className="flex items-center gap-[12px] text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--muted)] mb-[52px] relative z-[2] reveal after:content-[''] after:flex-1 after:max-w-[56px] after:h-[1px] after:bg-[var(--border-h)]">
        <span className="text-[var(--accent)]">07 —</span> Contact
      </div>

      <div className="grid grid-cols-2 gap-[48px] items-start relative z-[2] max-[960px]:grid-cols-1 max-[960px]:gap-[32px]">

        {/* LEFT */}
        <div>
          <h2
            className="font-['Instrument_Serif',Georgia,serif] text-[clamp(38px,5vw,64px)] leading-[0.97] tracking-[-0.02em] mb-[16px] text-[var(--text-h)] reveal"
            style={toRevealDelayStyle(CONTACT_HEADING_DELAY)}
          >
            <span className="bg-[linear-gradient(92deg,#f3e9ff,#f58ac8)] bg-clip-text text-transparent">Let's</span>{" "}
            <span className="bg-[linear-gradient(92deg,#f3e9ff,#d966f5)] bg-clip-text text-transparent">build</span>{" "}
            <span className="bg-[linear-gradient(92deg,#f3e9ff,#f58ac8)] bg-clip-text text-transparent">something</span>{" "}
            <em className="italic bg-[var(--grad)] bg-clip-text text-transparent">great</em>
          </h2>

          <p
            className="text-[15px] leading-[1.7] text-[var(--muted)] mb-[24px] max-w-[480px] reveal"
            style={toRevealDelayStyle(CONTACT_COPY_DELAY)}
          >
            Open to full-time roles, research collaborations, and high-impact AI product work.
            Share your idea and I will reply within 24 hours.
          </p>

          <div
            className="inline-flex items-center gap-[9px] rounded-full border border-[rgba(34,197,94,0.22)] bg-[rgba(34,197,94,0.08)] px-[14px] py-[7px] text-[12px] text-[var(--text)] mb-[20px] reveal"
            style={toRevealDelayStyle(CONTACT_AVAILABILITY_DELAY)}
          >
            <span className="w-[8px] h-[8px] rounded-full bg-[#22c55e] shadow-[0_0_0_4px_rgba(34,197,94,0.18)]" />
            Available for projects
          </div>

          {/* SOCIAL LINKS */}
          <div className="grid gap-[10px]">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-[14px] border border-[rgba(217,102,245,0.15)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[10px] py-[14px] px-[14px] text-[var(--text)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[rgba(217,102,245,0.35)] hover:bg-[rgba(217,102,245,0.06)] reveal"
                style={toRevealDelayStyle(
                  getLinearRevealDelay(i, CONTACT_SOCIAL_BASE_DELAY, CONTACT_SOCIAL_STEP)
                )}
              >
                <div className="flex items-center gap-[14px]">
                  <span className="w-[34px] h-[34px] rounded-[10px] border border-[rgba(217,102,245,0.2)] bg-[rgba(217,102,245,0.08)] text-[var(--accent)] grid place-items-center transition-transform duration-200 group-hover:scale-105">
                    {s.icon}
                  </span>

                  <div>
                    <div className="text-[11px] font-bold tracking-[0.09em] uppercase text-[var(--text)] group-hover:text-[var(--accent)]">
                      {s.platform}
                    </div>
                    <div className="text-[13px] text-[var(--muted)]">{s.handle}</div>
                  </div>
                </div>

                <span className="text-[12px] text-[var(--muted)] group-hover:text-[var(--accent)]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT (FORM) */}
        <div className="reveal" style={toRevealDelayStyle(CONTACT_FORM_DELAY)}>
          <div className="rounded-[22px] p-[1px] bg-[linear-gradient(135deg,rgba(217,102,245,0.65),rgba(245,102,184,0.45),rgba(217,102,245,0.25))] shadow-[0_18px_46px_rgba(217,102,245,0.18)]">
            <div className="rounded-[21px] border border-[rgba(217,102,245,0.16)] bg-[rgba(19,14,30,0.82)] backdrop-blur-[22px] p-[22px] max-[960px]:p-[18px]">
              <div className="mb-[16px]">
                <div className="text-[14px] font-semibold text-[var(--text)]">Project Inquiry Form</div>
                <div className="text-[12px] text-[var(--muted)] mt-[4px]">
                  This form is powered by Formspree. All fields are required.
                </div>
              </div>

              {!isFormspreeConfigured && (
                <div className="mb-[14px] rounded-[12px] border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.12)] px-[12px] py-[10px] text-[13px] text-[#f8d089]">
                  Missing Formspree setup: add VITE_FORMSPREE_ENDPOINT in .env.local and restart the dev server.
                </div>
              )}

              {status === "sent" && (
                <div className="mb-[14px] rounded-[12px] border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.1)] px-[12px] py-[10px] text-[13px] text-[#7ee2a5]">
                  Message sent successfully. Thank you.
                </div>
              )}

              {status === "unconfigured" && (
                <div className="mb-[14px] rounded-[12px] border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.12)] px-[12px] py-[10px] text-[13px] text-[#f8d089]">
                  Formspree endpoint is not configured yet. Add VITE_FORMSPREE_ENDPOINT in .env.local.
                </div>
              )}

              {status === "fallback" && (
                <div className="mb-[14px] rounded-[12px] border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.12)] px-[12px] py-[10px] text-[13px] text-[#f8d089]">
                  Form submit failed right now. Use the email draft fallback below.
                </div>
              )}

              <form
                method="POST"
                action={isFormspreeConfigured ? FORMSPREE_ENDPOINT : undefined}
                onSubmit={handleSubmit}
                className="flex flex-col gap-[14px]"
              >
                <input type="hidden" name="_subject" value="New Portfolio Inquiry" />

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex="-1"
                  />
                </div>

                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="contact-name" className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--muted)]">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="form-input w-full rounded-[11px] px-[14px] py-[12px] text-[14px] text-[var(--text)] placeholder:text-[rgba(138,122,160,0.65)] outline-none transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="contact-email" className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--muted)]">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="form-input w-full rounded-[11px] px-[14px] py-[12px] text-[14px] text-[var(--text)] placeholder:text-[rgba(138,122,160,0.65)] outline-none transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="contact-message" className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--muted)]">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, role, or collaboration idea..."
                    required
                    className="form-input w-full rounded-[11px] px-[14px] py-[12px] text-[14px] text-[var(--text)] placeholder:text-[rgba(138,122,160,0.65)] outline-none transition-all duration-200 resize-y min-h-[148px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-[8px] w-full rounded-full border border-[rgba(217,102,245,0.2)] text-[#0d0a14] text-[13px] font-bold tracking-[0.09em] uppercase py-[15px] cursor-none transition-all duration-200 hover:scale-[1.01] hover:brightness-105 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "var(--grad)" }}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>

              {(status === "fallback" || status === "unconfigured") && fallbackHref && (
                <a
                  href={fallbackHref}
                  className="mt-[12px] inline-flex items-center gap-[8px] rounded-full border border-[rgba(217,102,245,0.35)] px-[14px] py-[8px] text-[12px] font-semibold tracking-[0.06em] uppercase text-[var(--accent)] no-underline transition-colors duration-200 hover:bg-[rgba(217,102,245,0.08)]"
                >
                  Open Email Draft ↗
                </a>
              )}

              <p className="text-[12px] text-[var(--muted)] mt-[12px]">
                Prefer direct email?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--accent)] no-underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}