"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code,
  Code2,
  Zap,
  BookOpen,
  Mail,
  LineChart,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SOCIAL_PROFILES } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-8 h-8" />,
  code2: <Code2 className="w-8 h-8" />,
  zap: <Zap className="w-8 h-8" />,
  book: <BookOpen className="w-8 h-8" />,
  linkedin: <FaLinkedin className="w-8 h-8" />,
  github: <FaGithub className="w-8 h-8" />,
  codolio: <LineChart className="w-8 h-8" />,
};

export default function ProfileLinks() {
  return (
    <section id="links" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Connect & Explore
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Find me on various platforms and check out my competitive programming
            profiles
          </p>
        </div>

        {/* Profile Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIAL_PROFILES.map((profile, index) => (
            <motion.a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group glass p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${profile.color} text-white group-hover:scale-110 transition-transform`}
              >
                {iconMap[profile.icon] || <Code className="w-8 h-8" />}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-cyan-300 group-hover:text-cyan-200 mb-1 transition-colors">
                {profile.name}
              </h3>
              <p className="text-sm text-slate-400 mb-4 group-hover:text-slate-300 transition-colors">
                {profile.stats}
              </p>

              {/* Arrow indicator */}
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
                Visit Profile
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 glass p-8 rounded-lg border border-cyan-500/30 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-cyan-300 mb-4">
            Let&apos;s Collaborate
          </h3>
          <p className="text-slate-400 mb-6">
            Interested in working together or have a project in mind? I&apos;d love to
            hear from you!
          </p>
          <a
            href="mailto:gautam@example.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
