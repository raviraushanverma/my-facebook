import { createContext, useEffect, useState } from "react";
import { getLoggedInUserFromLocalStorage } from "./SessionProvider";
import io from "socket.io-client";

export const WebsocketContext = createContext();

export const subscribeForWebsocket = () => {
  const loggedInUser = getLoggedInUserFromLocalStorage();
  if (loggedInUser) {
    return io(`${process.env.REACT_APP_SERVER_END_PONT}`);
  }
};

const WebsocketProvider = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const webSocket = subscribeForWebsocket();
    if (webSocket) {
      setSocket(webSocket);
    }
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const loggedInUser = getLoggedInUserFromLocalStorage();
      socket.emit("user-connected", loggedInUser._id);
    }
  }, [socket]);

  return (
    <WebsocketContext.Provider value={{ socket, setSocket }}>
      {props.children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
