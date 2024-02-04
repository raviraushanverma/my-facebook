import UserAvatar from "./UserAvatar";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import AssetViewer from "./AssetViewer";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useState, createRef } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { apiCall } from "../utils";

const Post = (props) => {
  const commentInputRef = createRef();
  const { loggedInUser } = useContext(SessionContext);
  const [deleteLoading, setDeleteLoading] = useState();

  const postLike = async () => {
    if (loggedInUser) {
      props.likeUpdateData(props.postObj._id, loggedInUser._id);
      await apiCall({
        url: `${process.env.REACT_APP_SERVER_END_PONT}/post_like/${props.postObj._id}/${loggedInUser._id}/${loggedInUser.name}`,
        method: "POST",
      });
    }
  };

  const postDelete = async () => {
    if (loggedInUser) {
      setDeleteLoading(true);
      const response = await apiCall({
        url: `${process.env.REACT_APP_SERVER_END_PONT}/post_delete/${props.postObj._id}/${loggedInUser._id}`,
        method: "DELETE",
      });
      if (response) {
        props.deletePostData(props.postObj._id);
      }
      setDeleteLoading(false);
    }
  };

  return (
    <div className="post-container">
      <div>
        <section className="post-header">
          <Link to={`/profile/${props.postObj.owner._id}`}>
            <UserAvatar
              userName={props.postObj.owner.name}
              time={props.postObj.created}
              profilePicURL={
                loggedInUser?._id === props.postObj.owner._id
                  ? loggedInUser?.profilePicURL
                  : props.postObj.owner.profilePicURL
              }
            />
          </Link>
          {loggedInUser?._id === props.postObj.owner._id && (
            <div>
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
          <div>
            <div className="post-content">{props.postObj.content}</div>
          </div>
          <div>
            {props.isMediaDisplay && (
              <Link to={`/post/${props.postObj._id}`}>
                <AssetViewer assets={props.postObj.medias} />
              </Link>
            )}
          </div>
        </section>
      </div>
      <div className="post-buttons">
        <div
          style={{ cursor: "pointer" }}
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title={Object.values(props.postObj.likes)
            .map((obj) => obj.userName)
            .join(",")}
        >
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
          onClick={() => {
            postLike();
          }}
        >
          <span className="post-button">
            {props.postObj.likes[loggedInUser?._id] === undefined ? (
              <i className="fa-regular fa-thumbs-up"></i>
            ) : (
              <i className="fa-solid fa-thumbs-up"></i>
            )}
          </span>
          <span className="text">Like</span>
        </button>
        <button
          className="btn btn-light"
          type="button"
          onClick={() => {
            if (commentInputRef) {
              commentInputRef.current.focus();
            }
          }}
        >
          <span className="post-button">
            <i className="fa-regular fa-comment"></i>
          </span>
          <span>Comment</span>
        </button>
      </div>
      <CreateComment
        ref={commentInputRef}
        postId={props.postObj._id}
        updatePostData={props.updatePostData}
        commentUpdate={props.commentUpdate}
      />
      <div className={`${props.isCommentScroll ? "comment-scroll" : ""}`}>
        {props.postObj.comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              comment={comment}
              postId={props.postObj._id}
              commentUpdate={props.updatePostData}
              editComment={props.editComment}
              commentHash={props.commentHash}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Post;
