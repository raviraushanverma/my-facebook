import { useState, useEffect } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PostSkeleton from "./PostSkeleton";

const PostList = (props) => {
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
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PostList;
