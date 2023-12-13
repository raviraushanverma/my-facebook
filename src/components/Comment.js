import UserAvatar from "./UserAvatar";

const Comment = (props) => {
  const commentDeleteData = async () => {
    const deleteData = await fetch("http://localhost:5000/delete", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: "body",
    });
  };
  return (
    <>
      <div className="d-flex flex-row comment-row">
        <div className="p-2">
          <img
            src="https://i.imgur.com/8RKXAIV.jpg"
            alt="user"
            width={50}
            className="rounded-circle"
          />
        </div>
        <div className="comment-text active w-100">
          <h6 className="font-medium">{props.data.content}</h6>{" "}
          <div className="comment-footer">
            {" "}
            <span className="text-muted float-right">May 10, 2019</span>{" "}
            <button type="button" className="btn btn-cyan btn-sm">
              Edit
            </button>{" "}
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
