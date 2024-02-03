import { createContext, useState } from "react";

export const FriendSuggestionContext = createContext();

const FriendSuggestionProvider = (props) => {
  const [newFriendSuggestionList, setNewFriendSuggestionList] = useState([]);

  return (
    <FriendSuggestionContext.Provider
      value={{
        newFriendSuggestionList,
        setNewFriendSuggestionList,
      }}
    >
      {props.children}
    </FriendSuggestionContext.Provider>
  );
};

export default FriendSuggestionProvider;
