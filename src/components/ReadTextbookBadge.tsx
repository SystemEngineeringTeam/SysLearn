import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { appendReadTextbookId, removeReadTextbookId } from "@/lib/stores/read-textbook-ids";
import { waitMs } from "@/lib/utils";
import styles from "./ReadTextbookBadge.module.css";

export function ReadTextbookBadge({ textbookId }: { textbookId: string }): ReactElement {
  const badgeContainerRef = useRef<HTMLDivElement>(null);
  const [badgeObserver, setBadgeObserver] = useState<IntersectionObserver>();

  useEffect(() => {
    const badgeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          appendReadTextbookId(textbookId);
          badgeObserver.unobserve(entry.target);
        }
      });
    });

    setBadgeObserver(badgeObserver);

    if (badgeContainerRef.current != null) {
      badgeObserver.observe(badgeContainerRef.current);
    }

    return (): void => {
      badgeObserver.disconnect();
    };
  }, [textbookId]);

  return (
    <div className={styles.badgeContainer} ref={badgeContainerRef}>
      <div className={styles.badge}>
        <IconMdiBookCheck />
        <span>最後まで読み終えました！  えらい！</span>
      </div>
      <button
        className={styles.unreadButton}
        onClick={() => {
          removeReadTextbookId(textbookId);
          badgeObserver?.unobserve(badgeContainerRef.current!);
          window.scrollTo({ top: 0, behavior: "smooth" });

          const onScrollTop = (): void => {
            badgeObserver?.observe(badgeContainerRef.current!);
          };

          void waitMs(1000).then(onScrollTop);
        }}
        type="button"
      >
        未読にする
      </button>
    </div>
  );
}
