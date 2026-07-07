import { useState } from "react";
import { ViewType } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ProjectsView from "./components/ProjectsView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("home");

  const renderActiveView = () => {
    switch (currentView) {
      case "home":
        return <HomeView setCurrentView={setCurrentView} />;
      case "projects":
        return <ProjectsView />;
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      default:
        return <HomeView setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-sans blueprint-grid min-h-screen flex flex-col pt-16 selection:bg-[#ff5f1f] selection:text-black">
      {/* Visual CRT Monitor Scanline effect overlay */}
      <div className="scanline"></div>

      {/* Primary Header Navigation bar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Canvas with bento lines */}
      <main className="flex-grow flex flex-col relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 py-12">
        {/* Decorative Vertical Grid Guides */}
        <div className="absolute inset-y-0 left-6 md:left-16 w-[1px] bg-[#1e293b]/40 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-6 md:right-16 w-[1px] bg-[#1e293b]/40 pointer-events-none"></div>
        
        {/* Content Render Outlet */}
        <div className="relative z-20 flex flex-col w-full">
          {renderActiveView()}
        </div>
      </main>

      {/* Shared Footer navigation */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}
