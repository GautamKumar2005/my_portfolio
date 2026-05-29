"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ArrowRight, Code, Mail } from "lucide-react";
import { PROFILE, LINKS } from "@/lib/constants";

const ParticleField = dynamic(() => import("./3d/ParticleField"), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-slate-900 rounded-lg" />,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background 3D Particle Field */}
      <div className="absolute inset-0 opacity-50">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950" />}>
          <ParticleField />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeInUp space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
              Welcome to my portfolio
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              <span className="gradient-text">{PROFILE.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-cyan-300 font-light">
              {PROFILE.title}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {PROFILE.description}
          </p>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-400">
            {PROFILE.subtitle} • Passionate about building scalable systems
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a
              href="#projects"
              className="group glass px-8 py-3 rounded-lg font-semibold text-white hover:bg-cyan-500/20 border border-cyan-400/50 hover:border-cyan-400 flex items-center justify-center gap-2"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-8 py-3 rounded-lg font-semibold text-white hover:bg-blue-500/20 border border-blue-400/50 hover:border-blue-400 flex items-center justify-center gap-2"
            >
              <Code className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-cyan-400"
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
          </div>
        </div>
      </div>
    </section>
  );
}
