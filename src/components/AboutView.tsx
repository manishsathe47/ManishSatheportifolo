import { TimelineItem } from "../types";
import { BookOpen, Layers, Settings, Award } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export default function AboutView() {
  const timeline: TimelineItem[] = [
    {
      id: "t-1",
      role: "IT Project Manager",
      company: "Strategic Insights Inc",
      duration: "OCT 2023 - JAN 2025",
      description:
        "Led cross-functional teams to deliver complex technical infrastructure projects. Managed stakeholder expectations, drove development sprints, and ensured technical deliverables aligned perfectly with high-level business models.",
      active: true,
    },
    {
      id: "t-2",
      role: "MBA Business Analytics",
      company: "Vivekanand Business School",
      duration: "2026 - PRESENT",
      description:
        "Focusing on data-driven decision making, strategic project management, financial forecasting models, and advanced business intelligence frameworks to guide corporate strategy.",
    },
    {
      id: "t-3",
      role: "Bachelor of Computer Engineering",
      company: "Universal College of Engineering",
      duration: "2017 - 2022",
      description:
        "Completed comprehensive foundational studies in software architecture, distributed systems, data structures, and advanced algorithms.",
    },
  ];

  return (
    <div className="flex flex-col w-full py-6 font-mono text-slate-300">
      {/* Hero Intro Section */}
      <ScrollReveal delay={100}>
        <section className="border-l border-[#5b4138]/40 pl-6 md:pl-8 relative mb-16 max-w-4xl">
          <div className="absolute -top-3 -left-3 text-[#ff5f1f] text-[10px] bg-[#0b1326] px-1 font-bold">
            [SYS_INIT]
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            Engineering <span className="text-[#ff5f1f]">logic.</span>
            <br />
            Studying <span className="text-[#6366f1]">value.</span>
          </h1>
          <p className="font-sans text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
            I operate at the intersection of robust technical infrastructure and advanced business intelligence. Currently an MBA candidate focused on architecting modern digital platforms that deliver measurable, data-driven financial and operational ROI.
          </p>
        </section>
      </ScrollReveal>

      {/* Divider */}
      <div className="h-[1px] bg-[#5b4138]/40 mb-16 relative">
        <div className="absolute right-0 -top-6 text-[10px] text-slate-500 border border-[#5b4138]/40 px-2 py-0.5 bg-[#131b2e] rounded-none">
          SEC_01
        </div>
      </div>

      {/* Section 1: The Hybrid Approach */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <ScrollReveal delay={100}>
            <div className="flex items-center gap-2 mb-3">
              <Award className="text-[#ff5f1f] w-5 h-5" />
              <h2 className="text-xl font-bold text-white uppercase">
                The Hybrid Approach
              </h2>
            </div>
            <div className="text-[10px] text-slate-500">[CAREER_&_EDUCATION]</div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-8">
          <ScrollReveal delay={200}>
            <div className="bg-[#131b2e] border border-[#5b4138]/40 p-6 relative group hover:border-[#ff5f1f] transition-colors brutal-shadow rounded-none">
              <div className="absolute top-0 right-0 p-1.5 text-[9px] text-slate-500 border-l border-b border-[#5b4138]/40 bg-[#0b1326] rounded-none">
                [SYS_INTELLIGENCE]
              </div>
              <p className="font-sans text-sm text-slate-300 mb-4 leading-relaxed">
                Modern software engineering requires more than just compiling elegant, bug-free syntax. It demands a deep, structural understanding of the information assets flowing through the system and the core business metrics those flows influence.
              </p>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                By combining rigorous system design patterns with advanced business intelligence frameworks, I build full-stack digital solutions that are not only performant, robust, and secure, but also tightly aligned with strategic objectives. Every engineering and architectural decision is weighed against its systemic ROI.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-[#5b4138]/40 mb-16 relative">
        <div className="absolute right-0 -top-6 text-[10px] text-slate-500 border border-[#5b4138]/40 px-2 py-0.5 bg-[#131b2e] rounded-none">
          SEC_02
        </div>
      </div>

      {/* Section 2: Experience Matrix */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <ScrollReveal delay={100}>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="text-[#6366f1] w-5 h-5" />
              <h2 className="text-xl font-bold text-white uppercase">
                Experience Matrix
              </h2>
            </div>
            <div className="text-[10px] text-slate-500">[CAREER_DEPLOYMENTS]</div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-8">
          <div className="border-l-2 border-[#5b4138]/40 pl-6 md:pl-8 space-y-10 relative">
            {timeline.map((item, idx) => (
              <ScrollReveal key={item.id} delay={150 * (idx + 1)}>
                <div className="relative">
                  {/* Node indicator */}
                  <div
                    className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 bg-[#0b1326] border-2 rounded-none ${
                      item.active ? "border-[#ff5f1f]" : "border-[#5b4138]/40"
                    }`}
                  />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-2">
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {item.role}
                    </h3>
                    <span
                      className={`text-[10px] tracking-wider border px-2 py-0.5 text-center shrink-0 rounded-none ${
                        item.active
                          ? "border-[#ff5f1f] text-[#ff5f1f] font-semibold"
                          : "border-[#5b4138]/40 text-slate-500"
                      }`}
                    >
                      {item.duration}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-[#6366f1] mb-3 uppercase tracking-wide">
                    {item.company}
                  </h4>

                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-[#5b4138]/40 mb-16 relative">
        <div className="absolute right-0 -top-6 text-[10px] text-slate-500 border border-[#5b4138]/40 px-2 py-0.5 bg-[#131b2e] rounded-none">
          SEC_03
        </div>
      </div>

      {/* Section 3: Bento Stack Box */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <ScrollReveal delay={100}>
            <div className="flex items-center gap-2 mb-3">
              <Settings className="text-slate-300 w-5 h-5" />
              <h2 className="text-xl font-bold text-white uppercase">
                Technical Toolbox
              </h2>
            </div>
            <div className="text-[10px] text-slate-500">[STACK_INVENTORY]</div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
          {/* Box 1: Engineering */}
          <ScrollReveal delay={150} className="h-full">
            <div className="border border-[#5b4138]/40 p-5 bg-[#131b2e]/60 hover:border-[#6366f1] transition-colors relative rounded-none brutal-shadow h-full">
              <div className="absolute top-2 right-2 text-[9px] text-slate-500">
                [ENG]
              </div>
              <h3 className="text-xs font-bold text-white uppercase mb-4 border-b border-[#5b4138]/40 pb-2">
                Core Engineering
              </h3>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "Python", "Go", "React.js", "Node.js", "Express.js", "REST APIs"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="text-[10px] text-[#6366f1] bg-[#6366f1]/10 border border-[#6366f1]/20 px-2.5 py-1 font-semibold uppercase rounded-none"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Box 2: Analytics & Data */}
          <ScrollReveal delay={250} className="h-full">
            <div className="border border-[#5b4138]/40 p-5 bg-[#131b2e]/60 hover:border-[#ff5f1f] transition-colors relative rounded-none brutal-shadow h-full">
              <div className="absolute top-2 right-2 text-[9px] text-slate-500">
                [DATA]
              </div>
              <h3 className="text-xs font-bold text-white uppercase mb-4 border-b border-[#5b4138]/40 pb-2">
                Analytics & Data
              </h3>
              <div className="flex flex-wrap gap-2">
                {["SQL", "Tableau", "Pandas", "dbt", "Snowflake", "Data Strategy", "BI Frameworks"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="text-[10px] text-[#ff5f1f] bg-[#ff5f1f]/10 border border-[#ff5f1f]/20 px-2.5 py-1 font-semibold uppercase rounded-none"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Box 3: Infrastructure & DevOps */}
          <ScrollReveal delay={350} className="md:col-span-2">
            <div className="border border-[#5b4138]/40 p-5 bg-[#131b2e]/60 relative rounded-none brutal-shadow hover:border-[#ff5f1f] transition-colors">
              <div className="absolute top-2 right-2 text-[9px] text-slate-500">
                [INFRA]
              </div>
              <h3 className="text-xs font-bold text-white uppercase mb-4 border-b border-[#5b4138]/40 pb-2">
                Infrastructure & DevOps
              </h3>
              <div className="flex flex-wrap gap-2">
                {["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Nginx", "Git Workflow"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="text-[10px] text-slate-300 border border-[#5b4138]/40 bg-[#0b1326] px-2.5 py-1 uppercase rounded-none hover:border-[#ff5f1f] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
