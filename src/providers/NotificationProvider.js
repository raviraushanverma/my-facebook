import { createContext, useContext, useEffect, useState } from "react";
import { SessionContext } from "./SessionProvider";
import { useSound } from "use-sound";
import messageAyaSound from "../assets/audios/switch-on.mp3";
import { getNotifications } from "../utils";

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const { loggedInUser } = useContext(SessionContext);
  const [playNotificationSound] = useSound(messageAyaSound);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      (async () => {
        const res = await getNotifications(loggedInUser._id, 10);
        setNotifications(res.notifications);
      })();
    }
  }, [loggedInUser]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        playNotificationSound,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
