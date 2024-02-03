import { useContext, useEffect } from "react";
import { FriendSuggestionContext } from "../providers/FriendSuggestionProvider";
import { SessionContext } from "../providers/SessionProvider";
import { apiCall } from "../utils";
import FriendSlider from "./FriendSlider";

const FriendSuggestionList = () => {
  const { loggedInUser } = useContext(SessionContext);
  const { newFriendSuggestionList, setNewFriendSuggestionList } = useContext(
    FriendSuggestionContext
  );

  useEffect(() => {
    (async () => {
      const response = await apiCall({
        url: `${process.env.REACT_APP_SERVER_END_PONT}/new_friend_suggestion_list/${loggedInUser._id}`,
      });
      if (response) {
        setNewFriendSuggestionList(response.users);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  if (newFriendSuggestionList.length === 0) {
    return null;
  }
  return (
    <FriendSlider
      heading={"People you may know"}
      friendList={newFriendSuggestionList}
    />
  );
};

export default FriendSuggestionList;
