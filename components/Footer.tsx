"use client";

import Link from "next/link";
import { Heart, ArrowUp } from "lucide-react";
import { LINKS, PROFILE } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyan-500/20 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold gradient-text">GK</h3>
            <p className="text-sm text-slate-400">{PROFILE.title}</p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-cyan-300 text-sm uppercase tracking-wide mb-3">
              Navigation
            </h4>
            <nav className="space-y-1">
              {[
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Experience", href: "#experience" },
                { label: "Links", href: "#links" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-cyan-300 text-sm uppercase tracking-wide mb-3">
              Connect
            </h4>
            <nav className="space-y-1">
              {[
                { label: "GitHub", href: LINKS.github },
                { label: "LinkedIn", href: LINKS.linkedin },
                { label: "LeetCode", href: LINKS.leetcode },
                { label: "CodeChef", href: LINKS.codechef },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="font-semibold text-cyan-300 text-sm uppercase tracking-wide mb-3">
              Get In Touch
            </h4>
            <a
              href="mailto:gautam@example.com"
              className="block text-sm text-slate-400 hover:text-cyan-300 transition-colors break-all"
            >
              gautam@example.com
            </a>
            <button
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-500/10 my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>
            © {currentYear} {PROFILE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            Made by
            <Heart className="w-4 h-4 text-cyan-400 fill-cyan-400" />
             Gautam Kumar
          </div>
        </div>
      </div>

      {/* Scroll-to-top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center border border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110 z-40 hidden lg:flex"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
