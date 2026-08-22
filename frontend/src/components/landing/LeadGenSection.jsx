"use client";

import React, { useEffect, useRef, useState } from "react";

const platformOptions = [
  "LinkedIn",
  "Instagram",
  "Facebook",
  "Google Business",
  "None",
];

const LeadGenSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [playbookSubmitted, setPlaybookSubmitted] = useState(false);
  const [playbookEmail, setPlaybookEmail] = useState("");

  const [formData, setFormData] = useState({
    firmName: "",
    partnerCount: "",
    platforms: [],
    email: "",
    name: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlatform = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    // Backend integration point — connect to CRM/email service here
    setAuditSubmitted(true);
  };

  const handlePlaybookSubmit = (e) => {
    e.preventDefault();
    // Backend integration point — connect to email service/PDF delivery here
    setPlaybookSubmitted(true);
  };

  return (
    <section
      id="audit"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 cta-section-bg"
    >
      {/* Sky blue atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(116,185,255,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`reveal-up text-center mb-16 ${inView ? "in-view" : ""}`}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-sky block mb-4">
            Free — No Pitch, No Obligation
          </span>
          <h2
            className="font-display text-ledger-white mb-4 mx-auto"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              maxWidth: "720px",
            }}
          >
            Get your free{" "}
            <span className="italic font-light text-sky sky-text-glow">
              content audit
            </span>
            <br />
            in 24 hours.
          </h2>
          <p className="text-ledger-white/50 text-lg max-w-2xl mx-auto">
            We'll review your firm's LinkedIn, Instagram, and Google Business
            presence and send you a specific, actionable report — what's
            missing, what's hurting you, and exactly what to post first.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Primary: Audit Form */}
          <div
            className={`lg:col-span-3 reveal-up ${inView ? "in-view" : ""} reveal-up-delay-1`}
          >
            <div
              className="glass-panel rounded-2xl p-7 md:p-9"
              style={{ border: "1px solid rgba(116,185,255,0.25)" }}
            >
              {auditSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-sky/15 border border-sky/30 flex items-center justify-center mx-auto mb-5">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="#74B9FF"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3
                    className="font-display text-2xl text-ledger-white mb-3"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Audit request received.
                  </h3>
                  <p className="text-ledger-white/50 text-sm leading-relaxed">
                    We'll review your firm's online presence and send your audit
                    within 24 hours. Check your inbox — including spam, just in
                    case.
                  </p>
                </div>
              ) : (
                <>
                  <h3
                    className="font-display text-xl text-ledger-white mb-1"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Request Your Content Audit
                  </h3>
                  <p className="text-sm text-ledger-white/40 mb-6">
                    Takes 2 minutes. We do the rest.
                  </p>

                  <form onSubmit={handleAuditSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-ledger-white/50 uppercase tracking-[0.15em] block mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Patricia Okonkwo"
                          className="ledger-input"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-ledger-white/50 uppercase tracking-[0.15em] block mb-2">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="patricia@okonkwocpa.com"
                          className="ledger-input"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-ledger-white/50 uppercase tracking-[0.15em] block mb-2">
                        Firm Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Okonkwo & Reed CPA"
                        className="ledger-input"
                        value={formData.firmName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            firmName: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-ledger-white/50 uppercase tracking-[0.15em] block mb-2">
                        Number of Partners
                      </label>
                      <select
                        className="ledger-input"
                        value={formData.partnerCount}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            partnerCount: e.target.value,
                          }))
                        }
                        required
                        style={{ appearance: "none" }}
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="solo">Solo practitioner</option>
                        <option value="2-3">2–3 partners</option>
                        <option value="4-8">4–8 partners</option>
                        <option value="9+">9+ partners</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-ledger-white/50 uppercase tracking-[0.15em] block mb-3">
                        Platforms You Currently Use
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {platformOptions.map((platform) => (
                          <label
                            key={platform}
                            className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              formData.platforms.includes(platform)
                                ? "border-sky/40 bg-sky/10 text-sky"
                                : "border-ledger-white/8 bg-ledger-white/3 text-ledger-white/50 hover:border-ledger-white/15"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="ledger-checkbox"
                              checked={formData.platforms.includes(platform)}
                              onChange={() => togglePlatform(platform)}
                            />
                            <span className="text-xs font-semibold">
                              {platform}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-sky w-full py-4 text-base font-bold rounded-lg mt-2"
                    >
                      Get My Free Content Audit →
                    </button>

                    <p className="text-[11px] text-ledger-white/25 text-center">
                      No sales call required. We send your audit within 24
                      hours.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Secondary: PDF Playbook */}
          <div
            className={`lg:col-span-2 reveal-up ${inView ? "in-view" : ""} reveal-up-delay-2`}
          >
            <div
              className="glass-panel rounded-2xl p-6 md:p-7 h-full flex flex-col"
              style={{ border: "1px solid rgba(250,250,250,0.08)" }}
            >
              {/* PDF visual */}
              <div
                className="rounded-xl p-5 mb-5 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(116,185,255,0.12) 0%, rgba(116,185,255,0.04) 100%)",
                  border: "1px solid rgba(116,185,255,0.15)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-10 rounded bg-sky/20 border border-sky/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="#74B9FF"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-sky uppercase tracking-[0.15em] mb-1">
                      Free PDF Guide
                    </p>
                    <h4 className="text-base font-bold text-ledger-white leading-tight">
                      The CPA's 90-Day Social Playbook
                    </h4>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {[
                    "The 6 post types that generate CPA leads",
                    "A 12-week content calendar template",
                    "Word-for-word LinkedIn post formulas",
                    "Google Business review response scripts",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-ledger-white/60"
                    >
                      <svg
                        width="12"
                        height="12"
                        fill="none"
                        stroke="#74B9FF"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        className="flex-shrink-0 mt-0.5"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-ledger-white/40 mb-4 leading-relaxed">
                Not ready to talk? Download our free playbook. 28 pages. No
                fluff. Built specifically for CPA firms and fractional CFOs.
              </p>

              {playbookSubmitted ? (
                <div className="text-center py-5 flex-1 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-sky/15 border border-sky/30 flex items-center justify-center mx-auto mb-3">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#74B9FF"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-ledger-white mb-1">
                    Check your inbox.
                  </p>
                  <p className="text-xs text-ledger-white/40">
                    The playbook is on its way.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handlePlaybookSubmit}
                  className="flex flex-col gap-3 flex-1 justify-end"
                >
                  <input
                    type="email"
                    required
                    placeholder="your@cpafirm.com"
                    className="ledger-input"
                    value={playbookEmail}
                    onChange={(e) => setPlaybookEmail(e.target.value)}
                    aria-label="Email for playbook download"
                  />
                  <button
                    type="submit"
                    className="btn-outline-sky w-full py-3.5 text-sm font-bold rounded-lg"
                  >
                    Download Free Playbook →
                  </button>
                  <p className="text-[10px] text-ledger-white/20 text-center">
                    Just your email. No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGenSection;

