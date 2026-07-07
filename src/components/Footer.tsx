import React from "react";
import { ViewType } from "../types";
import { Code } from "lucide-react";

interface FooterProps {
  setCurrentView?: (view: ViewType) => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const handleSourceCodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(
      "Telemetry Sync: Displaying Source Code structure. Built using React + Node.js (Express) + Vite."
    );
  };

  return (
    <footer className="w-full py-8 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0b1326] border-t border-[#5b4138]/40 mt-auto font-mono text-xs text-slate-400">
      <div className="uppercase tracking-widest text-center md:text-left text-slate-500 font-medium">
        © 2026 ☕︎ 👩🏻‍💻  // MANISH SATHE
      </div>

      <ul className="flex items-center gap-6">
        <li>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#ff5f1f] transition-colors tracking-widest text-[11px]"
          >
            LINKEDIN
          </a>
        </li>
        <li>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#ff5f1f] transition-colors tracking-widest text-[11px]"
          >
            GITHUB
          </a>
        </li>
        <li>
          <a
            href="#source-code"
            onClick={handleSourceCodeClick}
            className="hover:text-[#ff5f1f] transition-colors flex items-center gap-1.5 tracking-widest text-[11px]"
          >
            <Code className="w-4 h-4 text-[#ff5f1f]" />
            SOURCE_CODE
          </a>
        </li>
      </ul>
    </footer>
  );
}
