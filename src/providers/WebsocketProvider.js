import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SessionContext,
  getLoggedInUserFromLocalStorage,
} from "./SessionProvider";
import io from "socket.io-client";

export const WebsocketContext = createContext();

export const updateFriendList = (friendsMapObj, otherUserIds, isOnlineFlag) => {
  const users = [...friendsMapObj.values()].reduce((acc, element) => {
    acc.set(`${element._id}`, {
      ...element,
      isOnline: otherUserIds.includes(element._id)
        ? isOnlineFlag
        : element.isOnline,
    });
    return acc;
  }, new Map());
  return new Map([...users].sort((a, b) => b[1].isOnline - a[1].isOnline));
};

export const subscribeForWebsocket = () => {
  const loggedInUser = getLoggedInUserFromLocalStorage();
  if (loggedInUser) {
    return io(`${process.env.REACT_APP_SERVER_END_PONT}`);
  }
};

const WebsocketProvider = (props) => {
  const { loggedInUser } = useContext(SessionContext);
  const [socket, setSocket] = useState(null);
  const [friends, setFriends] = useState(new Map());
  const [alreadyOnlineUsers, setAlreadyOnlineUsers] = useState([]);

  const allAlreadyOnlineUserListener = useCallback((userIds) => {
    setAlreadyOnlineUsers(userIds);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("all-connected-users", allAlreadyOnlineUserListener);
    }
    return () => {
      if (socket) {
        socket.off("all-connected-users", allAlreadyOnlineUserListener);
      }
    };
  }, [allAlreadyOnlineUserListener, socket]);

  useEffect(() => {
    if (loggedInUser) {
      const temp = Object.values(loggedInUser.friends).reduce(
        (acc, element) => {
          if (element.state === "FRIEND_REQUEST_CONFIRM") {
            acc.set(`${element.user._id}`, {
              ...element.user,
              isOnline: false,
            });
          }
          return acc;
        },
        new Map()
      );
      const friendListTemp = updateFriendList(temp, alreadyOnlineUsers, true);
      setFriends(friendListTemp);
    }
  }, [alreadyOnlineUsers, loggedInUser]);

  useEffect(() => {
    const webSocket = subscribeForWebsocket();
    if (webSocket) {
      setSocket(webSocket);
    }
    return () => {
      if (webSocket) {
        webSocket.close();
        setSocket(null);
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const loggedInUser = getLoggedInUserFromLocalStorage();
      socket.emit("user-connected", loggedInUser._id);
    }
    const handleVisibilityChange = () => {
      if (socket && socket.readyState !== WebSocket.OPEN) {
        if (document.hidden) {
          socket.close();
        } else {
          const newWebSocket = subscribeForWebsocket();
          if (newWebSocket) {
            setSocket(newWebSocket);
          }
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket]);

  const otherUserConnectedListener = useCallback(
    (otherUserId) => {
      const friendListTemp = updateFriendList(friends, [otherUserId], true);
      setFriends(friendListTemp);
    },
    [friends, setFriends]
  );

  const otherUserDisconnectedListener = useCallback(
    (otherUserId) => {
      const friendListTemp = updateFriendList(friends, [otherUserId], false);
      setFriends(friendListTemp);
    },
    [friends, setFriends]
  );

  useEffect(() => {
    if (socket) {
      socket.on("other-user-connected", otherUserConnectedListener);
      socket.on("other-user-disconnected", otherUserDisconnectedListener);
    }
    return () => {
      if (socket) {
        socket.off("other-user-connected", otherUserConnectedListener);
        socket.off("other-user-disconnected", otherUserDisconnectedListener);
      }
    };
  }, [
    socket,
    friends,
    otherUserConnectedListener,
    otherUserDisconnectedListener,
  ]);

  return (
    <WebsocketContext.Provider
      value={{ socket, setSocket, friends, setFriends }}
    >
      {props.children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
