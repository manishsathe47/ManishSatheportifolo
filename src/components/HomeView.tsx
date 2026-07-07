import React, { useState, useEffect, useRef } from "react";
import { ViewType } from "../types";
import { Terminal, Cpu, ArrowRight, ShieldAlert } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface HomeViewProps {
  setCurrentView: (view: ViewType) => void;
}

interface LogLine {
  text: string;
  type: "system" | "input" | "output" | "error";
}

export default function HomeView({ setCurrentView }: HomeViewProps) {
  const [localTime, setLocalTime] = useState("");
  const [systemLoad, setSystemLoad] = useState(2.44);
  const [inputVal, setInputVal] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<LogLine[]>([
    { text: "[ OK ] MOUNTING KERNEL_FS...", type: "system" },
    { text: "[ OK ] STARTING ENGINEERING_LAYER: ACTIVE", type: "system" },
    { text: "[ OK ] INITIALIZING ANALYTICS_PROTOCOL: RUNNING", type: "system" },
    { text: "[ OK ] LOADING MBA_MODULES: OPTIMIZED", type: "system" },
  ]);
  const [loading, setLoading] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Maintain local time and random load updates
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toTimeString().split(" ")[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const loadInterval = setInterval(() => {
      setSystemLoad((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        const next = Math.max(1.0, Math.min(10.0, prev + delta));
        return parseFloat(next.toFixed(2));
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(loadInterval);
    };
  }, []);

  // Scroll terminal logs to bottom on changes
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs, loading]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    // Append user input line
    const userLine: LogLine = {
      text: `manish_sathe@command: ${cmd}`,
      type: "input",
    };
    setTerminalLogs((prev) => [...prev, userLine]);
    setInputVal("");
    setLoading(true);

    try {
      const res = await fetch("/api/terminal/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmd }),
      });

      if (!res.ok) {
        throw new Error("Telemetry connection failure");
      }

      const data = await res.json();
      
      // If user typed 'clear', clean the logs instead of showing output
      if (cmd.toLowerCase() === "clear") {
        setTerminalLogs([]);
      } else {
        setTerminalLogs((prev) => [
          ...prev,
          { text: data.output, type: "output" },
        ]);
      }
    } catch (err: any) {
      setTerminalLogs((prev) => [
        ...prev,
        { text: `CONNECTION ERROR: ${err.message || "Endpoint offline."}`, type: "error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* HUD Overview overlay for wide viewports */}
      <div className="fixed top-20 right-6 md:right-16 z-40 hidden lg:flex flex-col gap-1.5 font-mono text-[10px] text-slate-500 uppercase tracking-widest pointer-events-none text-right">
        <div className="flex items-center justify-end gap-2">
          <span className="w-2 h-2 bg-[#ff5f1f] rounded-full animate-pulse"></span>
          ACTIVE PROTOCOL: [SYS-01: READY]
        </div>
        <div>LOCAL_TIME: <span className="text-white">{localTime || "00:00:00"}</span></div>
        <div className="text-[#ff5f1f]">SYSTEM_LOAD: {systemLoad}%</div>
      </div>

      {/* Hero Section */}
      <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative border-b border-[#5b4138]/40 pb-16 pt-6">
        <div className="lg:col-span-7">
          <div className="absolute top-0 right-0 font-mono text-xs text-slate-500 uppercase hidden lg:block">
            [SEC-01: HERO_INIT]
          </div>

          <ScrollReveal delay={100} className="max-w-xl">
            <p className="font-mono text-xs text-[#ff5f1f] mb-4 flex items-center gap-2 uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#ff5f1f]"></span>
              EXECUTIVE SYSTEM STATUS: ONLINE
            </p>

            <h1 className="font-mono text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Manish Sathe.<br />
              <span className="text-[#ff5f1f] text-glow-orange">Mastering data.</span>
            </h1>

            <p className="font-sans text-base md:text-lg text-slate-300 max-w-lg mb-8 border-l-2 border-[#ff5f1f] pl-4 leading-relaxed">
              Bridging the gap between software engineering and advanced business analytics.
              Engineering scalable systems while pursuing an MBA to architect data-driven strategy.
            </p>

            <div className="flex flex-wrap gap-4 font-mono">
              <button
                onClick={() => setCurrentView("projects")}
                className="bg-[#ff5f1f] hover:bg-[#ff7a45] text-black font-bold text-xs uppercase px-6 py-3 transition-colors duration-200 flex items-center gap-2 cursor-pointer rounded-none"
              >
                VIEW SCHEMA
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView("contact")}
                className="border border-[#5b4138]/50 bg-[#131b2e] hover:border-[#6366f1] hover:text-[#6366f1] text-white text-xs uppercase px-6 py-3 transition-colors duration-200 flex items-center gap-2 cursor-pointer rounded-none"
              >
                <span className="text-slate-500 font-bold">&gt;</span>
                INITIALIZE_CONTACT
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive Terminal Overview Window */}
        <div className="lg:col-span-5">
          <ScrollReveal delay={300}>
            <div className="bg-[#131b2e] border border-[#5b4138]/40 overflow-hidden brutal-shadow font-mono text-xs text-slate-300 rounded-none">
              {/* Terminal Header */}
              <div className="bg-[#0b1326]/85 px-4 py-2.5 flex items-center justify-between border-b border-[#5b4138]/40">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 bg-[#6366f1]/80"></span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#6366f1]" />
                  system_overview.sh
                </div>
                <div className="w-10"></div>
              </div>

              {/* Terminal Logs & Console */}
              <div className="p-4 h-64 overflow-y-auto flex flex-col gap-2 bg-[#0b1326]/50">
                <div className="flex gap-2 text-[#6366f1]">
                  <span>#</span>
                  <span>boot_sequence --verbose</span>
                </div>

                {terminalLogs.map((log, idx) => {
                  let textClass = "text-slate-500";
                  if (log.type === "input") textClass = "text-[#6366f1] font-semibold";
                  if (log.type === "output") textClass = "text-slate-200 whitespace-pre-wrap leading-relaxed";
                  if (log.type === "error") textClass = "text-red-400 bg-red-950/20 px-1 border border-red-900/40";

                  return (
                    <div key={idx} className={`${textClass} text-[11px]`}>
                      {log.text}
                    </div>
                  );
                })}

                {loading && (
                  <div className="text-[#6366f1] animate-pulse flex items-center gap-1">
                    <span>&gt; Connecting telemetry sync...</span>
                    <span className="terminal-cursor"></span>
                  </div>
                )}

                <div ref={logsEndRef} />
              </div>

              {/* Interactive Terminal Prompt Input */}
              <form onSubmit={handleCommandSubmit} className="border-t border-[#5b4138]/40 bg-[#0b1326] p-3 flex items-center gap-2">
                <span className="text-[#6366f1] font-bold shrink-0">manish_sathe@command:</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type 'help' or ask anything..."
                  className="bg-transparent text-white border-none outline-none focus:ring-0 p-0 text-xs flex-grow font-mono caret-[#ff5f1f]"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="text-[10px] bg-[#171f33] hover:bg-[#6366f1] text-white hover:text-black px-2 py-1 uppercase border border-[#5b4138]/50 transition-colors cursor-pointer rounded-none"
                >
                  Run
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 border-b border-[#5b4138]/40 relative" id="capabilities">
        <div className="absolute top-4 right-0 font-mono text-xs text-slate-500 uppercase">
          [SEC-02: CAPABILITIES]
        </div>

        <ScrollReveal delay={100} className="flex items-center gap-3 mb-10">
          <Cpu className="text-[#ff5f1f] w-7 h-7" />
          <h2 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
            Core Competencies
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Engineering */}
          <ScrollReveal delay={200} className="h-full">
            <div className="bg-[#131b2e] border border-[#5b4138]/40 p-6 relative brutal-shadow group flex flex-col justify-between h-full rounded-none">
              <div className="absolute top-2 right-2 font-mono text-[9px] text-[#6366f1] bg-[#6366f1]/10 px-1.5 py-0.5 border border-[#6366f1]/20 rounded-none">
                [MOD: ENG_01]
              </div>

              <div>
                <div className="text-3xl text-[#6366f1] mb-4 group-hover:scale-110 transition-transform font-bold font-mono">
                  &lt;/&gt;
                </div>
                <h3 className="font-mono text-lg font-bold text-white uppercase border-b border-[#5b4138]/40 pb-2 mb-4">
                  Full-Stack Engineering
                </h3>
                <p className="font-sans text-sm text-slate-300 mb-6 leading-relaxed">
                  Architecting scalable, resilient web applications with a focus on clean code, modern frameworks, and robust API design for complex data environments.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["JavaScript / TS", "React Ecosystem", "Node.js / Express", "Cloud Architecture"].map((badge) => (
                  <span
                    key={badge}
                    className="bg-[#171f33] border border-[#5b4138]/40 text-slate-300 font-mono text-[10px] px-2.5 py-1 uppercase tracking-tight rounded-none"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 2: Analytics */}
          <ScrollReveal delay={300} className="h-full">
            <div className="bg-[#131b2e] border border-[#5b4138]/40 p-6 relative brutal-shadow group flex flex-col justify-between h-full rounded-none">
              <div className="absolute top-2 right-2 font-mono text-[9px] text-[#ff5f1f] bg-[#ff5f1f]/10 px-1.5 py-0.5 border border-[#ff5f1f]/20 rounded-none">
                [MOD: ANA_02]
              </div>

              <div>
                <div className="text-3xl text-[#ff5f1f] mb-4 group-hover:scale-110 transition-transform font-bold font-mono">
                  f(x)
                </div>
                <h3 className="font-mono text-lg font-bold text-white uppercase border-b border-[#5b4138]/40 pb-2 mb-4">
                  Analytics & Strategy
                </h3>
                <p className="font-sans text-sm text-slate-300 mb-6 leading-relaxed">
                  Applying statistical modeling and MBA-level insights to translate complex data sets into actionable strategic growth and financial projections.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Statistical Modeling", "MBA Business Strategy", "Financial Forecasting", "Advanced SQL / BI"].map((badge) => (
                  <span
                    key={badge}
                    className="bg-[#171f33] border border-[#5b4138]/40 text-slate-300 font-mono text-[10px] px-2.5 py-1 uppercase tracking-tight rounded-none"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
