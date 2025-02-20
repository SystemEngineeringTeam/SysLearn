import { useEffect, useState } from "react";

type AchiveProps = {
  allFilesCount: number;
  courseKey: string | undefined;
};

const Achive: React.FC <AchiveProps> = ({ courseKey, allFilesCount }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(courseKey ?? "");
    if (savedProgress !== null) {
      setProgress(Number(savedProgress));
    }
  }, [courseKey]);

  return (
    <p>
      {`達成度:${progress}/${allFilesCount}`}
    </p>
  );
};

export default Achive;
