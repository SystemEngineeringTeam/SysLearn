import type { CollectionEntry } from "astro:content";
import { getValues } from ".";
import { FrontmatterError } from "./error";

function checkSlugOrThrow(
  collections: Array<CollectionEntry<"docs">>,
): void | never {
  for (const { id, filePath, data: { title } } of collections) {
    if (filePath == null) {
      throw new Error("filePath is null!");
    }

    const expectedId = filePath
      .replace(/^src\/content\/docs\//, "")
      .replace(/\.\w+$/, "") // 拡張子を除去
      .replace(/\/\d{2}--/, "/") // /数字2桁-- パターンを / に置換
      .replace(/\/index$/, ""); // index を除去

    if (id !== expectedId) {
      throw new FrontmatterError(
        `The property \`slug\` in frontmatter in \`${id}\` violates \`Slug\` rule!`,
        `
タイトル “${title}” (ファイルパス: \`${filePath}\`) のフロントマター内のプロパティー \`slug\` を...
- 指定している場合: \`${id}\` を \`${expectedId}\` に変更
- 指定していない場合: \`slug\` プロパティーを追加して \`${expectedId}\` を設定
してみてください.
        `,
      );
    }
  }
}

function checkSidebarOrder(
  collections: Array<CollectionEntry<"docs">>,
): void | never {
  for (const { filePath, data: { sidebar: { order } } } of collections) {
    if (filePath == null) {
      throw new Error("filePath is null!");
    }

    // 最後の /<数字> 2 桁を抽出
    const expectedOrderStr = filePath.match(/\/(\d{2})--.*$/);
    if (expectedOrderStr == null) {
      throw new FrontmatterError(
        `The file path \`${filePath}\` does not follow the expected pattern!`,
        `ファイルパス \`${filePath}\` は, 形式 \`<数字 2 桁>--<英語 URL>\\.md(x)?\` に従っている必要があります.`,
      );
    }
    const expectedOrder = Number.parseInt(expectedOrderStr[1], 10);

    if (order == null) {
      throw new FrontmatterError(
        `The property \`sidebar.order\` in frontmatter in \`${filePath}\` is not defined!`,
        `ファイルパス \`${filePath}\` のフロントマター内のプロパティー \`sidebar.order\` を \`${expectedOrder}\` に設定してみてください.`,
      );
    }

    if (order !== expectedOrder) {
      throw new FrontmatterError(
        `The property \`sidebar.order\` in frontmatter in \`${filePath}\` violates \`SidebarOrder\` rule!`,
        `ファイルパス \`${filePath}\` のフロントマター内のプロパティー \`sidebar.order\` を \`${order}\` から \`${expectedOrder}\` に設定してみてください.`,
      );
    }
  }
}

function checkNextPropertyOnLastEntry(
  collections: Array<CollectionEntry<"docs">>,
): void | never {
  if (collections.length === 0)
    return;

  const comparer = (a: CollectionEntry<"docs">, b: CollectionEntry<"docs">): number => {
    const aOrder = a.data.sidebar.order!;
    const bOrder = b.data.sidebar.order!;
    return aOrder - bOrder;
  };
  const { id, filePath, data: { title, next } } = collections.toSorted(comparer).at(-1)!;
  if (next == null) {
    throw new FrontmatterError(
      `The property \`next\` in frontmatter in \`${id}\` violates \`NextPropertyOnLastEntry\` rule!`,
      `
タイトル “${title}” (ファイルパス: \`${filePath}\`) はコース内の最後のエントリーであるため, フロントマター内のプロパティー \`next\` は \`false\` に設定する必要があります.

ファイルパス \`${filePath}\` のフロントマター内のプロパティー \`next\` を \`false\` に設定してみてください.
`,
    );
  }

  if (next !== false) {
    throw new FrontmatterError(
      `The property \`next\` in frontmatter in \`${id}\` violates \`NextPropertyOnLastEntry\` rule!`,
      `
タイトル “${title}” (ファイルパス: \`${filePath}\`) はコース内の最後のエントリーであるため, フロントマター内のプロパティー \`next\` は \`false\` に設定する必要があります.

ファイルパス \`${filePath}\` のフロントマター内のプロパティー \`next\` を \`false\` に設定してみてください.
`,
    );
  }
}

type CollectionsDocs = Array<CollectionEntry<"docs">>;
export function checkFrontmatterOrThrow(
  collections: CollectionsDocs,
): void | never {
  const validationConfig = {
    textbook: {
      path: "/textbook/",
      validations: [
        checkSlugOrThrow,
        checkSidebarOrder,
        // checkNextPropertyOnLastEntry,
      ],
    },
    setups: {
      path: "/setups/",
      validations: [
        checkSlugOrThrow,
      ],
    },
  } as const satisfies Record<
    string,
    {
      path: string;
      validations: Array<(collections: CollectionsDocs) => void | never>;
    }
  >;

  getValues(validationConfig).forEach(({ path, validations }) => {
    const filteredCollections = collections.filter(
      (entry) => entry.filePath?.includes(path) ?? false,
    );

    validations.forEach((validationFn) => {
      validationFn(filteredCollections);
    });
  });
}
