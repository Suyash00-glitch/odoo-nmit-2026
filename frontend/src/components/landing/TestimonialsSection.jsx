import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowUpRight, Sparkles } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      quote:
        "Dayflow automated our onboarding and Login ID provisioning completely. Our HR operations team saved over 20 hours every week.",
      name: "Siddharth Rao",
      role: "VP of People Operations",
      company: "Nexus Technologies",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    },
    {
      quote:
        "The transparent salary breakdown and 1-click leave approvals eliminated all employee disputes. The interface is simply gorgeous and fast.",
      name: "Meera Nair",
      role: "HR Director",
      company: "Aura Fintech",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    },
    {
      quote:
        "The real-time attendance duration tracking and executive analytics give our leadership team full visibility across all departments.",
      name: "Kabir Mehta",
      role: "Co-Founder & CEO",
      company: "Lumina Labs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    },
  ];

  return (
    <section id="reviews" className="py-28 px-6 bg-[#F8F9FD] text-neutral-900 border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto space-y-14">
        
        {/* Header with Top-Right Lime Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-[#6B42EF] text-sm font-extrabold uppercase tracking-wider">
              <Sparkles size={15} />
              <span>Real Testimonials</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-950 tracking-tight leading-tight">
              What Our Customers Say
            </h2>
          </div>

          <Link
            to="/signup"
            className="btn-lime px-6 py-3 rounded-full text-sm font-extrabold flex items-center gap-2 shadow-lime self-start md:self-auto"
          >
            <span>See More Reviews</span>
            <ArrowUpRight size={16} className="text-black stroke-[2.5]" />
          </Link>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-semibold">
                  “{r.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-neutral-950">{r.name}</h4>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">{r.role} • {r.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
