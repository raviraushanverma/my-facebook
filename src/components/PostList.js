import { useState, useEffect } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";

const PostList = (props) => {
  const [postData, setPostData] = useState([]);

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
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_END_PONT}/posts`,
        {}
      );
      const responseData = await response.json();
      setPostData(responseData.posts);
    }
    fetchData();
  }, []);

  return (
    <section className="post-list-container">
      <CreatePost updateData={updateData} />
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
    </section>
  );
};

export default PostList;
