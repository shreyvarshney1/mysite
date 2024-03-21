"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About({noscript}: {noscript?: boolean}) {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={noscript?false:{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        A passionate{" "}
        <span className="font-medium">B.Tech</span>{" "}student, diving headfirst
        into the world of code. With{" "}
        <span className="font-medium">
          Python, C++, and Web Development skills
        </span>{" "}
        in my toolbox,{" "}
        <span className="italic">
          I'm on a mission to become a senior developer at a
        </span>{" "}
        <span className="underline">top-tier product company</span>. My Web
        Development skills include{" "}
        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB
        </span>
        . I am also familiar with TypeScript and Prisma. I am always looking to
        learn new technologies. I am currently looking for a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        video games, watching movies, and exploring{" "}
        <span className="italic">Geeky Stuff</span>. I also enjoy{" "}
        <span className="font-medium">learning new things</span>. I am currently
        learning about{" "}
        <span className="font-medium">
          Geopolitics and Artificial Intelligence
        </span>
        . I'm also learning how to play the guitar.
      </p>
    </motion.section>
  );
}
