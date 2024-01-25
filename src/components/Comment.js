import UserAvatar from "./UserAvatar";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import TimeAgo from "javascript-time-ago";
import { Link } from "react-router-dom";

const Comment = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setAditContent] = useState();
  const timeAgo = new TimeAgo("en-US");
  const [commentDeleteLoading, setCommentDeleteLoading] = useState();
  const [user] = useContext(SessionContext);

  useEffect(() => {
    if (isEditing === true) {
      setAditContent(props.comment.content);
    }
  }, [isEditing, props.comment]);

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

  const editCommentData = async (event) => {
    event.preventDefault();

    const data = {
      content: editContent,
    };
    const editData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/comment_edit/${props.postId}/${props.comment._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(data),
      }
    );
    await editData.json();
    props.editComment(props.postId, props.comment._id, editContent);
  };

  return (
    <>
      <div style={{ padding: "10px" }}>
        <div className="d-flex">
          <Link to={`/profile/${props.comment.owner._id}`}>
            <UserAvatar
              profilePicURL={
                user._id === props.comment.owner._id
                  ? user.profilePicURL
                  : props.comment.owner.profilePicURL
              }
            />
          </Link>
          <div
            style={{
              background: "#F0F2F5",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex">
              <h6>{props.comment.owner.name}</h6>
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
            {isEditing ? (
              <form
                onSubmit={(event) => {
                  editCommentData(event);
                  setIsEditing(false);
                }}
              >
                <input
                  className="form-control no-border"
                  type="text"
                  value={editContent}
                  onChange={(event) => {
                    setAditContent(event.target.value);
                  }}
                />
              </form>
            ) : (
              <div>
                <span>{props.comment.content}</span>
              </div>
            )}
            {user._id === props.comment.owner._id && (
              <div style={{ float: "right" }}>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    if (isEditing === false) {
                      setIsEditing(true);
                    } else {
                      setIsEditing(false);
                    }
                  }}
                >
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
