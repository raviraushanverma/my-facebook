import UserAvatar from "./UserAvatar";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import AssetViewer from "./AssetViewer";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [user] = useContext(SessionContext);

  const [deleteLoading, setDeleteLoading] = useState();

  const postLike = async () => {
    props.likeUpdateData(props.postObj._id, user._id);
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
          <Link to={`/profile/${props.postObj.owner._id}`}>
            <UserAvatar
              userName={props.postObj.owner.name}
              time={props.postObj.created}
              profilePicURL={
                user._id === props.postObj.owner._id
                  ? user.profilePicURL
                  : props.postObj.owner.profilePicURL
              }
            />
          </Link>
          {user._id === props.postObj.owner._id && (
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
            <AssetViewer assets={props.postObj.medias} />
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
            {props.postObj.likes[user._id] === undefined ? (
              <i className="fa-regular fa-thumbs-up"></i>
            ) : (
              <i className="fa-solid fa-thumbs-up"></i>
            )}
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
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {props.postObj.comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              comment={comment}
              postId={props.postObj._id}
              commentUpdate={props.updatePostData}
              editComment={props.editComment}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Post;
