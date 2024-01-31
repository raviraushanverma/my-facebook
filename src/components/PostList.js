import { useState, useEffect, useContext } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PostSkeleton from "./PostSkeleton";
import { EventSourceContext } from "../providers/EventSourceProvider";
import { SessionContext } from "../providers/SessionProvider";

const PostList = (props) => {
  const { eventSource } = useContext(EventSourceContext);
  const { loggedInUser } = useContext(SessionContext);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventSource && loggedInUser) {
      eventSource.onmessage = (event) => {
        const eventStream = JSON.parse(event.data);
        if (eventStream && eventStream.newPost) {
          console.log("New Post came => ", eventStream.newPost);
          setPostData([eventStream.newPost, ...postData]);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser, eventSource, postData]);

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

  if (!loggedInUser) {
    return null;
  }

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

  const deletePostData = (postId) => {
    const newData = [...postData];
    const index = newData.findIndex((element) => {
      return element._id === postId;
    });
    if (loggedInUser._id === newData[index].owner._id) {
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
      newData[index].likes[loggedInUser._id] = loggedInUser.name;
    } else {
      delete newData[index].likes[loggedInUser._id];
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
    <section>
      {props.isProfilePage ? (
        <>
          {props.userId === loggedInUser._id && (
            <div style={{ marginBottom: "20px", marginTop: "5px" }}>
              <CreatePost
                updateData={updateData}
                profilePicURL={props.profilePicURL}
              />
            </div>
          )}
        </>
      ) : (
        <div style={{ marginBottom: "20px", marginTop: "5px" }}>
          <CreatePost
            updateData={updateData}
            profilePicURL={props.profilePicURL}
          />
        </div>
      )}
      {loading ? (
        <PostSkeleton />
      ) : (
        <div>
          {postData.map((postObj, index) => {
            return (
              <div
                style={{
                  marginTop: index !== 0 ? "20px" : "0px",
                }}
                key={index}
              >
                <Post
                  postObj={postObj}
                  updatePostData={updatePostData}
                  deletePostData={deletePostData}
                  likeUpdateData={likeUpdateData}
                  editComment={editComment}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PostList;
