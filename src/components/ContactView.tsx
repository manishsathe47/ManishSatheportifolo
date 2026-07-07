import React, { useState } from "react";
import { Mail, Link, Code, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMsg("Validation Protocol Failed: Please fill all fields.");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Telemetry transmit failure");
      }

      const data = await res.json();
      setStatus("success");
      setStatusMsg(data.message || "Message transmitted successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setStatusMsg(`Transmission Failed: ${err.message || "Server offline."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full py-6 font-mono text-slate-300 items-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <ScrollReveal delay={100}>
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold uppercase mb-2 tracking-tight text-white">
              Get In Touch
            </h1>
            <p className="font-sans text-sm text-slate-500">
              Initialize academic or professional collaboration.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Form Container */}
        <ScrollReveal delay={200}>
          <div className="bg-[#131b2e] border border-[#5b4138]/40 p-6 md:p-8 relative brutal-shadow rounded-none">
            {/* Decorative Coordinate Tag */}
            <div className="absolute top-2 right-2 text-[10px] text-slate-500">
              [SEC_04: TRANS_PORT]
            </div>

            {status === "success" ? (
              <div className="py-8 flex flex-col items-center text-center gap-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <h3 className="text-lg font-bold text-white uppercase">
                  Transmission complete
                </h3>
                <p className="font-sans text-xs text-slate-300 max-w-md leading-relaxed">
                  {statusMsg || "Your payload has been synchronized with Manish Sathe's secure database server. Check the home console 'messages' logs to verify your packet status."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 border border-[#ff5f1f] bg-[#ff5f1f]/10 hover:bg-[#ff5f1f]/20 text-[#ff5f1f] text-xs uppercase px-4 py-2 transition-colors cursor-pointer rounded-none"
                >
                  Transmit New Packet
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                {/* Status Warning if error */}
                {status === "error" && (
                  <div className="bg-red-950/20 border border-red-900/40 p-3 flex items-center gap-2.5 text-xs text-red-300 rounded-none">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-slate-400 font-bold" htmlFor="name">
                    Name // Sender ID
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your designation or full name"
                    className="bg-[#0b1326] border-b border-[#5b4138]/40 px-3 py-2.5 focus:outline-none focus:border-b-2 focus:border-[#ff5f1f] text-xs text-white transition-all rounded-none font-mono"
                    disabled={loading}
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-slate-400 font-bold" htmlFor="email">
                    Email // Return Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your communication mail link"
                    className="bg-[#0b1326] border-b border-[#5b4138]/40 px-3 py-2.5 focus:outline-none focus:border-b-2 focus:border-[#ff5f1f] text-xs text-white transition-all rounded-none font-mono"
                    disabled={loading}
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-slate-400 font-bold" htmlFor="message">
                    Payload // Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Transmit your message, inquiry, or partnership specs..."
                    rows={5}
                    className="bg-[#0b1326] border border-[#5b4138]/40 px-3 py-3 focus:outline-none focus:border-[#ff5f1f] text-xs text-white transition-all resize-none rounded-none font-mono"
                    disabled={loading}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#ff5f1f] hover:bg-[#ff7a45] text-black font-bold text-xs uppercase px-6 py-2.5 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed rounded-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? "TRANSMITTING..." : "TRANSMIT"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Alternative Comm links */}
        <ScrollReveal delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer border border-[#5b4138]/40 px-4 py-2.5 bg-[#131b2e]/40 rounded-none">
              <Mail className="w-4 h-4 text-[#ff5f1f]" />
              <span>hello@digitalcraft.dev</span>
            </div>

            <div className="hidden sm:block text-slate-700">|</div>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors border border-[#5b4138]/40 px-4 py-2.5 bg-[#131b2e]/40 rounded-none"
            >
              <Link className="w-4 h-4 text-[#6366f1]" />
              <span>LinkedIn Profile</span>
            </a>

            <div className="hidden sm:block text-slate-700">|</div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors border border-[#5b4138]/40 px-4 py-2.5 bg-[#131b2e]/40 rounded-none"
            >
              <Code className="w-4 h-4 text-[#6366f1]" />
              <span>GitHub Repos</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
