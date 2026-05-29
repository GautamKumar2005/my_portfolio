import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import ProfileLinks from "@/components/ProfileLinks";
import Footer from "@/components/Footer";

import Background3D from "@/components/Background3D";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <Background3D />
      <div className="relative z-10">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <ProfileLinks />
      </main>
      <Footer />
      </div>
    </div>
  );
}
