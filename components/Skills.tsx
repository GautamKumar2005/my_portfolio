"use client";

import { useState, useMemo } from "react";
import { SKILLS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Search, Sparkles, CheckCircle2 } from "lucide-react";
import { 
  SiC, SiCplusplus, SiTypescript, SiJavascript, SiPython, SiMysql, SiPostgresql, SiSupabase, 
  SiPytorch, SiTensorflow, SiKeras, SiScikitlearn, SiOpencv,
  SiNextdotjs, SiReact, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb,
  SiGit, SiGithub, SiPostman, SiUbuntu, SiFigma, SiCanva,
  SiStreamlit, SiFlask, SiNgrok, SiFastapi, SiDocker
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaBrain, FaRobot, FaNetworkWired, FaProjectDiagram, FaServer, FaCogs } from "react-icons/fa";
import { TbApi, TbBrandOpenai, TbDatabase } from "react-icons/tb";

export const SkillIcon = ({ name }: { name: string }) => {
  const iconProps = { className: "w-4 h-4 flex-shrink-0" };
  switch (name) {
    case "Python": return <SiPython {...iconProps} className="w-4 h-4 text-[#3776AB]" />;
    case "FastAPI": return <SiFastapi {...iconProps} className="w-4 h-4 text-teal-400" />;
    case "Flask": return <SiFlask {...iconProps} className="w-4 h-4 text-emerald-300" />;
    case "C": return <SiC {...iconProps} className="w-4 h-4 text-blue-500" />;
    case "C++": return <SiCplusplus {...iconProps} className="w-4 h-4 text-blue-600" />;
    case "TypeScript": return <SiTypescript {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "JavaScript (ES6+)": return <SiJavascript {...iconProps} className="w-4 h-4 text-yellow-400" />;
    case "SQL": return <TbDatabase {...iconProps} className="w-4 h-4 text-gray-400" />;
    case "PyTorch": return <SiPytorch {...iconProps} className="w-4 h-4 text-orange-500" />;
    case "TensorFlow": return <SiTensorflow {...iconProps} className="w-4 h-4 text-orange-400" />;
    case "Keras": return <SiKeras {...iconProps} className="w-4 h-4 text-red-500" />;
    case "Scikit-learn": return <SiScikitlearn {...iconProps} className="w-4 h-4 text-orange-400" />;
    case "OpenCV": return <SiOpencv {...iconProps} className="w-4 h-4 text-green-500" />;
    case "YOLO":
    case "YOLOv8": return <FaBrain {...iconProps} className="w-4 h-4 text-cyan-400" />;
    case "Streamlit": return <SiStreamlit {...iconProps} className="w-4 h-4 text-red-400" />;
    case "Ngrok": return <SiNgrok {...iconProps} className="w-4 h-4 text-blue-500" />;
    case "PaddleOCR": return <FaProjectDiagram {...iconProps} className="w-4 h-4 text-blue-300" />;
    case "Transformers": return <FaRobot {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "CNNs": return <FaProjectDiagram {...iconProps} className="w-4 h-4 text-emerald-400" />;
    case "RNNs": return <FaNetworkWired {...iconProps} className="w-4 h-4 text-emerald-500" />;
    case "LSTMs": return <FaNetworkWired {...iconProps} className="w-4 h-4 text-teal-400" />;
    case "ANNs": return <FaBrain {...iconProps} className="w-4 h-4 text-pink-400" />;
    case "Word2Vec": return <FaProjectDiagram {...iconProps} className="w-4 h-4 text-purple-400" />;
    case "Gensim": return <FaCogs {...iconProps} className="w-4 h-4 text-gray-400" />;
    case "Next.js": return <SiNextdotjs {...iconProps} className="w-4 h-4 text-white" />;
    case "React.js": return <SiReact {...iconProps} className="w-4 h-4 text-cyan-400" />;
    case "Tailwind CSS": return <SiTailwindcss {...iconProps} className="w-4 h-4 text-cyan-300" />;
    case "HTML5": return <SiHtml5 {...iconProps} className="w-4 h-4 text-orange-500" />;
    case "CSS3": return <SiCss {...iconProps} className="w-4 h-4 text-blue-500" />;
    case "Node.js": return <SiNodedotjs {...iconProps} className="w-4 h-4 text-green-500" />;
    case "Express.js": return <SiExpress {...iconProps} className="w-4 h-4 text-gray-300" />;
    case "REST APIs": return <TbApi {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "MongoDB": return <SiMongodb {...iconProps} className="w-4 h-4 text-green-500" />;
    case "MySQL": return <SiMysql {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "PostgreSQL": return <SiPostgresql {...iconProps} className="w-4 h-4 text-blue-300" />;
    case "Supabase": return <SiSupabase {...iconProps} className="w-4 h-4 text-emerald-400" />;
    case "Docker": return <SiDocker {...iconProps} className="w-4 h-4 text-sky-400" />;
    case "Git": return <SiGit {...iconProps} className="w-4 h-4 text-orange-500" />;
    case "GitHub": return <SiGithub {...iconProps} className="w-4 h-4 text-white" />;
    case "Postman": return <SiPostman {...iconProps} className="w-4 h-4 text-orange-400" />;
    case "VS Code": return <VscVscode {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "Linux (Ubuntu)": return <SiUbuntu {...iconProps} className="w-4 h-4 text-orange-500" />;
    case "WSL": return <FaServer {...iconProps} className="w-4 h-4 text-blue-300" />;
    case "Figma": return <SiFigma {...iconProps} className="w-4 h-4 text-pink-400" />;
    case "Canva": return <SiCanva {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "Draw.io": return <FaProjectDiagram {...iconProps} className="w-4 h-4 text-orange-500" />;
    case "UML Diagrams": return <FaProjectDiagram {...iconProps} className="w-4 h-4 text-gray-400" />;
    case "Claude Code": return <FaRobot {...iconProps} className="w-4 h-4 text-orange-300" />;
    case "OpenAI APIs": return <TbBrandOpenai {...iconProps} className="w-4 h-4 text-emerald-400" />;
    case "Gemini APIs": return <FaBrain {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "Operating Systems": return <FaServer {...iconProps} className="w-4 h-4 text-gray-400" />;
    case "DBMS": return <TbDatabase {...iconProps} className="w-4 h-4 text-blue-300" />;
    case "OOP": return <Code {...iconProps} className="w-4 h-4 text-cyan-400" />;
    case "Computer Networks": return <FaNetworkWired {...iconProps} className="w-4 h-4 text-green-400" />;
    case "DSA": return <FaProjectDiagram {...iconProps} className="w-4 h-4 text-yellow-400" />;
    default: return <Code {...iconProps} className="w-4 h-4 text-cyan-500" />;
  }
};

const FEATURED_STACK = [
  {
    name: "Python",
    role: "Core Language & AI Backend",
    desc: "Robust architecture, data structures, and machine learning pipelines",
    badge: "Primary Language",
    color: "from-blue-500/20 to-yellow-500/10 border-blue-500/40 text-blue-300",
  },
  {
    name: "FastAPI",
    role: "High-Speed Async APIs",
    desc: "Asynchronous microservices, OpenAPI/Swagger docs, and sub-millisecond endpoints",
    badge: "Backend Specialist",
    color: "from-teal-500/20 to-emerald-500/10 border-teal-500/40 text-teal-300",
  },
  {
    name: "Flask",
    role: "Lightweight AI Inference",
    desc: "Model serving, RESTful image processing, and rapid production endpoints",
    badge: "AI Deployment",
    color: "from-emerald-500/20 to-cyan-500/10 border-emerald-500/40 text-emerald-300",
  },
  {
    name: "C++",
    role: "Low-Latency & GPU Systems",
    desc: "PTX ISA GPU static analysis, compiler concepts, and high-frequency algorithms",
    badge: "Systems & DSA",
    color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/40 text-indigo-300",
  },
  {
    name: "PyTorch",
    role: "Deep Learning & Vision",
    desc: "Custom neural networks, transfer learning, YOLOv8, and computer vision",
    badge: "AI / ML Core",
    color: "from-orange-500/20 to-red-500/10 border-orange-500/40 text-orange-300",
  },
  {
    name: "Next.js",
    role: "Full-Stack & SSR",
    desc: "React 19, TypeScript, server components, and responsive performance",
    badge: "Frontend & Fullstack",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300",
  },
];

interface SkillCategoryProps {
  title: string;
  skills: string[];
  index: number;
  searchQuery: string;
}

function SkillCategory({ title, skills, index, searchQuery }: SkillCategoryProps) {
  const filteredSkills = skills.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredSkills.length === 0 && searchQuery) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      viewport={{ once: true }}
      className="glass p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
            {title}
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/20 text-cyan-400">
            {filteredSkills.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredSkills.map((skill) => {
            const isHighlight =
              skill === "Python" || skill === "FastAPI" || skill === "Flask";
            return (
              <div
                key={skill}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-default ${
                  isHighlight
                    ? "bg-gradient-to-r from-teal-950/80 to-cyan-950/80 border border-teal-400/60 text-teal-200 shadow-[0_0_10px_rgba(20,184,166,0.2)]"
                    : "bg-slate-900/80 hover:bg-cyan-950/60 border border-cyan-500/20 hover:border-cyan-400/50 text-cyan-100"
                }`}
              >
                <SkillIcon name={skill} />
                <span>{skill}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const skillCategories = useMemo(
    () => [
      { id: "backend", title: "Backend & Cloud Services", skills: SKILLS.backend },
      { id: "aiml", title: "AI/ML & Computer Vision", skills: SKILLS.aiml },
      { id: "deeplearning", title: "Deep Learning & NLP", skills: SKILLS.deeplearning },
      { id: "languages", title: "Programming Languages", skills: SKILLS.languages },
      { id: "frontend", title: "Frontend Architecture", skills: SKILLS.frontend },
      { id: "tools", title: "Developer Tools & DevOps", skills: SKILLS.tools },
      { id: "fundamentals", title: "CS Core Fundamentals", skills: SKILLS.fundamentals },
      { id: "ai", title: "AI-Assisted Development", skills: SKILLS.ai },
      { id: "design", title: "System Design & Prototyping", skills: SKILLS.design },
    ],
    []
  );

  const filterTabs = [
    { label: "All Skills", value: "All" },
    { label: "Backend & Python", value: "backend" },
    { label: "AI & Machine Learning", value: "aiml" },
    { label: "Languages & Core", value: "languages" },
    { label: "Frontend", value: "frontend" },
    { label: "Tools & DevOps", value: "tools" },
  ];

  const displayedCategories = useMemo(() => {
    if (activeTab === "All") return skillCategories;
    if (activeTab === "backend") {
      return skillCategories.filter((c) => c.id === "backend" || c.id === "languages");
    }
    if (activeTab === "aiml") {
      return skillCategories.filter((c) => c.id === "aiml" || c.id === "deeplearning" || c.id === "ai");
    }
    if (activeTab === "languages") {
      return skillCategories.filter((c) => c.id === "languages" || c.id === "fundamentals");
    }
    if (activeTab === "frontend") {
      return skillCategories.filter((c) => c.id === "frontend");
    }
    if (activeTab === "tools") {
      return skillCategories.filter((c) => c.id === "tools" || c.id === "design");
    }
    return skillCategories;
  }, [activeTab, skillCategories]);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Recruiter Focus: Technical Competencies
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Skills & Technical Mastery
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            From high-throughput Python backends (FastAPI, Flask) and deep learning models to systems-level C++ algorithms and full-stack Next.js web applications.
          </p>
        </div>

        {/* Recruiter Spotlight: Core Stack Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Core Competencies for SWE / AI Engineer Roles
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_STACK.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                viewport={{ once: true }}
                className={`p-4 rounded-xl border bg-gradient-to-br ${item.color} backdrop-blur-md hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <SkillIcon name={item.name} />
                    <span className="font-bold text-white text-base">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs font-medium text-cyan-200 mb-1">{item.role}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 glass p-3 rounded-2xl border border-cyan-500/30">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/30"
                    : "bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. FastAPI)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950/70 border border-cyan-500/30 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedCategories.map((category, index) => (
              <SkillCategory
                key={category.id}
                title={category.title}
                skills={category.skills}
                index={index}
                searchQuery={searchQuery}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
