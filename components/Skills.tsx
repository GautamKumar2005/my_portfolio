"use client";

import { SKILLS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { 
  SiC, SiCplusplus, SiTypescript, SiJavascript, SiPython, SiMysql, SiPostgresql, SiSupabase, 
  SiPytorch, SiTensorflow, SiKeras, SiScikitlearn, SiOpencv,
  SiNextdotjs, SiReact, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb,
  SiGit, SiGithub, SiPostman, SiUbuntu, SiFigma, SiCanva,
  SiStreamlit, SiFlask, SiNgrok
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaBrain, FaRobot, FaNetworkWired, FaProjectDiagram, FaServer, FaCogs } from "react-icons/fa";
import { TbApi, TbBrandOpenai, TbDatabase } from "react-icons/tb";

export const SkillIcon = ({ name }: { name: string }) => {
  const iconProps = { className: "w-4 h-4 flex-shrink-0" };
  switch (name) {
    case "C": return <SiC {...iconProps} className="w-4 h-4 text-blue-500" />;
    case "C++": return <SiCplusplus {...iconProps} className="w-4 h-4 text-blue-600" />;
    case "TypeScript": return <SiTypescript {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "JavaScript (ES6+)": return <SiJavascript {...iconProps} className="w-4 h-4 text-yellow-400" />;
    case "Python": return <SiPython {...iconProps} className="w-4 h-4 text-blue-500" />;
    case "SQL": return <TbDatabase {...iconProps} className="w-4 h-4 text-gray-400" />;
    case "PyTorch": return <SiPytorch {...iconProps} className="w-4 h-4 text-orange-500" />;
    case "TensorFlow": return <SiTensorflow {...iconProps} className="w-4 h-4 text-orange-400" />;
    case "Keras": return <SiKeras {...iconProps} className="w-4 h-4 text-red-500" />;
    case "Scikit-learn": return <SiScikitlearn {...iconProps} className="w-4 h-4 text-orange-400" />;
    case "OpenCV": return <SiOpencv {...iconProps} className="w-4 h-4 text-green-500" />;
    case "YOLO":
    case "YOLOv8": return <FaBrain {...iconProps} className="w-4 h-4 text-cyan-400" />;
    case "Streamlit": return <SiStreamlit {...iconProps} className="w-4 h-4 text-red-400" />;
    case "Flask": return <SiFlask {...iconProps} className="w-4 h-4 text-white" />;
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

interface SkillCategoryProps {
  title: string;
  skills: string[];
  index: number;
}

function SkillCategory({ title, skills, index }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 group"
    >
      <h3 className="text-xl font-bold text-cyan-300 mb-5 group-hover:text-cyan-200 transition-colors">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-900/40 hover:bg-cyan-900/60 border border-cyan-500/20 hover:border-cyan-400/50 text-cyan-100 text-sm font-medium rounded-full transition-all duration-300 cursor-default"
          >
            <SkillIcon name={skill} />
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const skillCategories = [
    { title: "Languages", skills: SKILLS.languages },
    { title: "AI/ML & Computer Vision", skills: SKILLS.aiml },
    { title: "Deep Learning", skills: SKILLS.deeplearning },
    { title: "Frontend", skills: SKILLS.frontend },
    { title: "Backend & Databases", skills: SKILLS.backend },
    { title: "Developer Tools", skills: SKILLS.tools },
    { title: "Design & Prototyping", skills: SKILLS.design },
    { title: "AI-Assisted Development", skills: SKILLS.ai },
    { title: "CS Fundamentals", skills: SKILLS.fundamentals },
  ];

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive set of tools and technologies I've mastered across
            multiple domains
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
