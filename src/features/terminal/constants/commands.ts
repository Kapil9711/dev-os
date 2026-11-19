import { DEV } from "@/constants/dev";
import type { TerminalFileMap } from "../types";

export const HELP_TEXT = `Available Commands

help           Show available commands
about          Open About window
experience     Open Experience window
resume         Open Resume window
skills         Show technical stack
whoami         Show developer information
pwd            Print current directory
ls             List available files
github         Open GitHub profile
linkedin       Open LinkedIn profile
email          Show email address
neofetch       Show system information
clear          Clear terminal`;

export const NEOFETCH_BANNER = `█████████████████████████████

OS           kapOS 3.0
Host         ${DEV.name}
Role         ${DEV.role}
Experience   ${DEV.experience}
Runtime      Node.js
Editor       VS Code
Shell        zsh
Frontend     React, Next.js
Backend      Node.js, Express
Database     MongoDB
Language     TypeScript

█████████████████████████████`;

export const TERMINAL_FILES: TerminalFileMap = {
  "about.md": `Hi, I'm ${DEV.name}.

I'm a Full Stack Software Engineer specializing in
Next.js, React Native, Node.js and TypeScript.`,

  "skills.md": DEV.stack.join("\n"),

  "resume.md": "Run the 'resume' command to open the resume window.",

  "experience.md": `${DEV.experience}
Full Stack Software Engineer`,
};
