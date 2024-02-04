import { createContext, useContext, useEffect, useState } from "react";
import { EventSourceContext } from "./EventSourceProvider";

export const PostContext = createContext();

const PostProvider = (props) => {
  const [postList, setPostList] = useState([]);
  const [isPostListLoading, setIsPostListLoading] = useState(true);
  const { eventSource } = useContext(EventSourceContext);

  const onEventMessage = (event) => {
    const eventStream = JSON.parse(event.data);
    if (eventStream && eventStream.postStream) {
      const { postStream } = eventStream;
      if (postStream.operationType === "insert") {
        if (
          postList.findIndex((post) => post._id === postStream.newPost._id) ===
          -1
        ) {
          setPostList([postStream.newPost, ...postList]);
        }
      } else if (postStream.operationType === "delete") {
        const tempPostData = [...postList];
        const postObjIndex = tempPostData.findIndex((notify) => {
          return notify._id === postStream.deletedPostId;
        });
        if (postObjIndex !== -1) {
          tempPostData.splice(postObjIndex, 1);
          setPostList(tempPostData);
        }
      }
    }
  };

  useEffect(() => {
    if (eventSource) {
      eventSource.addEventListener("message", onEventMessage);
    }
    return () => {
      if (eventSource) {
        eventSource.removeEventListener("message", onEventMessage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventSource, postList]);

  return (
    <PostContext.Provider
      value={{ postList, setPostList, isPostListLoading, setIsPostListLoading }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostProvider;
