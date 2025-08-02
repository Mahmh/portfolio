import {
  siReact,
  siNextdotjs,
  siVite,
  siFastapi,
  siOpenjdk,
  siTypescript,
  siMysql,
  siSqlite,
  siPostgresql,
  siPytorch,
  siDocker,
  siGit,
  siLinux,
  siGnubash,
  siPandas,
  siScikitlearn,
  siSass,
  siPython,
  siHuggingface,
  siTensorflow,
  siPlotly,
  siGithubactions,
  siPreact,
  siHostinger,
} from "simple-icons";

export const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
export const UMAMI_SCRIPT_URL = import.meta.env.VITE_UMAMI_SCRIPT_URL;
export const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

export const STATS = [
  { label: "Years of Experience", value: "5+" },
  { label: "Projects Completed", value: "20+" },
  { label: "Tech Stack Mastery", value: "Full-Stack AI" },
];

export const PROJECTS = [
  {
    title: "Shiftiatrics",
    description:
      "A smart shift scheduling engine for healthcare ERs that reduces scheduling time by 75% and serves hospitals through a B2B business model.",
    stack: [
      "Next.js",
      "FastAPI",
      "Java",
      "PostgreSQL",
      "SCSS",
      "Docker",
      "Hostinger VPS",
    ],
    img: "/img/projects/shiftiatrics.webp",
    url: "https://github.com/Mahmh/shiftiatrics",
  },
  {
    title: "AI-Personalized E-Commerce",
    description:
      "An intelligent storefront that recommends products in real-time and includes a built-in AI shopping assistant powered by a language model.",
    stack: ["Next.js", "FastAPI", "MySQL", "SCSS", "Docker", "Ollama"],
    img: "/img/projects/ai-ecom-app.webp",
    url: "https://github.com/Mahmh/ai_ecom_app",
  },
  {
    title: "Semantic Course Search",
    description:
      "A smarter search engine for 100+ tech courses that understands meaning — not just keywords.",
    stack: ["Vite", "FastAPI", "SQLite", "SCSS", "Docker", "ChromaDB"],
    img: "/img/projects/semantic-course-search.webp",
    url: "https://github.com/Mahmh/CourseSeek",
  },
  {
    title: "AI-Powered Resume Screener",
    description:
      "An AI-powered tool that matches candidates to jobs by evaluating their resumes against specific job requirements. It includes the job relevance score and AI analysis.",
    stack: ["Vite", "FastAPI", "Ollama", "Hugging Face", "Docker"],
    img: "/img/projects/resume-screener.webp",
    url: "https://github.com/Mahmh/resume-screener",
  },
  {
    title: "Custom DSA Toolkit using Java",
    description:
      "A personal Java project showcasing core CS fundamentals through custom-built data structures and algorithms. Includes arrays, trees, and graphs — all tested and written from scratch to reinforce deep algorithmic thinking.",
    stack: ["Java", "Algorithms", "Gradle", "JUnit Jupiter"],
    img: "/img/projects/custom-dsa.webp",
    url: "https://github.com/Mahmh/custom-dsa",
  },
  {
    title: "Custom ML Toolkit using Python",
    description:
      "A personal Python project for implementing some popular machine learning & deep learning algorithms (e.g., linear regression) from scratch.",
    stack: ["Python", "AI/ML", "NumPy", "Pandas", "Matplotlib"],
    img: "/img/projects/custom-ml.webp",
    url: "https://github.com/Mahmh/custom-machine-learning",
  },
];

export const SERVICES = [
  {
    title: "Full-Stack Web Development",
    description:
      "I build scalable, responsive web apps from UI to backend using modern tools like Next.js and FastAPI.",
  },
  {
    title: "AI Integration",
    description:
      "I add AI to products — from smart search to recommendations — using open-source models and APIs.",
  },
  {
    title: "Lean MVP Development",
    description:
      "I quickly turn ideas into working demos, ideal for validation or pitching.",
  },
  {
    title: "Tech Strategy & Architecture",
    description:
      "I help pick the right stack and design scalable systems that won’t break later.",
  },
];

export const SKILLS = {
  Frontend: [
    { name: "TypeScript", icon: siTypescript },
    { name: "SCSS", icon: siSass },
    { name: "React", icon: siReact },
    { name: "Next.js", icon: siNextdotjs },
    { name: "Vite", icon: siVite },
    { name: "Preact Signals", icon: siPreact },
  ],
  Backend: [
    { name: "Python", icon: siPython },
    { name: "Java (OpenJDK)", icon: siOpenjdk },
    { name: "FastAPI", icon: siFastapi },
    { name: "SQLite", icon: siSqlite },
    { name: "MySQL", icon: siMysql },
    { name: "PostgreSQL", icon: siPostgresql },
  ],
  "AI/ML": [
    { name: "PyTorch", icon: siPytorch },
    { name: "TensorFlow", icon: siTensorflow },
    { name: "Pandas", icon: siPandas },
    { name: "Plotly", icon: siPlotly },
    { name: "scikit-learn", icon: siScikitlearn },
    { name: "Hugging Face", icon: siHuggingface },
  ],
  "Tools & DevOps": [
    { name: "Linux", icon: siLinux },
    { name: "Bash Terminal", icon: siGnubash },
    { name: "Docker", icon: siDocker },
    { name: "Git", icon: siGit },
    { name: "GitHub Actions", icon: siGithubactions },
    { name: "Hostinger", icon: siHostinger },
  ],
};
