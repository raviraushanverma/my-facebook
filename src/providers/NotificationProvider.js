import { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const notifications = JSON.parse(localStorage.getItem("user"))?.notifications;
  const [notification, setNotification] = useState(
    notifications ? Object.values(notifications) : []
  );

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
