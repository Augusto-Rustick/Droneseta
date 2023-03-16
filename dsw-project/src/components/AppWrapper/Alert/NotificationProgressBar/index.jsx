import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import useNotification from "../../../../hooks/useNotification";

function DynamicProgressBar({ variant, duration }) {
  const [progress, setProgress] = useState(100);
  const { hideNotification } = useNotification();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const decrease = 100 / (((duration / 1000) * 1000) / 100);
        const newProgress = prevProgress - decrease;
        if (newProgress <= 0) {
          clearInterval(intervalId);
          setTimeout(() => {
            hideNotification();
            setProgress(100);
          }, 200);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [duration, hideNotification]);

  return <ProgressBar animated variant={variant} now={progress} />;
}

export default DynamicProgressBar;
