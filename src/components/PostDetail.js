import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiCall } from "../utils";
import CenterPageLoader from "./CenterPageLoader";
import Post from "./Post";
import { useLocation } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";

const PostDetail = () => {
  const { hash } = useLocation();
  let hashLocation;
  if (hash) {
    hashLocation = hash.split("#")[1];
  }
  let { post_id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useContext(SessionContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await apiCall({
        url: `${process.env.REACT_APP_SERVER_END_PONT}/get_post_detail/${post_id}`,
      });
      if (response) {
        setPost(response.post);
        setTimeout(() => {
          if (hashLocation) {
            const element = document.getElementById(hashLocation);
            if (element) {
              // 👇 Will scroll smoothly to the top of the next section
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        });
      }
      setLoading(false);
    })();
  }, [hashLocation, post_id]);

  const likeUpdateData = (postId, userId) => {
    const tempPost = { ...post };
    if (tempPost.likes[userId] === undefined) {
      tempPost.likes[loggedInUser._id] = loggedInUser.name;
    } else {
      delete tempPost.likes[loggedInUser._id];
    }
    setPost(tempPost);
  };

  const editComment = (postId, commentId, editContent) => {
    const tempPost = { ...post };
    const commentIndex = tempPost.comments.findIndex((element) => {
      return element._id === commentId;
    });
    tempPost.comments[commentIndex].content = editContent;
    setPost(tempPost);
  };

  if (loading) {
    return <CenterPageLoader />;
  }

  if (!loading && !post) {
    return (
      <div className="complete-center" style={{ height: "50vh" }}>
        <h3> This post has been deleted!</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row featurette">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Post
            postObj={post}
            updatePostData={(postObj) => setPost(postObj)}
            deletePostData={() => setPost(null)}
            likeUpdateData={likeUpdateData}
            editComment={editComment}
            commentHash={hashLocation}
          />
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default PostDetail;
