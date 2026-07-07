import { useState } from "react";
import { Project } from "../types";
import { Layers, Database, Code, BookOpen, ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export default function ProjectsView() {
  const [filter, setFilter] = useState<"all" | "code" | "data">("all");

  const projects: Project[] = [
    {
      id: "proj-1",
      title: "Distributed Caching Layer",
      category: "code",
      tag: "WEB-DEV",
      description:
        "Engineered a highly available distributed caching mechanism to reduce database load by 40% during peak traffic spikes.",
      dependencies: ["Redis", "Go", "gRPC"],
      link: "https://github.com/manishsathe/distributed-caching",
    },
    {
      id: "proj-2",
      title: "Predictive Churn Model",
      category: "data",
      tag: "ANALYTICS",
      description:
        "Developed a machine learning pipeline to identify at-risk enterprise accounts with 85% precision.",
      dependencies: ["Python", "scikit-learn", "Snowflake"],
      link: "https://github.com/manishsathe/churn-prediction",
    },
    {
      id: "proj-3",
      title: "Real-time WebSocket Gateway",
      category: "code",
      tag: "WEB-DEV",
      description:
        "Built a scalable WebSocket gateway handling 100k+ concurrent connections for live telemetry data streaming.",
      dependencies: ["Node.js", "Socket.io", "Nginx"],
      link: "https://github.com/manishsathe/websocket-gateway",
    },
    {
      id: "proj-4",
      title: "Marketing Attribution Dashboard",
      category: "data",
      tag: "ANALYTICS",
      description:
        "Designed an interactive dashboard synthesizing cross-channel marketing spend to calculate accurate ROI.",
      dependencies: ["SQL", "dbt", "Tableau"],
      link: "https://github.com/manishsathe/marketing-attribution",
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const handleActionClick = (project: Project, type: "source" | "study") => {
    alert(
      `Initializing Protocol: Accessing ${type === "source" ? "Source Repository" : "Case Study Analyst Document"} for "${project.title}".`
    );
  };

  return (
    <div className="flex flex-col w-full py-6 font-mono text-slate-300">
      {/* Header Section */}
      <ScrollReveal delay={100}>
        <header className="mb-12 relative">
          <div className="absolute -left-16 w-10 border-t border-[#1e293b] top-1/2 hidden md:block"></div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
            PROJECT_REGISTRY
          </h1>
          <p className="font-sans text-slate-400 text-base max-w-2xl">
            A technical catalog of engineering builds and MBA-level analytical case studies. Filter by operational domain below.
          </p>
        </header>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={200}>
        <section className="mb-10 border-y border-[#5b4138]/40 py-4 flex flex-wrap gap-4 bg-[#131b2e] px-4 rounded-none">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs border uppercase flex items-center gap-1.5 cursor-pointer transition-all rounded-none ${
              filter === "all"
                ? "border-[#ff5f1f] text-[#ff5f1f] bg-[#ff5f1f]/10"
                : "border-[#5b4138]/40 text-slate-400 hover:border-[#ff5f1f] hover:text-[#ff5f1f]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ALL_SYSTEMS [00]</span>
          </button>

          <button
            onClick={() => setFilter("code")}
            className={`px-4 py-2 text-xs border uppercase flex items-center gap-1.5 cursor-pointer transition-all rounded-none ${
              filter === "code"
                ? "border-[#6366f1] text-[#c0c1ff] bg-[#6366f1]/10"
                : "border-[#5b4138]/40 text-slate-400 hover:border-[#6366f1] hover:text-[#c0c1ff]"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>[CODE] [01]</span>
          </button>

          <button
            onClick={() => setFilter("data")}
            className={`px-4 py-2 text-xs border uppercase flex items-center gap-1.5 cursor-pointer transition-all rounded-none ${
              filter === "data"
                ? "border-[#ff5f1f] text-[#ffb59c] bg-[#ff5f1f]/10"
                : "border-[#5b4138]/40 text-slate-400 hover:border-[#ff5f1f] hover:text-[#ffb59c]"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>[DATA] [02]</span>
          </button>
        </section>
      </ScrollReveal>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => {
          const isCode = project.category === "code";
          return (
            <ScrollReveal key={project.id} delay={100 * (idx % 3) + 100} className="h-full">
              <article
                className={`border border-[#5b4138]/40 bg-[#131b2e] relative group hover:border-[#ff5f1f] transition-all flex flex-col justify-between h-full brutal-shadow rounded-none overflow-hidden`}
              >
                <div className="absolute top-2 right-2 font-mono text-[10px] text-slate-500">
                  [0{idx + 1}]
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <span
                        className={`px-2 py-0.5 font-bold text-[9px] tracking-widest rounded-none border ${
                          isCode
                            ? "bg-[#6366f1]/15 text-[#c0c1ff] border-[#6366f1]/30"
                            : "bg-[#ff5f1f]/15 text-[#ffb59c] border-[#ff5f1f]/30"
                        }`}
                      >
                        {project.tag}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#ff5f1f] transition-colors">
                      {project.title}
                    </h2>

                    <p className="font-sans text-xs text-slate-300 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] text-slate-500 uppercase border-b border-[#5b4138]/40 pb-1">
                      Dependencies:
                    </div>
                    <ul className={`text-[11px] flex flex-wrap gap-x-2 gap-y-1 ${isCode ? "text-[#c0c1ff]/90" : "text-[#ffb59c]/90"}`}>
                      {project.dependencies.map((dep, dIdx) => (
                        <li key={dIdx} className="opacity-95">
                          &gt; {dep}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 border-t border-[#5b4138]/40 bg-[#0b1326]/40">
                  <button
                    onClick={() =>
                      handleActionClick(project, isCode ? "source" : "study")
                    }
                    className="text-xs text-slate-300 hover:text-[#ff5f1f] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isCode ? (
                      <>
                        <Code className="w-3.5 h-3.5" />
                        <span>View Source</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>View Study</span>
                      </>
                    )}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </button>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
