import UserAvatar from "./UserAvatar";
import { getLoggedInUser } from "../utility";
import { useState } from "react";
import Loading from "./Loading";
import TimeAgo from "javascript-time-ago";

const Comment = (props) => {
  const timeAgo = new TimeAgo("en-US");
  const [commentDeleteLoading, setCommentDeleteLoading] = useState();
  const user = getLoggedInUser();

  const commentDeleteData = async () => {
    setCommentDeleteLoading(true);
    const deleteData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/comment_delete/${props.postId}/${props.comment._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    const response = await deleteData.json();
    setCommentDeleteLoading(false);
    props.commentUpdate(response.post);
  };

  return (
    <>
      <div style={{ padding: "10px" }}>
        <div className="d-flex">
          <UserAvatar />
          <div
            style={{
              background: "#F0F2F5",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex">
              <h6>{props.comment.owner.userName}</h6>
              <span
                style={{
                  color: "gray",
                  marginLeft: "10px",
                  marginTop: "-2px",
                }}
              >
                {timeAgo.format(new Date(props.comment.created))}
              </span>
            </div>
            <div>{props.comment.content}</div>
            {user._id === props.comment.owner.userId && (
              <div style={{ float: "right" }}>
                <button type="button" className="btn btn-light">
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-regular fa-pen-to-square"
                  ></i>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    commentDeleteData();
                  }}
                >
                  {commentDeleteLoading ? (
                    <Loading />
                  ) : (
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-solid fa-trash-can"
                    ></i>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
