// Achive.jsx
import { useState, useEffect } from "react";

function Achive({ folderName,allFilesCount }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(folderName);
    if (savedProgress !== null) {
      setProgress(Number(savedProgress));
    }
  }, [folderName]);


  return (
    <p>
      達成度: {progress}/{allFilesCount}
    </p>
  );
}

export default Achive;
