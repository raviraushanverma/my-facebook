const PostSkeleton = () => {
  return (
    <div className="loading-skeleton">
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col">
          <div className="card">
            <img
              src="//placekitten.com/300/200"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col">
          <div className="card">
            <img
              src="//placekitten.com/300/200"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
