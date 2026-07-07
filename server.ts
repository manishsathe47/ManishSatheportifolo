import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Interfaces
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
}

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory messages storage
const messages: ContactMessage[] = [
  {
    id: "welcome-1",
    name: "System",
    email: "system@command.dev",
    message: "Welcome to Manish's Command Center terminal! Type messages or queries.",
    timestamp: new Date()
  }
];

// Lazy Gemini API Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Transmit contact form message
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, message" });
  }

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name: String(name),
    email: String(email),
    message: String(message),
    timestamp: new Date()
  };

  messages.push(newMessage);
  console.log(`[Form Transmitted] Name: ${name}, Email: ${email}`);
  res.json({ success: true, message: "Transmission received successfully.", data: newMessage });
});

// Fetch submitted messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// Handle interactive terminal commands
app.post("/api/terminal/command", async (req, res) => {
  const { command } = req.body;
  if (command === undefined || command === null) {
    return res.status(400).json({ error: "Command string required" });
  }

  const trimmed = String(command).trim();
  const args = trimmed.split(" ");
  const baseCmd = args[0].toLowerCase();

  const timeStr = new Date().toTimeString().split(" ")[0];

  if (!trimmed) {
    return res.json({ output: `manish_sathe@command [${timeStr}]: awaiting input` });
  }

  // Handle static commands
  if (baseCmd === "help") {
    const helpOutput = [
      "Available command center protocols:",
      "  about        Display personal profile and mission overview",
      "  projects     List active technical builds and registries",
      "  contact      Get transmission contact link and credentials",
      "  messages     View sent payloads and contact logs from this session",
      "  clear        Flush the command console screen logs",
      "  gemini <msg> Ask Manish's AI twin any question directly",
      "",
      "Tip: Just type any question (e.g. 'what is your tech stack?') and Manish's AI assistant will answer!"
    ].join("\n");
    return res.json({ output: helpOutput });
  }

  if (baseCmd === "about") {
    const aboutOutput = [
      "MANISH SATHE PROFILE OVERVIEW:",
      "========================================",
      "Role: Digital Craft Architect / Full-Stack Engineer / MBA Candidate",
      "Core Mission:",
      "  Bridging the gap between software engineering and advanced business",
      "  analytics to architect secure, scalable, data-driven systems.",
      "",
      "Education Timeline:",
      "  • 2026 - Present: MBA Business Analytics @ Vivekanand Business School",
      "  • 2017 - 2022: Bachelor of Computer Engineering @ Universal College",
      "",
      "Prior Role:",
      "  • Oct 2023 - Jan 2025: IT Project Manager @ Strategic Insights Inc"
    ].join("\n");
    return res.json({ output: aboutOutput });
  }

  if (baseCmd === "projects") {
    const projectsOutput = [
      "ACTIVE SYSTEM PROJECT_REGISTRY:",
      "========================================",
      "[01] Distributed Caching Layer (Go / Redis / gRPC)",
      "     Engineered a highly available distributed caching mechanism to reduce",
      "     database load by 40% during peak traffic spikes.",
      "",
      "[02] Predictive Churn Model (Python / scikit-learn / Snowflake)",
      "     Developed a machine learning pipeline to identify at-risk enterprise",
      "     accounts with 85% precision.",
      "",
      "[03] Real-time WebSocket Gateway (Node.js / Socket.io / Nginx)",
      "     Built a scalable WebSocket gateway handling 100k+ concurrent",
      "     connections for live telemetry data streaming.",
      "",
      "[04] Marketing Attribution Dashboard (SQL / dbt / Tableau)",
      "     Designed an interactive dashboard synthesizing cross-channel marketing",
      "     spend to calculate accurate ROI."
    ].join("\n");
    return res.json({ output: projectsOutput });
  }

  if (baseCmd === "contact") {
    const contactOutput = [
      "CONTACT SYSTEM PROTOCOLS:",
      "========================================",
      "Return Address:  hello@digitalcraft.dev",
      "LinkedIn:        linkedin.com/in/manish-sathe",
      "GitHub:          github.com/manishsathe",
      "",
      "Transmission status: ONLINE. Fill the form below to initiate sync."
    ].join("\n");
    return res.json({ output: contactOutput });
  }

  if (baseCmd === "messages") {
    if (messages.length === 0) {
      return res.json({ output: "No messages transmitted yet in this session." });
    }
    const messagesOutput = [
      "TRANSMITTED MESSAGE LOGS:",
      "========================================",
      ...messages.map((m, idx) => {
        const time = new Date(m.timestamp).toLocaleTimeString();
        return `[${idx + 1}] At ${time} - From ${m.name} (${m.email}):\n    "${m.message}"`;
      })
    ].join("\n");
    return res.json({ output: messagesOutput });
  }

  // If anything else, let's treat it as a direct question to Manish's AI Twin!
  // If it starts with "gemini ", slice it, otherwise send the whole text.
  let queryPrompt = trimmed;
  if (baseCmd === "gemini" && args.length > 1) {
    queryPrompt = trimmed.substring(7);
  }

  try {
    const ai = getGeminiClient();
    const systemInstruction = `
You are Manish Sathe's Executive AI Twin/Command Agent. 
Manish Sathe is a Full-Stack Engineer and Business Analytics MBA Candidate.
His technical toolbox includes: React, TypeScript, Node.js, Go, Python, Redis, SQL, Snowflake, Tableau, Docker, AWS.
His career highlights: IT Project Manager at Strategic Insights Inc (Oct 2023 - Jan 2025), MBA at Vivekanand Business School, and Computer Engineering at Universal College of Engineering.

Respond to queries professionally, directly, and in a slightly technical/monospace style suitable for a command-line terminal interface. 
Keep answers concise (under 150 words), using clean bullet points and plain text. Do not use complex markdown styling like bold headers, but simple dashed dividers, clear spacing, and plain terminal style.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: queryPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const aiText = response.text || "SYSTEM ERROR: Awaiting telemetry connection.";
    return res.json({ output: aiText.trim() });
  } catch (error: any) {
    console.error("Gemini API call error:", error);
    // Graceful fallback if GEMINI_API_KEY is missing or fails
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        output: [
          `[SYS_ALERT] API KEY NOT DETECTED`,
          `Your query: "${queryPrompt}"`,
          `This port's Gemini server requires a GEMINI_API_KEY in Settings > Secrets.`,
          `Here is standard automated info on Manish Sathe:`,
          `  - Full-Stack Engineer & MBA Student`,
          `  - Tech Stack: TypeScript, React, Go, Python, SQL, Redis, Docker`,
          `  - Contact: hello@digitalcraft.dev`
        ].join("\n")
      });
    }
    return res.json({ output: `SYSTEM EXCEPTION: Unable to generate response. (${error.message || error})` });
  }
});

// Vite & Static file handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server Ready] Bound to http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
