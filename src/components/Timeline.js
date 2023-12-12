import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import PostList from "./PostList";

const Timeline = () => {
  return (
    <div className="row">
      <div className="col-md-3">hello1</div>
      <div className="col-md-6">
        <CreatePost />
        <PostList />
      </div>
      <div className="col-md-3">hello2</div>
    </div>
  );
};

export default Timeline;
