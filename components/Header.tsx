"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LINKS } from "@/lib/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Skills & Expertise", href: "/#skills" },
    { label: "Featured Projects", href: "/#projects" },
    { label: "Education & CP", href: "/#experience" },
    { label: "Practice", href: "/exercise" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="glass border-b border-cyan-500/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">
                GK
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#links"
                className="text-sm font-bold px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 hover:bg-cyan-500 hover:text-slate-900 text-cyan-300 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Let's Connect
              </a>
            </nav>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors duration-300"
                title="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors duration-300"
                title="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-cyan-500/20 rounded-lg relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-cyan-500/20"
              >
                <div className="pb-4">
                  <nav className="flex flex-col gap-2 pt-4 px-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <a
                      href="#links"
                      className="mx-4 mt-2 px-4 py-3 text-center text-sm font-bold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Let's Connect
                    </a>
                  </nav>
                  <div className="flex items-center gap-4 px-6 pt-4 border-t border-cyan-500/20 mt-4">
                    <a
                      href={LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 hover:bg-cyan-500/20 rounded-lg"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                    <a
                      href={LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 hover:bg-cyan-500/20 rounded-lg"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
