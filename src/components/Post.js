import UserAvatar from "./UserAvatar";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import AssetViewer from "./AssetViewer";
import { getLoggedInUser } from "../utility";
import { useState } from "react";
import Loading from "./Loading";

const Post = (props) => {
  const user = getLoggedInUser();
  const [editPost, setEditPost] = useState(true);
  const [editPostData, setEditPostData] = useState("");
  const [deleteLoading, setDeleteLoading] = useState();

  const postLike = async () => {
    const likeData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/post_like/${props.postObj._id}/${user._id}/${user.name}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    await likeData.json();
    // tujhe frontend me update karna hain like ko
  };

  const postDelete = async () => {
    setDeleteLoading(true);
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
    setDeleteLoading(false);
    props.deletePostData(props.postObj._id);
  };

  return (
    <div className="post-container">
      <div>
        <section className="post-header">
          <UserAvatar
            userName={props.postObj.owner.userName}
            time={props.postObj.created}
          />
          {user._id === props.postObj.owner.userId && (
            <div>
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
              <button
                type="button"
                className="btn btn-light"
                onClick={(event) => {
                  postDelete(event);
                }}
              >
                {deleteLoading ? (
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
        </section>
        <section>
          <div style={{ width: "20%" }}>
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
          </div>
          <div>
            <AssetViewer assets={props.postObj.images} />
          </div>
        </section>
      </div>
      <div className="post-buttons">
        <div>
          <i className="fa-solid fa-thumbs-up"></i>
          <span style={{ marginLeft: "10px" }}>
            {Object.keys(props.postObj.likes).length}
          </span>
        </div>
        <div>{props.postObj.comments.length} Comments</div>
      </div>
      <hr className="post-separator"></hr>
      <div className="post-buttons d-flex justify-content-around align-items-center">
        <button
          className="btn btn-light justify-content-around"
          onClick={() => postLike()}
        >
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
