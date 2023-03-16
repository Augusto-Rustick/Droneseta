import { useContext } from "react";
import { NotificationContext } from "../contexts/notification";

const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};

export default useNotification;
