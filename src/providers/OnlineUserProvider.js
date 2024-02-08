import { createContext, useContext, useEffect, useState } from "react";
import { SessionContext } from "./SessionProvider";
import { WebsocketContext } from "./WebsocketProvider";
import { ActiveChatFriendContext } from "./ActiveChatFriendProvider";

export const OnlineUserContext = createContext();

const updateFriendList = (friendList, otherUserIds, isOnlineFlag) => {
  return friendList
    .map((friend) => {
      if (otherUserIds.includes(friend._id)) {
        return { ...friend, isOnline: isOnlineFlag };
      }
      return { ...friend };
    })
    .sort((a, b) => b.isOnline - a.isOnline);
};

const OnlineUserProvider = (props) => {
  const [friends, setFriends] = useState([]);
  const { socket } = useContext(WebsocketContext);
  const { loggedInUser } = useContext(SessionContext);
  const { activeChatFriend, setActiveChatFriend } = useContext(
    ActiveChatFriendContext
  );

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

  useEffect(() => {
    if (socket) {
      socket.on("all-connected-users", (userIds) => {
        const friendListTemp = updateFriendList(friends, userIds, true);
        setFriends(friendListTemp);
      });

      socket.on("other-user-connected", (otherUserId) => {
        const friendListTemp = updateFriendList(friends, [otherUserId], true);
        setFriends(friendListTemp);
      });

      socket.on("other-user-disconnected", (otherUserId) => {
        const friendListTemp = updateFriendList(friends, [otherUserId], false);
        setFriends(friendListTemp);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, friends]);

  // useEffect(() => {
  //   if (activeChatFriend) {
  //     const tempFriend = friends.find((friend) => {
  //       return friend._id === activeChatFriend._id;
  //     });
  //     setActiveChatFriend(tempFriend);
  //   }
  // }, [activeChatFriend, friends]);

  return (
    <OnlineUserContext.Provider value={{ friends, setFriends }}>
      {props.children}
    </OnlineUserContext.Provider>
  );
};

export default OnlineUserProvider;
