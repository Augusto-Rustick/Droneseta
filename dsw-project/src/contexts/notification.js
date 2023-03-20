import { createContext, useState } from "react";
import AlertDismissibleNotification from "../components/AppWrapper/Alert";
import { v4 as uuidv4 } from "uuid";

export const NotificationContext = createContext({});

const NotificationsType = {
  danger: "danger",
  info: "info",
  warning: "warning",
  success: "success",
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = ({
    type = "danger",
    title = "Error",
    description = "Error description",
    ticketLength = 5,
    duration = 1000 * ticketLength,
  }) => {

    const newNotification = {
      id: uuidv4(),
      type,
      title,
      description,
      ticketLength,
      duration,
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

  };

  const hideNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== notificationId)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ hideNotification, showNotification, notifications, NotificationsType }}
    >
      <div
        style={{
          top: "75px",
          left: "25px",
          maxWidth: "300px",
          minWidth: "300px",
          position: "absolute",
          zIndex: 999,
        }}
      >
        {notifications.map((notification) => (
          <AlertDismissibleNotification
            key={notification.id}
            hideNotification={() => hideNotification(notification.id)}
            notification={notification}
            show={true}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
