import { createContext, useState } from "react";

export const ActiveChatFriendContext = createContext();

const ActiveChatFriendProvider = (props) => {
  const [activeChatFriendId, setActiveChatFriendId] = useState(null);

  return (
    <ActiveChatFriendContext.Provider
      value={{ activeChatFriendId, setActiveChatFriendId }}
    >
      {props.children}
    </ActiveChatFriendContext.Provider>
  );
};

export default ActiveChatFriendProvider;
