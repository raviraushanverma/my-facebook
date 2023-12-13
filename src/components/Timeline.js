import PostList from "./PostList";

const Timeline = (props) => {
  return (
    <div className="row">
      <div className="col-md-3">hello1</div>
      <div className="col-md-6">
        <PostList />
      </div>
      <div className="col-md-3">hello2</div>
    </div>
  );
};

export default Timeline;
