import { persistentAtom } from "@nanostores/persistent";
import { getLocalStorageKey } from "./_index";

export const $readTextbookIds = persistentAtom<string[]>(
  getLocalStorageKey("read-textbook-ids"),
  [],
  {
    encode: (val: string[]) => {
      const uniqueIds = Array.from(new Set(val));
      return JSON.stringify(uniqueIds);
    },
    decode: JSON.parse,
  },
);

export function appendReadTextbookId(id: string): void {
  const current = $readTextbookIds.get();
  $readTextbookIds.set([...current, id]);
}

export function removeReadTextbookId(id: string): void {
  const current = $readTextbookIds.get();
  $readTextbookIds.set(current.filter((textbookId) => textbookId !== id));
}

export function hasReadTextbookId(id: string): boolean {
  const current = $readTextbookIds.get();
  return current.includes(id);
}
