import { createContext, useContext, useEffect, useState } from "react";
import { SessionContext } from "./SessionProvider";
import { useSound } from "use-sound";
import messageAyaSound from "../assets/audios/switch-on.mp3";

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const [playNotificationSound] = useSound(messageAyaSound);
  const [user] = useContext(SessionContext);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (user) {
      (async () => {
        if (user) {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_END_PONT}/get_notifications/${user._id}`
          );
          const res = await response.json();
          const notificationArray = Object.values(res.notifications).reverse();
          setNotification(notificationArray);
        }
      })();
    }
  }, [user]);

  return (
    <NotificationContext.Provider
      value={[notification, setNotification, playNotificationSound]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
