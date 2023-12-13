import { useNavigate } from "react-router-dom";

const ImageViewer = (props) => {
  const navigate = useNavigate();

  if (!props.textCount) {
    return (
      <img
        className="image-viewer-img"
        style={props.style}
        src={props.imageUrl}
        alt="post-data"
        onClick={() => {
          navigate("/photo");
        }}
      />
    );
  }
  const imgStyle = { ...props.style, opacity: "0.7" };
  return (
    <div className="image-viewer-container">
      <img
        className="image-viewer-img"
        style={imgStyle}
        src={props.imageUrl}
        alt="post-data"
        onClick={() => {
          navigate("/photo");
        }}
      />
      <h1 className="centered">{props.textCount}+</h1>
    </div>
  );
};

export default ImageViewer;
