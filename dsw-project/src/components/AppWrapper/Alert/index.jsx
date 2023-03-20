import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

function AlertDismissibleNotification({
  hideNotification,
  notification,
  show,
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!notification) return;

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const decrease = 100 / (((notification.duration / 1000) * 1000) / 100);
        const newProgress = prevProgress - decrease;
        if (newProgress <= 0) {
          clearInterval(intervalId);
          setTimeout(() => {
            hideNotification(notification.id);
          }, 200);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [hideNotification, notification]);

  if (show) {
    return (
      <>
        <Alert
          variant={notification.type}
          onClose={() => hideNotification(notification.id)}
          dismissible
        >
          <ProgressBar animated variant={notification.type} now={progress} />
          <br />
          <Alert.Heading>{notification.title}</Alert.Heading>
          {notification.description}
        </Alert>
      </>
    );
  } else {
    return <></>;
  }
}

export default AlertDismissibleNotification;
