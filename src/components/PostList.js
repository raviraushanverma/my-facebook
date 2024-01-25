import { useState, useEffect, useContext } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PostSkeleton from "./PostSkeleton";
import { SessionContext } from "../providers/SessionProvider";

const PostList = (props) => {
  const [user] = useContext(SessionContext);

  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  const updatePostData = (postObj) => {
    const tempData = postData.map((element) => {
      if (element._id === postObj._id) {
        return postObj;
      } else {
        return element;
      }
    });
    setPostData(tempData);
  };

  const updateData = (post) => {
    const tempData = [...postData];
    tempData.unshift(post);
    setPostData(tempData);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let apiURL;
      if (props.isProfilePage) {
        apiURL = `${process.env.REACT_APP_SERVER_END_PONT}/profile_post/${props.userId}`;
      } else {
        apiURL = `${process.env.REACT_APP_SERVER_END_PONT}/posts`;
      }
      const response = await fetch(apiURL);
      const responseData = await response.json();
      setPostData(responseData.posts);
      setLoading(false);
    }
    fetchData();
  }, [props.isProfilePage, props.userId]);

  const deletePostData = (postId) => {
    const newData = [...postData];
    const index = newData.findIndex((element) => {
      return element._id === postId;
    });
    if (user._id === newData[index].owner._id) {
      newData.splice(index, 1);
      setPostData(newData);
    }
  };

  const likeUpdateData = (postId, userId) => {
    const newData = [...postData];
    const index = newData.findIndex((element) => {
      return element._id === postId;
    });
    if (newData[index].likes[userId] === undefined) {
      newData[index].likes[user._id] = user.name;
    } else {
      delete newData[index].likes[user._id];
    }
    setPostData(newData);
  };

  const editComment = (postId, commentId, editContent) => {
    const newData = [...postData];
    const postIndex = newData.findIndex((element) => {
      return element._id === postId;
    });

    const commentIndex = newData[postIndex].comments.findIndex((element) => {
      return element._id === commentId;
    });
    newData[postIndex].comments[commentIndex].content = editContent;
    setPostData(newData);
  };

  return (
    <section className="post-list-container">
      {props.isProfilePage ? (
        <>
          {props.userId === user._id && (
            <CreatePost
              updateData={updateData}
              profilePicURL={props.profilePicURL}
            />
          )}
        </>
      ) : (
        <CreatePost
          updateData={updateData}
          profilePicURL={props.profilePicURL}
        />
      )}
      {loading ? (
        <PostSkeleton />
      ) : (
        <div>
          {postData.map((postObj, index) => {
            return (
              <Post
                key={index}
                postObj={postObj}
                updatePostData={updatePostData}
                deletePostData={deletePostData}
                likeUpdateData={likeUpdateData}
                editComment={editComment}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PostList;
