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
      <div className="card">
        <div className="row">
          <div className="col-10">
            <div className="comment-box ml-2">
              <h4>Add a comment</h4>
              <form
                onSubmit={(event) => {
                  commentPost(event);
                }}
              >
                <div className="comment-area d-flex">
                  <input
                    type="text"
                    className="create-commnet-textbox"
                    placeholder="Write a comment ?"
                    required
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                  ></input>
                  <div className="pull-right">
                    <button>
                      Send <i className="fa fa-long-arrow-right ml-1" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateComment;
