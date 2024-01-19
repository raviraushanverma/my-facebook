import UserAvatar from "./UserAvatar";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import AssetViewer from "./AssetViewer";
import { getLoggedInUser } from "../utility";
import { useState } from "react";

const Post = (props) => {
  const [editPost, setEditPost] = useState(true);
  const [editPostData, setEditPostData] = useState("");
  const postDelete = async () => {
    const user = getLoggedInUser();
    const deleteData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/post_delete/${props.postObj._id}/${user._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    await deleteData.json();
    props.deletePostData(props.postObj._id);
  };
  return (
    <div className="post-container">
      <section className="post-header">
        <UserAvatar
          userName={props.postObj.owner.userName}
          time={props.postObj.created}
        />
        <div>
          <button
            type="button"
            className="btn btn-light"
            onClick={(event) => {
              postDelete(event);
            }}
          >
            <i
              style={{ cursor: "pointer" }}
              className="fa-solid fa-trash-can"
            ></i>
          </button>
        </div>
      </section>
      <section>
        <div className="display-flex" style={{ width: "20%" }}>
          {editPost ? (
            <div className="post-content">{props.postObj.content}</div>
          ) : (
            <div>
              <form
                onSubmit={() => {
                  editPostData();
                }}
              >
                <input type="text"></input>
              </form>
            </div>
          )}
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              if (editPost === true) {
                setEditPost(false);
              } else {
                setEditPost(true);
              }
            }}
          >
            <i
              style={{ cursor: "pointer" }}
              className="fa-regular fa-pen-to-square"
            ></i>
          </button>
        </div>
        <div>
          <AssetViewer assets={props.postObj.images} />
        </div>
      </section>
      <div className="post-buttons">
        <div>
          <i className="fa-solid fa-thumbs-up"></i>
          <span className="text">{props.postObj.likes.length}</span>
        </div>
        <div>
          <a href="/" target="_blank" rel="noreferrer">
            {props.postObj.comments.length} Comments
          </a>
        </div>
      </div>
      <hr className="post-separator"></hr>
      <div className="post-buttons d-flex justify-content-around align-items-center">
        <button className="btn btn-light justify-content-around">
          <span className="post-button">
            <i className="fa-solid fa-thumbs-up"></i>
          </span>
          <span className="text">Like</span>
        </button>
        <button className="btn btn-light" type="button">
          <span className="post-button">
            <i className="fa-regular fa-comment"></i>
          </span>
          <span>Comment</span>
        </button>
        <button className="btn btn-light">
          <span className="post-button">
            <i className="fa-solid fa-share"></i>
          </span>
          <span className="text">Share</span>
        </button>
      </div>

      <CreateComment
        postId={props.postObj._id}
        updatePostData={props.updatePostData}
        commentUpdate={props.commentUpdate}
      />
      {props.postObj.comments.map((comment, index) => {
        return (
          <Comment
            key={index}
            comment={comment}
            postId={props.postObj._id}
            commentUpdate={props.updatePostData}
          />
        );
      })}
    </div>
  );
};
export default Post;
