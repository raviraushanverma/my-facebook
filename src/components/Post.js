import UserAvatar from "./UserAvatar";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import AssetViewer from "./AssetViewer";

const Post = (props) => {
  return (
    <div className="post-container">
      <section className="post-header">
        <UserAvatar userName={"Ravi Raushan"} time={props.postObj.created} />
      </section>
      <section>
        <div className="post-content">{props.postObj.content}</div>
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
            {props.postObj.comments.length} comments
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
      />
      {props.postObj.comments.map((element, index) => {
        return <Comment key={index} data={element} posts={props.postObj} />;
      })}
    </div>
  );
};
export default Post;
