import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import remarkMermaid from "@southball/remark-mermaid";
import compress from "astro-compress";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import wikiLinkPlugin from "remark-wiki-link-plus";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    metaTags(),
    compress({
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
        },
      },
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
      logo: {
        src: "./src/assets/icons/logo/sym.svg",
      },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/SystemEngineeringTeam/SysLearn" },
        { icon: "x.com", label: "X", href: "https://x.com/set_official" },
        { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/ait.sysken" },
      ],
      components: {
        Sidebar: "src/components/starlight/Sidebar.astro",
        Footer: "src/components/starlight/Footer.astro",
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
              autogenerate: { directory: "textbook/web/for-hackathons" },
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
