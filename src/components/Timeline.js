import PostList from "./PostList";

const Timeline = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">hello</div>
        <div className="col-md-6">
          <PostList isProfilePage={false} />
        </div>
        <div className="col-md-3">hello2</div>
      </div>
    </div>
  );
};

export default Timeline;
