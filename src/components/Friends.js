import { useEffect, useState } from "react";
import { apiCall } from "../utils";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { Link } from "react-router-dom";

const Friends = () => {
  const [allFriends, setAllFriends] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await apiCall({
        url: `${process.env.REACT_APP_SERVER_END_PONT}/friends`,
        method: "GET",
      });

      if (response) {
        setAllFriends(response.users);
      }
    }
    fetchData();
  }, []);
  if (!allFriends) {
    return null;
  }
  return (
    <div>
      {allFriends.map((friend) => {
        return (
          <div className="d-flex">
            <Link to={`/profile/${friend._id}`} title="Account">
              <ProfileUserAvatar profilePicURL={friend.profilePicURL} />
            </Link>
            <div>
              <h3> {friend.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Friends;
