import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import remarkMermaid from "@southball/remark-mermaid";
import compress from "astro-compress";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import wikiLinkPlugin from "remark-wiki-link-plus";

// https://astro.build/config
export default defineConfig({
  integrations: [
    metaTags(),
    icon({
      include: { "mdi": ["launch"], "material-symbols": ["*"] },
      iconDir: "src/assets/icons",
    }),
    compress({
      HTML: false,
      CSS: false,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    starlight({
      title: "SysLearn",
      description: "シス研として習得してほしいスキルを学ぶ蔵",
      defaultLocale: "ja",
      locales: {
        root: {
          label: "日本語",
          lang: "ja",
        },
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      logo: {
        src: "./src/assets/icons/logo/sym.svg",
      },
      social: {
        "github": "https://github.com/SystemEngineeringTeam/SysLearn",
        "x.com": "https://x.com/set_official",
        "instagram": "https://www.instagram.com/ait.sysken",
      },
      components: {
        Sidebar: "src/components/starlight/Sidebar.astro",
      },
      customCss: [
        "@fontsource-variable/inter",
        "@fontsource-variable/noto-sans-jp",
        "src/styles/global.css",
        "src/styles/fonts.css",
      ],
      sidebar: [
        {
          label: "ホーム",
          items: [
            {
              label: "はじめに",
              link: "/",
            },
            {
              label: "困ったときは",
              autogenerate: { directory: "help/" },
            },
          ],
        },
        {
          label: "C言語",
          items: [
            {
              label: "基礎コース",
              autogenerate: { directory: "textbook/c-lang/beginner" },
            },
          ],
        },
        {
          label: "Web",
          items: [
            {
              label: "授業ついていくもんコース",
              autogenerate: { directory: "textbook/web/for-classes" },
            },
            {
              label: "ハッカソン出れるもんコース",
              autogenerate: { directory: "textbook/web/web/for-hackathons" },
            },
          ],
        },
      ],
    }),
    react(),
  ],
  site: "https://learn.sysken.net",
  image: {
    remotePatterns: [{ protocol: "https" }, { protocol: "http" }],
  },
  markdown: {
    remarkPlugins: [
      [remarkMermaid, { themes: ["dark", "neutral"] }],
      [wikiLinkPlugin, { markdownFolder: "src/content/docs" }],
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
          content: { type: "text", value: " ↗" },
        },
      ],
    ],
  },
});
