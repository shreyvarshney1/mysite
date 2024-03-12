import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap, LuSchool2 } from "react-icons/lu";
import sheetsyncImg from "@/public/sheetsync.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Education",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Schooling",
    location: "Delhi, India",
    description:
      "I passed by 10th and 12th from M.L. Khanna D.A.V. Public School, Dwarka. Here, I learned the basics of programming and web development. I also learned about the importance of teamwork and leadership.",
    icon: React.createElement(LuSchool2),
    date: "2019-2022",
  },
  {
    title: "Graduation",
    location: "Bhopal, India",
    description:
      "I graduated with a B.Tech in Computer Science from Vellore Institute of Technology, Bhopal. I learned about data structures, algorithms, and software engineering. I also learned about teamwork and leadership. I was also the head of the college's coding club.",
    icon: React.createElement(LuGraduationCap),
    date: "2022 - 2026",
  },
  // {
  //   title: "Full-Stack Developer",
  //   location: "Houston, TX",
  //   description:
  //     "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
  //   icon: React.createElement(FaReact),
  //   date: "2021 - present",
  // },
] as const;

export const projectsData = [
  {
    title: "SheetSync Cloud",
    description:
      "This project integrates Cloudflare Workers and Google Sheets API for authenticated automated insertion, by creating a JWT token via a service account's RSA key.",
    tags: ["Wrangler", "Google API", "Cloudflare Workers", "Javascript"],
    imageUrl: sheetsyncImg,
    link: "https://github.com/shreyvarshney1/sheetsync-cloud",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Redux",
  "C++",
  "Express",
  "PostgreSQL",
  "Python",
  "Java",
] as const;
