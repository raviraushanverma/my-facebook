import { createContext, useState } from "react";

export const ActiveChatMessageContext = createContext();

const ActiveChatMessageProvider = (props) => {
  const [activeChatMessages, setActiveChatMessages] = useState([]);

  return (
    <ActiveChatMessageContext.Provider
      value={{ activeChatMessages, setActiveChatMessages }}
    >
      {props.children}
    </ActiveChatMessageContext.Provider>
  );
};

export default ActiveChatMessageProvider;
