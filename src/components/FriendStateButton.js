import Loading from "./Loading";
import { acceptFriendRequest, apiCall } from "../utils";
import { useContext, useState } from "react";
import { SessionContext } from "../providers/SessionProvider";

const FriendStateButton = ({ user, isProfilePage = true }) => {
  const { loggedInUser, setLoggedInUser } = useContext(SessionContext);
  const [isUpdatingFriendRequestLoader, setIsUpdatingFriendRequestLoader] =
    useState(false);

  if (!user) {
    return null;
  }

  const updateFriendRequest = async (uri) => {
    setIsUpdatingFriendRequestLoader(true);
    const response = await apiCall({
      url: `${process.env.REACT_APP_SERVER_END_PONT}/${uri}/${user._id}`,
      method: "POST",
      body: {
        loggedInUserId: loggedInUser._id,
      },
    });
    if (response) {
      setLoggedInUser(response.loggedInUser);
    }
    setIsUpdatingFriendRequestLoader(false);
  };

  const onUnfriendHandler = async () => {
    const response = await apiCall({
      url: `${process.env.REACT_APP_SERVER_END_PONT}/unfriend/${user._id}`,
      method: "DELETE",
      body: {
        loggedInUserId: loggedInUser._id,
      },
    });
    if (response) {
      setLoggedInUser(response.loggedInUser);
    }
  };

  return (
    <>
      {loggedInUser?.friends[user._id]?.state === "FRIEND_REQUEST_CONFIRM" ? (
        <div className={`dropdown ${isProfilePage ? "add-friend" : ""}`}>
          <button
            type="button"
            style={{ width: "150px" }}
            className="btn btn-light-sm btn-outline-primary"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-user-group"></i> Friends
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <div
                style={{ cursor: "pointer" }}
                className="dropdown-item"
                onClick={() => {
                  onUnfriendHandler();
                }}
              >
                Unfriend
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <>
          {loggedInUser?.friends[user._id]?.state === "FRIEND_REQUEST_CAME" ? (
            <button
              style={{ width: "150px" }}
              type="button"
              isProfilePage
              className={`btn btn-primary ${isProfilePage ? "add-friend" : ""}`}
              disabled={isUpdatingFriendRequestLoader}
              onClick={async () => {
                setIsUpdatingFriendRequestLoader(true);
                const res = await acceptFriendRequest(
                  loggedInUser._id,
                  user._id
                );
                if (res) {
                  setLoggedInUser(res.loggedInUser);
                }
                setIsUpdatingFriendRequestLoader(false);
              }}
            >
              {isUpdatingFriendRequestLoader ? (
                <Loading />
              ) : (
                " Accept Friend Request"
              )}
            </button>
          ) : (
            <button
              style={{ width: "150px" }}
              type="button"
              className={`btn btn-primary ${isProfilePage ? "add-friend" : ""}`}
              onClick={() => {
                updateFriendRequest(
                  loggedInUser?.friends[user._id]?.state ===
                    "FRIEND_REQUEST_SENT"
                    ? "friend_request_cancel"
                    : "friend_request_send"
                );
              }}
              disabled={isUpdatingFriendRequestLoader}
            >
              {isUpdatingFriendRequestLoader ? (
                <Loading />
              ) : (
                <>
                  {loggedInUser?.friends[user._id]?.state ===
                  "FRIEND_REQUEST_SENT"
                    ? "Cancel Request"
                    : "Add Friend"}
                </>
              )}
            </button>
          )}
        </>
      )}
    </>
  );
};

export default FriendStateButton;
