import UserAvatar from "./UserAvatar";

const Comment = (props) => {
  const commentDeleteData = async () => {
    const deleteData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/comment_delete/${props.data._id}/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
  };
  return (
    <>
      <div style={{ padding: "10px" }}>
        <UserAvatar userName={"Ravi Raushan"} time={props.data.created} />
        <div>
          <h6 style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {props.data.content}
          </h6>
          <div className="d-flex flex-sm-row-reverse">
            <button type="button" className="btn btn-light">
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button type="button" className="btn btn-light">
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-trash-can"
                onClick={() => {
                  commentDeleteData();
                }}
              ></i>
            </button>
          </div>
        </div>
        <hr style={{ margin: "0px" }}></hr>
      </div>
    </>
  );
};

export default Comment;
