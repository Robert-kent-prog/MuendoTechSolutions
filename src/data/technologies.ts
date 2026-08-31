export interface TechCategory {
  group: string;
  items: string[];
}

export const TECH: TechCategory[] = [
  { group: "Frontend", items: ["React.js", "Vite", "HTML", "CSS", "JavaScript"] },
  { group: "Mobile", items: ["React Native", "Expo Router", "Android APK"] },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "FastAPI",
      "PHP",
      "Laravel",
      "Java",
      "Spring Boot",
      "C",
      "C++",
      "REST APIs",
      "MVC Architecture",
    ],
  },
  {
    group: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Vector databases"],
  },
  {
    group: "AI & Integrations",
    items: [
      "OpenAI API",
      "Gemini API",
      "LangChain",
      "RAG pipelines",
      "M-Pesa Daraja",
      "Vector databases",
    ],
  },
  {
    group: "Security & Tools",
    items: [
      "JWT",
      "Zod",
      "Helmet",
      "Rate limiting",
      "Mongo sanitization",
      "HPP",
      "Git & GitHub",
      "Linux",
      "cPanel",
    ],
  },
];
