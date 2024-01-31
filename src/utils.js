export const acceptFriendRequest = async (loggedInUserId, userId) => {
  const serverData = await fetch(
    `${process.env.REACT_APP_SERVER_END_PONT}/friend_request_accept/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ loggedInUserId }),
    }
  );
  return await serverData.json();
};

export const getNotifications = async (loggedInUserId, limit) => {
  const response = await fetch(
    `${
      process.env.REACT_APP_SERVER_END_PONT
    }/get_notifications/${loggedInUserId}/${limit ? limit : ""}`
  );
  return await response.json();
};
