import { createContext, useState } from "react";

export const ActiveChatFriendContext = createContext();

const ActiveChatFriendProvider = (props) => {
  const [activeChatFriend, setActiveChatFriend] = useState(null);

  return (
    <ActiveChatFriendContext.Provider
      value={{ activeChatFriend, setActiveChatFriend }}
    >
      {props.children}
    </ActiveChatFriendContext.Provider>
  );
};

export default ActiveChatFriendProvider;
