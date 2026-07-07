export interface TerminalLine {
  text: string;
  type: "input" | "output" | "system" | "error";
  timestamp: string;
}

export interface Project {
  id: string;
  title: string;
  category: "code" | "data";
  tag: string;
  description: string;
  dependencies: string[];
  link: string;
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  active?: boolean;
}

export type ViewType = "home" | "projects" | "about" | "contact";
