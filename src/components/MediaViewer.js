import VideoWidget from "./VideoWidget";

const MediaViewer = (props) => {
  const { url, secure_url, resource_type } = props.media;
  const imgStyle = { ...props.style, opacity: "0.7" };

  const src = process.env.NODE_ENV === "development" ? url : secure_url;

  if (!props.textCount) {
    return (
      <>
        {resource_type === "image" ? (
          <img
            className="image-viewer-img"
            style={props.style}
            src={src}
            alt="post-data"
          />
        ) : (
          <VideoWidget url={src} style={imgStyle} />
        )}
      </>
    );
  }

  return (
    <div className="image-viewer-container">
      {resource_type === "image" ? (
        <img
          className="image-viewer-img"
          style={imgStyle}
          src={src}
          alt="post-data"
        />
      ) : (
        <VideoWidget url={src} style={imgStyle} />
      )}
      <h1 className="centered">{props.textCount}+</h1>
    </div>
  );
};

export default MediaViewer;
