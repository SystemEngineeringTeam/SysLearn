// Achive.jsx
import { useEffect, useState } from "react";

type AchiveProps = {
  allFilesCount: number;
  folderName: string|undefined;
}

function Achive({ folderName, allFilesCount }: AchiveProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(folderName);
    if (savedProgress !== null) {
      setProgress(Number(savedProgress));
    }
  }, [folderName]);

  return (
    <p>
      {`達成度:${progress}/${allFilesCount}`}
    </p>
  );
}

export default Achive;
