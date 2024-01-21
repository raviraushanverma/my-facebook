import { useNavigate } from "react-router-dom";
import VideoWidget from "./VideoWidget";

const MediaViewer = (props) => {
  const navigate = useNavigate();

  const { url, resource_type } = props.media;
  const imgStyle = { ...props.style, opacity: "0.7" };

  if (!props.textCount) {
    return (
      <>
        {resource_type === "image" ? (
          <img
            className="image-viewer-img"
            style={props.style}
            src={url}
            alt="post-data"
            onClick={() => {
              navigate("/photo");
            }}
          />
        ) : (
          <VideoWidget url={url} style={imgStyle} />
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
          src={url}
          alt="post-data"
          onClick={() => {
            navigate("/photo");
          }}
        />
      ) : (
        <VideoWidget url={url} style={imgStyle} />
      )}

      <h1 className="centered">{props.textCount}+</h1>
    </div>
  );
};

export default MediaViewer;
