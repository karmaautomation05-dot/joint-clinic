import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "Bytespider",
          "CCBot",
          "Meta-ExternalAgent",
          "Amazonbot",
          "DuckAssistBot",
          "cohere-ai",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://jointclinic.in/sitemap.xml",
    host: "https://jointclinic.in",
  };
}
