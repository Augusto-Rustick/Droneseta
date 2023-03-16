import { createContext, useState } from "react";
import AlertDismissibleNotification from "../components/AppWrapper/Alert";

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState();
  const [show, setShow] = useState();

  const showNotification = ({
    type = "danger",
    title = "Error",
    description = "Error description",
    ticketLenght = 3,
    duration = 1000 * ticketLenght,
  }) => {
    setShow(false);
    setTimeout(() => {
      setNotification({ type, title, description, ticketLenght, duration });
      setShow(true);
    }, 25);
  };

  const hideNotification = () => {
    setShow(false);
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ hideNotification, showNotification, notification, show }}
    >
      <AlertDismissibleNotification />
      {children}
    </NotificationContext.Provider>
  );
};
