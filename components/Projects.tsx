"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, Star, ChevronDown, ChevronUp } from "lucide-react";
import { fetchGitHubProjects, GitHubRepo } from "@/lib/github";
import { PROJECT_OVERRIDES } from "@/lib/constants";
import { SkillIcon } from "@/components/Skills";

const ProjectCard = ({ project, index }: { project: GitHubRepo; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const override = PROJECT_OVERRIDES[project.name];
  const displayHomepage = override?.homepage || project.homepage;

  // Determine tech stack to show
  const techStack = override?.techStack || project.topics.slice(0, 5) || [];
  
  // Determine descriptions
  const descriptionLines = override?.description || [project.description || "No description available for this project."];
  const shortDescription = descriptionLines[0];
  const hasMoreDetails = descriptionLines.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group glass p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 hover:bg-cyan-500/5 transition-all duration-300 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
              {project.name}
            </h3>
            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold border border-slate-600 text-slate-400 rounded-full">
              Public
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Updated {(() => {
              const d = new Date(project.updated_at);
              return `${d.getDate().toString().padStart(2, '0')}-${d.toLocaleString('en-US', { month: 'long' })}-${d.getFullYear()}`;
            })()}
          </p>
        </div>
        <div className="flex items-center gap-1 ml-4">
          {project.stargazers_count > 0 && (
            <div className="flex items-center gap-1 text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-current" />
              <span>{project.stargazers_count}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {project.language && !override?.techStack && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-900/40 border border-cyan-500/20 text-cyan-100 text-xs font-medium rounded-full mr-2">
            <SkillIcon name={project.language} />
            <span>{project.language}</span>
          </div>
        )}
        {techStack.map((tech) => (
          <div
            key={tech}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-900/40 border border-cyan-500/20 text-cyan-100 text-xs font-medium rounded-full"
          >
            <SkillIcon name={tech} />
            <span>{tech}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="text-slate-300 text-sm mb-4 flex-grow">
        <p className="leading-relaxed">{shortDescription}</p>
        
        <AnimatePresence>
          {expanded && hasMoreDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                {descriptionLines.slice(1).map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {hasMoreDetails && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-cyan-400 text-xs font-semibold mt-3 hover:text-cyan-300 transition-colors focus:outline-none"
          >
            {expanded ? "Show Less" : "More Details"}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-4 border-t border-cyan-500/20 mt-auto">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 text-sm font-medium transition-colors"
        >
          <Code className="w-4 h-4" />
          Repository
        </a>
        {displayHomepage && (
          <a
            href={displayHomepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchGitHubProjects();
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass p-6 rounded-lg border border-cyan-500/20 animate-pulse"
              >
                <div className="h-6 bg-slate-700 rounded w-1/2 mb-4" />
                <div className="h-4 bg-slate-700 rounded w-full mb-2" />
                <div className="h-4 bg-slate-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Latest projects from my GitHub showcasing diverse technologies and
            problem-solving approaches
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="glass p-12 rounded-lg border border-cyan-500/20 text-center">
            <p className="text-slate-400">
              Unable to load projects. Check{" "}
              <a
                href="https://github.com/GautamKumar2005"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                GitHub profile
              </a>
              {" "}directly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
