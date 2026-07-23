"use client";

import Container from "../common/Container";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";

export default function Skills() {
  return (
    <Section id="skills">
      <Container>
        <div className="mt-0">
          <LogoLoop
            logos={techLogos}
            speed={100}
            logoHeight={90}
            gap={48}
            fadeOut
            scaleOnHover
          />
        </div>
      </Container>
    </Section>
  );
}

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiReactquery,
  SiExpo,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiElasticsearch,
  SiDocker,
  SiGit,
  SiLinux,
  SiGithubactions,
} from "react-icons/si";
import LogoLoop from "../common/LogoLoop";

export const techLogos = [
  // Frontend
  {
    node: <SiReact className="text-sky-400" />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiNextdotjs className="text-black dark:text-white" />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiTypescript className="text-[#3178C6]" />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiJavascript className="text-[#F7DF1E]" />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/docs/Web/JavaScript",
  },
  {
    node: <SiTailwindcss className="text-[#38BDF8]" />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiRedux className="text-[#764ABC]" />,
    title: "Redux Toolkit",
    href: "https://redux-toolkit.js.org",
  },
  {
    node: <SiReactquery className="text-[#FF4154]" />,
    title: "React Query",
    href: "https://tanstack.com/query",
  },

  // Mobile
  {
    node: <SiReact className="text-sky-400" />,
    title: "React Native",
    href: "https://reactnative.dev",
  },
  {
    node: <SiExpo />,
    title: "Expo",
    href: "https://expo.dev",
  },

  // Backend
  {
    node: <SiNodedotjs className="text-[#5FA04E]" />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: <SiExpress className="text-black dark:text-white" />,
    title: "Express.js",
    href: "https://expressjs.com",
  },

  // Database
  {
    node: <SiMongodb className="text-[#47A248]" />,
    title: "MongoDB",
    href: "https://mongodb.com",
  },
  {
    node: <SiMongoose className="text-[#880000]" />,
    title: "Mongoose",
    href: "https://mongoosejs.com",
  },
  {
    node: <SiElasticsearch className="text-[#005571]" />,
    title: "Elasticsearch",
    href: "https://elastic.co",
  },

  // DevOps
  {
    node: <SiDocker className="text-[#2496ED]" />,
    title: "Docker",
    href: "https://docker.com",
  },
  {
    node: <SiGit className="text-[#F05032]" />,
    title: "Git",
    href: "https://git-scm.com",
  },
  {
    node: <SiLinux className="text-[#FCC624]" />,
    title: "Linux",
    href: "https://kernel.org",
  },
  {
    node: <SiGithubactions className="text-[#2088FF]" />,
    title: "GitHub Actions",
    href: "https://github.com/features/actions",
  },
];
