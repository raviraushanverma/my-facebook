import { useEffect, useContext } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PostSkeleton from "./PostSkeleton";
import { SessionContext } from "../providers/SessionProvider";
import { apiCall } from "../utils";
import { PostContext } from "../providers/PostProvider";
import FriendSuggestionList from "./FriendSuggestionList";

const PostList = (props) => {
  const { postList, setPostList, isPostListLoading, setIsPostListLoading } =
    useContext(PostContext);
  const { loggedInUser } = useContext(SessionContext);

  useEffect(() => {
    async function fetchData() {
      setIsPostListLoading(true);
      const url = props.isProfilePage
        ? `${process.env.REACT_APP_SERVER_END_PONT}/profile_post/${props.userId}`
        : `${process.env.REACT_APP_SERVER_END_PONT}/posts/${loggedInUser._id}`;
      const response = await apiCall({
        url,
      });
      if (response) {
        setPostList(response.posts);
        setIsPostListLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isProfilePage, props.userId]);

  if (!loggedInUser) {
    return null;
  }

  const updatePostData = (postObj) => {
    const tempData = postList.map((element) => {
      if (element._id === postObj._id) {
        return postObj;
      } else {
        return element;
      }
    });
    setPostList(tempData);
  };

  const updateData = (post) => {
    const tempData = [...postList];
    tempData.unshift(post);
    setPostList(tempData);
  };

  const deletePostData = (postId) => {
    const newData = [...postList];
    const index = newData.findIndex((element) => {
      return element._id === postId;
    });
    if (loggedInUser._id === newData[index].owner._id) {
      newData.splice(index, 1);
      setPostList(newData);
    }
  };

  const likeUpdateData = (postId, userId) => {
    const newData = [...postList];
    const index = newData.findIndex((element) => {
      return element._id === postId;
    });
    if (newData[index].likes[userId] === undefined) {
      newData[index].likes[loggedInUser._id] = loggedInUser.name;
    } else {
      delete newData[index].likes[loggedInUser._id];
    }
    setPostList(newData);
  };

  const editComment = (postId, commentId, editContent) => {
    const newData = [...postList];
    const postIndex = newData.findIndex((element) => {
      return element._id === postId;
    });

    const commentIndex = newData[postIndex].comments.findIndex((element) => {
      return element._id === commentId;
    });
    newData[postIndex].comments[commentIndex].content = editContent;
    setPostList(newData);
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
      {!isPostListLoading && postList.length === 0 && <FriendSuggestionList />}
      {isPostListLoading ? (
        <PostSkeleton />
      ) : (
        <div>
          {postList.map((postObj, index) => {
            return (
              <div
                style={{
                  marginTop: index !== 0 ? "20px" : "0px",
                }}
                key={index}
              >
                <Post
                  isCommentScroll={true}
                  isMediaDisplay={true}
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
