import { useState } from "react";

const CreateComment = (props) => {
  const [comment, setComment] = useState("");

  const commentPost = async (event) => {
    event.preventDefault();
    const data = {
      id: props.postId,
      comments: { content: comment },
    };

    const commentData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/comment`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const response = await commentData.json();
    props.updatePostData(response.post);
    setComment("");
  };

  return (
    <div>
      <hr style={{ margin: "0px" }}></hr>
      <div>
        <form
          onSubmit={(event) => {
            commentPost(event);
          }}
        >
          <div
            className="d-flex justify-content-around"
            style={{ padding: "10px" }}
          >
            <input
              type="text"
              className="create-comment-textbox"
              placeholder="Write a comment ?"
              required
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></input>
            <button type="submit" className="btn btn-light comment-send-icon">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
      <hr style={{ margin: "0px" }}></hr>
    </div>
  );
};
export default CreateComment;
