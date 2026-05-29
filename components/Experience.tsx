"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { EDUCATION } from "@/lib/constants";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Education & Competitive Programming
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Building expertise in Software Engineering and emerging technologies
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-4 top-8 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-4 border-slate-950" />

            {/* Content */}
            <div className="space-y-4">
              {/* Degree */}
              <div className="flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-cyan-300">
                    {EDUCATION.degree}
                  </h3>
                  <p className="text-slate-400 text-sm">{EDUCATION.school}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <a
                    href={EDUCATION.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    {EDUCATION.location}
                  </a>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-start gap-3 pt-2">
                <Calendar className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-300 font-medium">
                    Expected Graduation: <span className="text-cyan-300">{EDUCATION.year}</span>
                  </p>
                  <p className="text-slate-500 text-sm">Current Year: 3rd Year (2026)</p>
                  {EDUCATION.cgpa && (
                    <p className="text-slate-400 text-sm mt-1">
                      CGPA: <span className="text-cyan-300 font-medium">{EDUCATION.cgpa}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="pt-6 border-t border-cyan-500/20">
                <h4 className="text-sm font-semibold text-cyan-300 mb-3 uppercase tracking-wide">
                  Key Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Full-Stack Development",
                    "Artificial Intelligence",
                    "Data Structures",
                    "Cloud Computing",
                    "Competitive Programming",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-blue-900/50 text-cyan-200 text-xs rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Competitive Programming Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* LeetCode Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all text-center flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-4">LeetCode Profile</h3>
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src="https://leetcard.jacoblin.cool/GautamKumar_code?theme=dark&font=Inter&ext=heatmap"
                  alt="LeetCode Stats & Heatmap"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Codeforces Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all text-center flex flex-col items-center justify-center"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-4">Codeforces Profile</h3>
              <div className="w-full overflow-hidden rounded-lg flex justify-center">
                <img
                  src="https://codeforces-readme-stats.vercel.app/api/card?username=Galacti_&theme=dark"
                  alt="Codeforces Stats"
                  className="w-full h-auto object-cover max-w-md"
                />
              </div>
            </motion.div>
          </div>

          {/* Codolio Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 glass p-6 rounded-lg border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-fuchsia-400 mb-1">Codolio Unified Profile</h3>
              <p className="text-sm text-slate-400">View my aggregated competitive programming analytics</p>
            </div>
            <a
              href="https://codolio.com/profile/Gautam_coder2005"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-fuchsia-500/30 flex items-center gap-2"
            >
              View Codolio Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
