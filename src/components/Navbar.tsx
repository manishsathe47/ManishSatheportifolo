import { ViewType } from "../types";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links: { label: string; view: ViewType }[] = [
    { label: "HOME", view: "home" },
    { label: "PROJECTS", view: "projects" },
    { label: "ABOUT", view: "about" },
    { label: "CONTACT", view: "contact" },
  ];

  const handleResumeClick = () => {
    // Standard mock CV click alert or placeholder link
    alert("System Protocol: Downloading Manish_Sathe_Resume.pdf...");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-[#0b1326]/90 backdrop-blur-md border-b border-[#5b4138]/40 px-6 md:px-16 flex items-center justify-between font-mono">
      {/* Brand */}
      <button
        onClick={() => {
          setCurrentView("home");
          setIsOpen(false);
        }}
        className="font-bold text-lg md:text-xl text-white tracking-tight hover:text-[#ff5f1f] transition-colors duration-200"
      >
        MANISH<span className="text-[#ff5f1f]">.</span>SATHE
      </button>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-6 text-xs">
        {links.map((link) => {
          const isActive = currentView === link.view;
          return (
            <li key={link.view}>
              <button
                onClick={() => setCurrentView(link.view)}
                className={`uppercase tracking-wider transition-all px-1 py-1 cursor-pointer border-b-2 hover:text-slate-100 ${
                  isActive
                    ? "text-[#ff5f1f] border-[#ff5f1f] font-semibold"
                    : "text-slate-400 border-transparent"
                }`}
              >
                {link.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Trailing Action */}
      <div className="hidden md:flex items-center">
        <button
          onClick={handleResumeClick}
          className="border border-[#5b4138]/50 hover:border-[#ff5f1f] text-slate-300 hover:text-[#ff5f1f] text-xs px-4 py-2 flex items-center gap-2 transition-all group cursor-pointer bg-[#131b2e] rounded-none"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce text-[#ff5f1f]" />
          RESUME/CV
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={handleResumeClick}
          className="border border-[#5b4138]/50 bg-[#131b2e] text-xs px-2.5 py-1.5 flex items-center gap-1.5 text-slate-300 hover:text-[#ff5f1f] hover:border-[#ff5f1f] transition-colors rounded-none"
          title="CV"
        >
          <Download className="w-3.5 h-3.5 text-[#ff5f1f]" />
          CV
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-300 hover:text-[#ff5f1f] focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0b1326] border-b border-[#5b4138]/40 md:hidden py-4 px-6 flex flex-col gap-4 animate-fade-in rounded-none">
          {links.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => {
                  setCurrentView(link.view);
                  setIsOpen(false);
                }}
                className={`text-left uppercase text-xs tracking-widest py-1 border-l-2 pl-3 ${
                  isActive
                    ? "text-[#ff5f1f] border-[#ff5f1f] font-bold"
                    : "text-slate-400 border-transparent"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
