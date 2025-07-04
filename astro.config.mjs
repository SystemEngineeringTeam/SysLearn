// @ts-check

import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
// @ts-ignore
import remarkMermaid from "@southball/remark-mermaid";
import compress from "astro-compress";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
// @ts-ignore
import wikiLinkPlugin from "remark-wiki-link-plus";
import starlightSidebarTopics from "starlight-sidebar-topics";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    metaTags(),
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
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/SystemEngineeringTeam/SysLearn" },
        { icon: "x.com", label: "X", href: "https://x.com/set_official" },
        { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/ait.sysken" },
      ],
      components: {
        Footer: "src/components/starlight/Footer.astro",
      },
      customCss: [
        "@fontsource-variable/inter",
        "@fontsource-variable/noto-sans-jp",
        "src/styles/global.css",
        "src/styles/fonts.css",
      ],
      plugins: [
        starlightSidebarTopics([
          {
            label: "ホーム",
            link: "/",
            icon: "rocket",
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
            link: "/textbook/c-lang/beginner/setup",
            icon: "document",
            items: [
              {
                label: "基礎コース",
                autogenerate: { directory: "textbook/c-lang/beginner" },
              },
            ],
          },
          {
            label: "Web",
            link: "/textbook/web/for-classes",
            icon: "document",
            items: [
              {
                label: "授業ついていくもんコース",
                autogenerate: { directory: "textbook/web/for-classes" },
              },
              {
                label: "ハッカソン出れるもんコース",
                autogenerate: { directory: "textbook/web/for-hackathons" },
              },
            ],
          },
        ]),
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
  vite: {
    plugins: [
      Icons({
        compiler: "jsx",
        autoInstall: true,
        jsx: "react",
      }),
    ],
  },
});
