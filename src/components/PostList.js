import { useState, useEffect } from "react";
import Post from "./Post";

const PostList = (props) => {
  const [postData, setPostData] = useState([]);
  console.log("======>postData", postData);
  const postUpdata = () => {
    return postData;
  };

  postUpdata();

  const updatePostData = (postObj) => {
    console.log("======>", postObj);
    const tempData = postData.map((element) => {
      if (element._id === postObj._id) {
        console.log("if wala element ", element);
        return postObj;
      } else {
        console.log("else wala element ", element);
        return element;
      }
    });

    setPostData(tempData);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/getData", {});
      const responseData = await response.json();
      setPostData(responseData.posts);
    }
    fetchData();
  }, []);

  return (
    <section className="post-list-container">
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
