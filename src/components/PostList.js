import { useState, useEffect } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PostSkeleton from "./PostSkeleton";
import { getLoggedInUser } from "../utility";

const PostList = (props) => {
  const user = getLoggedInUser();

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
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_END_PONT}/posts`,
        {}
      );
      const responseData = await response.json();
      setPostData(responseData.posts);
      setLoading(false);
    }
    fetchData();
  }, []);

  const deletePostData = (postId) => {
    const user = getLoggedInUser();
    const newData = [...postData];
    const index = newData.findIndex((element) => {
      return element._id === postId;
    });
    if (user._id === newData[index].owner.userId) {
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
      <CreatePost updateData={updateData} />
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
