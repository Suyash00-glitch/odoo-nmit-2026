import React from "react";

const items = [
  "LinkedIn Presence",
  "Instagram Strategy",
  "Google Business",
  "Content Calendar",
  "Tax Season Coverage",
  "CPA Thought Leadership",
  "Review Management",
  "Post Scheduling",
  "100% Done-For-You",
  "Zero Time Required",
];

const MarqueeBar: React.FC = () => {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-sky/20 py-4"
      style={{ background: "rgba(116,185,255,0.06)" }}
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 mx-6">
            <span className="text-sky text-xs font-bold uppercase tracking-[0.2em]">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-sky/40" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBar;
