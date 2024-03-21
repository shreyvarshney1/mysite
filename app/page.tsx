import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Header from "@/components/header";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <>    
      <script className="flex flex-col items-center px-4">
        <Intro />
        <SectionDivider />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </script>
      <noscript className="flex flex-col items-center px-4">
      <Header noscript />
      <main className="flex flex-col items-center px-4">
        <Intro noscript />
        <SectionDivider noscript />
        <About noscript />
        <Projects noscript />
        <Skills noscript />
        <Experience noscript/>
        <Contact noscript />
      </main>
      </noscript>
    </>
  );
}
