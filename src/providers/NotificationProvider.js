import { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const [notification, setNotification] = useState({});

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
