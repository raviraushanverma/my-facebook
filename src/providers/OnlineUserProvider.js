import { createContext, useContext, useEffect, useState } from "react";
import { SessionContext } from "./SessionProvider";

export const OnlineUserContext = createContext();

const OnlineUserProvider = (props) => {
  const [friends, setFriends] = useState([]);
  const { loggedInUser } = useContext(SessionContext);

  useEffect(() => {
    if (loggedInUser) {
      setFriends(
        Object.values(loggedInUser.friends)
          .filter((friend) => {
            return friend.state === "FRIEND_REQUEST_CONFIRM";
          })
          .map((friend) => {
            return { ...friend.user, isOnline: false };
          })
      );
    }
  }, [loggedInUser]);

  return (
    <OnlineUserContext.Provider value={{ friends, setFriends }}>
      {props.children}
    </OnlineUserContext.Provider>
  );
};

export default OnlineUserProvider;
