"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Copy,
  Check,
  Award,
  GraduationCap,
  Code2,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { LINKS, RECRUITER_HIGHLIGHTS, EDUCATION } from "@/lib/constants";

// Helper to generate Google Drive preview and download links from any drive file URL
function parseDriveUrl(rawUrl: string) {
  const match =
    rawUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    rawUrl.match(/id=([a-zA-Z0-9_-]+)/);
  const fileId = match ? match[1] : null;

  if (!fileId) {
    return {
      fileId: null,
      previewUrl: rawUrl,
      downloadUrl: rawUrl,
      viewUrl: rawUrl,
    };
  }

  return {
    fileId,
    previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
    viewUrl: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
  };
}

export default function Resume() {
  const [showPreview, setShowPreview] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const resumeUrl = LINKS.resume || "";
  const hasResume = Boolean(resumeUrl && resumeUrl.trim() !== "");
  const { previewUrl, downloadUrl, viewUrl } = parseDriveUrl(resumeUrl);

  const handleCopyEmail = () => {
    if (LINKS.email) {
      navigator.clipboard.writeText(LINKS.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section id="resume" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {RECRUITER_HIGHLIGHTS.status}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Resume & Recruiter Overview
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Verified academic credentials, algorithmic problem-solving track record, and production-grade engineering experience.
          </p>
        </div>

        {/* Action Controls Toolbar */}
        <div className="glass p-4 sm:p-6 rounded-2xl border border-cyan-500/30 mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Official Curriculum Vitae (CV)
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-blue-900/60 text-cyan-300 border border-cyan-500/30">
                  PDF
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                DTU Software Engineering • Python, FastAPI, Flask, C++, PyTorch, Next.js
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wide hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>

            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-semibold text-xs hover:border-cyan-400 transition-all active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              Open Drive
            </a>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-all active:scale-95"
              title={showPreview ? "Hide PDF Preview" : "Show PDF Preview"}
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4 text-slate-400" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Live Preview
                </>
              )}
            </button>

            {LINKS.email && (
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-300 text-xs transition-all"
                title="Copy recruiter contact email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Recruiter Quick Fact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-5 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-3">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-cyan-300 mb-1">
              {EDUCATION.cgpa} <span className="text-xs font-normal text-slate-400">/ 10</span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              DTU Academic Record
            </h4>
            <p className="text-xs text-slate-400">
              B.Tech Software Engineering ({EDUCATION.year})
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-5 rounded-xl border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-400/30 flex items-center justify-center text-teal-300 mb-3">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-teal-300 mb-1">Python & C++</div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Core Engineering Stack
            </h4>
            <p className="text-xs text-slate-400">
              FastAPI, Flask, Next.js, PyTorch & Systems
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-5 rounded-xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-300 mb-3">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-blue-300 mb-1">500+ Solved</div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Algorithmic Problem Solving
            </h4>
            <p className="text-xs text-slate-400">
              LeetCode, Codeforces, CodeChef, Codolio
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass p-5 rounded-xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-emerald-300 mb-1">Intern / Full-Time</div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Target Career Roles
            </h4>
            <p className="text-xs text-slate-400">
              SDE, Backend Engineer, AI/ML Engineer
            </p>
          </motion.div>
        </div>

        {/* Live Resume Preview Container */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl border border-cyan-500/40 overflow-hidden shadow-2xl shadow-cyan-950/50"
          >
            {/* Viewer Header Bar */}
            <div className="bg-slate-900/90 border-b border-cyan-500/30 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs font-medium text-slate-300 ml-2">
                  Document Preview • Google Drive Embed
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Expand in Google Drive
                </a>
              </div>
            </div>

            {/* Embed Frame */}
            <div className="relative w-full h-[650px] sm:h-[800px] bg-slate-950 flex flex-col items-center justify-center">
              {hasResume ? (
                <iframe
                  src={previewUrl}
                  title="Gautam Kumar Resume Preview"
                  className="w-full h-full border-0"
                  allow="autoplay"
                />
              ) : (
                <div className="space-y-4 max-w-md p-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-200">Resume Link Not Configured</h4>
                  <p className="text-xs text-slate-400">
                    Provide your Google Drive resume link as <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">DRIVE_RESUME</code> in <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">.env.local</code>.
                  </p>
                </div>
              )}
            </div>

            {/* Viewer Footer */}
            <div className="bg-slate-900/90 border-t border-cyan-500/20 px-4 py-3 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <span>
                Having trouble previewing? You can also{" "}
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  view the file directly on Google Drive
                </a>{" "}
                or{" "}
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  download the PDF
                </a>
                .
              </span>
              <span className="text-slate-500">
                Source: <code className="text-cyan-400/80">DRIVE_RESUME</code> in environment
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
