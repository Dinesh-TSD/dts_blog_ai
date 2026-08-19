export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type ArticleContent = {
  tableOfContents?: { id: string; title: string; level: number; }[];
  author: string;
  authorRole: string;
  tags: string[];
  sections: ArticleSection[];
};

export const articleContents: Record<string, ArticleContent> = {
  "ai-tools-that-save-hours": {
    author: "Dinesh T.",
    authorRole: "AI Content Lead",
    tags: ["AI Tools", "Productivity", "Automation"],
    sections: [
      {
        paragraphs: [
          "AI tools have moved from experimental toys to everyday productivity essentials. Whether you're writing content, debugging code, or researching a new topic, the right AI tool can save you hours every single week.",
          "In this guide, we break down 10 practical AI tools that developers, writers, and creators are using right now—with honest notes on what each one does best.",
        ],
      },
      {
        heading: "1. ChatGPT — Your All-Purpose Assistant",
        paragraphs: [
          "ChatGPT remains the most versatile AI tool for brainstorming, drafting, summarizing, and explaining complex topics. Use it to outline blog posts, debug logic errors, or learn new concepts fast.",
        ],
        list: [
          "Best for: writing, research, general Q&A",
          "Free tier available with GPT-4o mini",
          "Pro tip: give it a role and context for better outputs",
        ],
      },
      {
        heading: "2. GitHub Copilot — AI Pair Programming",
        paragraphs: [
          "Copilot integrates directly into VS Code and other IDEs, suggesting code completions, functions, and even entire blocks based on your comments and existing codebase.",
        ],
        list: [
          "Best for: daily coding workflows",
          "Supports dozens of languages",
          "Works with your existing project context",
        ],
      },
      {
        heading: "3. Cursor — The AI-First Code Editor",
        paragraphs: [
          "Cursor takes AI-assisted development further with chat-based editing, multi-file changes, and deep codebase understanding. It's become a favorite among Next.js and React developers.",
        ],
      },
      {
        heading: "Putting It All Together",
        paragraphs: [
          "The key isn't using every AI tool available—it's picking 2–3 that fit your workflow and mastering them. Start with one writing tool and one coding tool, then expand as you discover gaps.",
          "We'll keep updating this list as new tools emerge. Bookmark this page and check back monthly for the latest picks.",
        ],
      },
    ],
  },
  "build-modern-website-from-scratch": {
    author: "Alex M.",
    authorRole: "Web Dev Writer",
    tags: ["Web Development", "HTML", "Next.js"],
    sections: [
      {
        paragraphs: [
          "Building a modern website doesn't require a computer science degree—but it does require knowing which tools to use and in what order. This guide walks you through the full process from idea to deployed site.",
        ],
      },
      {
        heading: "Step 1: Plan Your Site Structure",
        paragraphs: [
          "Before writing any code, map out your pages, navigation, and content sections. A simple sitemap saves hours of rework later.",
        ],
        list: [
          "Home page with hero and featured content",
          "About, Contact, and Blog pages",
          "Clear navigation and footer links",
        ],
      },
      {
        heading: "Step 2: Choose Your Tech Stack",
        paragraphs: [
          "For most projects in 2026, we recommend Next.js with Tailwind CSS. Next.js handles routing, SEO, and performance out of the box. Tailwind makes styling fast and consistent.",
        ],
      },
      {
        heading: "Step 3: Build, Test, and Deploy",
        paragraphs: [
          "Build your components page by page, test on mobile and desktop, then deploy to Vercel with a single git push. The entire process from zero to live can take a weekend for a simple site.",
        ],
      },
    ],
  },
  "best-developer-tools-2026": {
    author: "Sarah K.",
    authorRole: "Developer Tools Editor",
    tags: ["Developer Tools", "VS Code", "Productivity"],
    sections: [
      {
        paragraphs: [
          "The developer tooling landscape evolves fast. Extensions get deprecated, new editors launch, and AI assistants change how we write code entirely. Here are the tools worth your time in 2026.",
        ],
      },
      {
        heading: "Code Editors & IDEs",
        paragraphs: [
          "VS Code remains the most popular editor, but Cursor and Zed are gaining serious traction among developers who want AI deeply integrated into their workflow.",
        ],
        list: ["VS Code — extensible, huge ecosystem", "Cursor — AI-native editing", "Zed — blazing fast, collaborative"],
      },
      {
        heading: "Debugging & Testing",
        paragraphs: [
          "Good tooling around testing and debugging pays for itself quickly. Vitest, Playwright, and React DevTools should be in every modern frontend developer's toolkit.",
        ],
      },
    ],
  },
  "ai-coding-tools-changing-development": {
    author: "Dinesh T.",
    authorRole: "AI Content Lead",
    tags: ["AI", "Software Development", "Future of Work"],
    sections: [
      {
        paragraphs: [
          "AI coding assistants aren't replacing developers—they're changing what developers spend their time on. Less boilerplate, more architecture, review, and creative problem-solving.",
        ],
      },
      {
        heading: "How Teams Are Adopting AI Coding Tools",
        paragraphs: [
          "Engineering teams are integrating AI at three levels: inline completions, chat-based debugging, and autonomous agents that handle multi-step tasks like migrations and test generation.",
        ],
      },
      {
        heading: "What Developers Should Focus On Now",
        paragraphs: [
          "As AI handles more routine coding, the skills that matter most are system design, code review, security awareness, and knowing when AI output is wrong.",
        ],
      },
    ],
  },
  "free-tools-for-web-developers": {
    author: "Alex M.",
    authorRole: "Web Dev Writer",
    tags: ["Free Tools", "Web Development", "Resources"],
    sections: [
      {
        paragraphs: [
          "You don't need expensive subscriptions to build professional web projects. These free tools cover design, development, deployment, and debugging.",
        ],
      },
      {
        heading: "Design & Prototyping",
        paragraphs: ["Figma's free tier is enough for most solo projects. Excalidraw is perfect for quick architecture diagrams and wireframes."],
        list: ["Figma — UI design", "Excalidraw — diagrams", "Coolors — color palettes"],
      },
      {
        heading: "Development & Deployment",
        paragraphs: [
          "GitHub, Vercel, and Netlify all offer generous free tiers that cover personal projects and small apps completely.",
        ],
      },
    ],
  },
  "generative-ai-guide-for-beginners": {
    author: "Sarah K.",
    authorRole: "AI Content Lead",
    tags: ["Generative AI", "Beginners", "AI Basics"],
    sections: [
      {
        paragraphs: [
          "Generative AI creates new content—text, images, code, audio—based on patterns learned from vast amounts of data. If you've used ChatGPT or seen AI-generated images, you've already experienced it.",
        ],
      },
      {
        heading: "How Does Generative AI Work?",
        paragraphs: [
          "At a high level, generative AI models predict the most likely next token (word, pixel, etc.) given everything that came before. Training on billions of examples gives them broad knowledge and reasoning ability.",
        ],
      },
      {
        heading: "Practical Uses Today",
        paragraphs: [
          "Writing assistance, code generation, image creation, summarization, translation, and data analysis are all mainstream uses. The best results come when you treat AI as a collaborator, not an oracle.",
        ],
        list: [
          "Draft and edit written content",
          "Generate and explain code",
          "Create marketing visuals",
          "Summarize long documents",
        ],
      },
    ],
  },
};

export function getArticleContent(slug: string): ArticleContent | null {
  return articleContents[slug] ?? null;
}
