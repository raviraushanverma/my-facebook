import { useContext, useState } from "react";
import { SessionContext } from "../providers/SessionProvider";
import Loading from "./Loading";
import { apiCall } from "../utils";

const CreateComment = (props) => {
  const { loggedInUser } = useContext(SessionContext);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState();

  if (!loggedInUser) {
    return null;
  }

  const commentPost = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await apiCall({
      url: `${process.env.REACT_APP_SERVER_END_PONT}/comment`,
      method: "POST",
      body: {
        postId: props.postId,
        comments: {
          content: comment,
          owner: loggedInUser._id,
        },
      },
    });
    setLoading(false);
    if (response) {
      props.updatePostData(response.post);
      setComment("");
    }
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
              {loading ? (
                <Loading />
              ) : (
                <i className="fa-solid fa-paper-plane"></i>
              )}
            </button>
          </div>
        </form>
      </div>
      <hr style={{ margin: "0px" }}></hr>
    </div>
  );
};
export default CreateComment;
