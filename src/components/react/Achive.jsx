// Achive.jsx
import { useState, useEffect } from "react";

function Achive({ folderName }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(folderName);
    if (savedProgress !== null) {
      setProgress(Number(savedProgress));
    }
  }, [folderName]);

  return (
    <p className="link-card-achievement">
      達成度: {progress}
    </p>
  );
}

export default Achive;
