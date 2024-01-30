import { createContext, useContext, useEffect, useState } from "react";
import { SessionContext } from "./SessionProvider";
import { useSound } from "use-sound";
import messageAyaSound from "../assets/audios/switch-on.mp3";

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const [playNotificationSound] = useSound(messageAyaSound);
  const { loggedInUser } = useContext(SessionContext);
  const [notifications, setNotifications] = useState([]);
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      (async () => {
        const eventSource = new EventSource(
          `${process.env.REACT_APP_SERVER_END_PONT}/notification/${loggedInUser._id}`
        );
        setEventSource(eventSource);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_END_PONT}/get_notifications/${
            loggedInUser._id
          }/${10}`
        );
        const res = await response.json();
        setNotifications(res.notifications);
      })();
    }
  }, [loggedInUser]);

  return (
    <NotificationContext.Provider
      value={{
        eventSource,
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
