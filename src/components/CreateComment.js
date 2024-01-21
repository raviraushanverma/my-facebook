import { useState } from "react";
import { getLoggedInUser } from "../utility/index";
import Loading from "./Loading";
import MediaUpload from "./MediaUpload";

const CreateComment = (props) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState();
  const [imageList, setImageList] = useState([]);
  const onUploadHandler = (images) => {
    setImageList(images);
  };

  const commentPost = async (event) => {
    event.preventDefault();
    const user = getLoggedInUser();
    const data = {
      id: props.postId,
      comments: {
        content: comment,
        owner: {
          userId: user._id,
          userName: user.name,
        },
      },
    };
    if (imageList.length > 0) {
      data.images = imageList;
    }

    setLoading(true);
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
    setLoading(false);
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
            <div className="post-icons">
              <MediaUpload onSuccessUpload={onUploadHandler}>
                <i className="fa-solid fa-camera"></i>
              </MediaUpload>
            </div>
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
