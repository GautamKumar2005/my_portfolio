"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ArrowRight, Code, FileText, Sparkles, GraduationCap, Terminal, Trophy } from "lucide-react";
import { PROFILE, LINKS, EDUCATION } from "@/lib/constants";

const ParticleField = dynamic(() => import("./3d/ParticleField"), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-slate-900 rounded-lg" />,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background 3D Particle Field */}
      <div className="absolute inset-0 opacity-50">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950" />}>
          <ParticleField />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeInUp space-y-6">
          {/* Recruiter Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to Summer 2026 / 2027 SWE & AI Engineering Roles
          </div>

          {/* Title */}
          <div className="space-y-3">
            <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Software Developer & AI Engineer
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="gradient-text drop-shadow-[0_0_20px_rgba(0,212,255,0.35)]">
                {PROFILE.name}
              </span>
            </h1>
            <p className="text-lg sm:text-2xl text-cyan-200/90 font-light max-w-3xl mx-auto">
              Architecting high-throughput Python backends, low-latency C++ systems, and modern AI pipelines.
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Final-year student at <span className="text-cyan-300 font-semibold">Delhi Technological University (DTU)</span> with a passion for building robust distributed systems, production APIs (FastAPI & Flask), and competitive programming.
          </p>

          {/* Recruiter Quick Highlights Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
            <div className="glass px-3.5 py-2 rounded-xl border border-cyan-500/30 flex items-center gap-2 text-left">
              <GraduationCap className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Education</p>
                <p className="text-xs font-bold text-slate-100">DTU B.Tech • CGPA {EDUCATION.cgpa}</p>
              </div>
            </div>

            <div className="glass px-3.5 py-2 rounded-xl border border-teal-500/30 flex items-center gap-2 text-left">
              <Terminal className="w-5 h-5 text-teal-400 flex-shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Primary Stack</p>
                <p className="text-xs font-bold text-slate-100">Python • FastAPI • C++</p>
              </div>
            </div>

            <div className="glass px-3.5 py-2 rounded-xl border border-blue-500/30 flex items-center gap-2 text-left">
              <Trophy className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">DSA & CP</p>
                <p className="text-xs font-bold text-slate-100">500+ Problems Solved</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-4 w-full max-w-lg mx-auto">
            {/* Direct Resume Button */}
            <a
              href="#resume"
              className="glass px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              View Resume & CV
            </a>

            <a
              href="#projects"
              className="glass px-6 py-3 rounded-xl font-semibold text-white hover:bg-cyan-500/20 border border-cyan-400/50 hover:border-cyan-400 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Featured Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-5 py-3 rounded-xl font-semibold text-slate-200 hover:bg-blue-500/20 border border-blue-400/40 hover:border-blue-400 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Code className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 animate-bounce">
            <a href="#skills" aria-label="Scroll to Skills">
              <svg
                className="w-5 h-5 mx-auto text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
