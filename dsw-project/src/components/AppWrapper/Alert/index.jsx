import Alert from "react-bootstrap/Alert";
import Style from "./style";
import useNotification from "../../../hooks/useNotification";
import DynamicProgressBar from "./NotificationProgressBar";

function AlertDismissibleNotification() {
  const { hideNotification, notification, show } = useNotification();

  if (show) {
    return (
      <>
        <Alert
          className="Alert"
          variant={notification.type}
          onClose={() => hideNotification()}
          dismissible
        >
          <DynamicProgressBar variant={notification.type} duration={notification.duration} />
          <br />
          <Alert.Heading>{notification.title}</Alert.Heading>
          {notification.description}
        </Alert>
        <Style />
      </>
    );
  }else{
    return <></>
  }
}

export default AlertDismissibleNotification;
