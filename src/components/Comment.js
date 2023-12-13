import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import UserAvatar from "./UserAvatar";

TimeAgo.addDefaultLocale(en);

const Comment = (props) => {
  console.log(props.data._id);
  const timeAgo = new TimeAgo("en-US");

  const commentDeleteData = async () => {
    const deleteData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/delete`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: "body",
      }
    );
  };
  return (
    <>
      <div className="d-flex flex-row comment-row">
        <UserAvatar />
        <div className="comment-text active w-100">
          <h6 className="font-medium">{props.data.content}</h6>
          <div className="comment-footer">
            <span className="text-muted float-right">
              {timeAgo.format(new Date(props.data.created))}
            </span>
            <button type="button" className="btn btn-cyan btn-sm">
              Edit
            </button>
            <i
              className="fa-solid fa-delete-left"
              onClick={() => {
                commentDeleteData();
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
