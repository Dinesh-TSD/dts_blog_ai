export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  categorySlug: string;
  date: string;
  readTime: string;
  readMinutes: number;
  popular: boolean;
  image: string;
  imageAlt: string;
};

export const categoryOptions = [
  { slug: "all", label: "All Categories" },
  { slug: "ai", label: "AI & Machine Learning" },
  { slug: "web", label: "Web Development" },
  { slug: "tools", label: "Developer Tools" },
];

export const filterTabs = [
  { id: "all", label: "All" },
  { id: "latest", label: "Latest" },
  { id: "popular", label: "Popular" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web Dev" },
  { id: "tools", label: "Tools" },
];

export const articles: Article[] = [
  {
    slug: "ai-tools-that-save-hours",
    title: "10 AI Tools That Can Save You Hours Every Week",
    excerpt:
      "From writing and research to coding and automation, discover practical AI tools that help you work smarter, not harder.",
    category: "AI TOOLS",
    categoryColor: "#2563eb",
    categorySlug: "ai",
    date: "Jul 28, 2026",
    readTime: "8 min read",
    readMinutes: 8,
    popular: true,
    image:
      "https://www.figma.com/api/mcp/asset/a5e49b01-92e9-4de6-a15d-f70d8d594cbe.png",
    imageAlt: "AI Tools",
  },
  {
    slug: "build-modern-website-from-scratch",
    title: "How to Build a Modern Website From Scratch",
    excerpt:
      "A beginner-friendly look at the essential technologies, tools, and steps you need to launch a polished site today.",
    category: "WEB DEVELOPMENT",
    categoryColor: "#9333ea",
    categorySlug: "web",
    date: "Jul 27, 2026",
    readTime: "10 min read",
    readMinutes: 10,
    popular: true,
    image:
      "https://www.figma.com/api/mcp/asset/f93eda2e-a012-476d-a63b-90bd8b74c16b.png",
    imageAlt: "Web Development",
  },
  {
    slug: "best-developer-tools-2026",
    title: "Best Developer Tools for Faster Coding in 2026",
    excerpt:
      "Explore the tools developers are using to write better code, debug faster, and ship features with confidence.",
    category: "DEVELOPER TOOLS",
    categoryColor: "#4f46e5",
    categorySlug: "tools",
    date: "Jul 26, 2026",
    readTime: "7 min read",
    readMinutes: 7,
    popular: true,
    image:
      "https://www.figma.com/api/mcp/asset/1598bfc7-929a-46ea-8ea3-24b48cb8ae66.png",
    imageAlt: "Developer Tools",
  },
  {
    slug: "ai-coding-tools-changing-development",
    title: "How AI Coding Tools Are Changing Software Development",
    excerpt:
      "See how AI assistants are reshaping workflows, code reviews, and the way teams build software at scale.",
    category: "ARTIFICIAL INTELLIGENCE",
    categoryColor: "#2563eb",
    categorySlug: "ai",
    date: "Jul 25, 2026",
    readTime: "9 min read",
    readMinutes: 9,
    popular: false,
    image:
      "https://www.figma.com/api/mcp/asset/768e86ad-b702-4d0a-ae6b-5774779cc3f3.png",
    imageAlt: "JavaScript",
  },
  {
    slug: "free-tools-for-web-developers",
    title: "The Best Free Tools Every Web Developer Should Know",
    excerpt:
      "A curated list of free apps, extensions, and services that make everyday development work easier.",
    category: "WEB DEVELOPMENT",
    categoryColor: "#9333ea",
    categorySlug: "web",
    date: "Jul 24, 2026",
    readTime: "6 min read",
    readMinutes: 6,
    popular: false,
    image:
      "https://www.figma.com/api/mcp/asset/50ff4793-8f1e-4f28-8b06-189ea5d73c2c.png",
    imageAlt: "VS Code",
  },
  {
    slug: "generative-ai-guide-for-beginners",
    title: "What Is Generative AI? A Simple Guide for Beginners",
    excerpt:
      "Understand generative AI in plain language—what it is, how it works, and where it fits into modern products.",
    category: "AI",
    categoryColor: "#2563eb",
    categorySlug: "ai",
    date: "Jul 23, 2026",
    readTime: "5 min read",
    readMinutes: 5,
    popular: true,
    image:
      "https://www.figma.com/api/mcp/asset/0439b866-6790-4f4c-a57f-80cf1c703879.png",
    imageAlt: "Python",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  const sameCategory = articles.filter(
    (article) => article.slug !== slug && article.categorySlug === current.categorySlug,
  );
  const others = articles.filter(
    (article) => article.slug !== slug && article.categorySlug !== current.categorySlug,
  );

  return [...sameCategory, ...others].slice(0, limit);
}
