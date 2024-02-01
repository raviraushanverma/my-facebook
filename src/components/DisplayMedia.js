import VideoWidget from "./VideoWidget";

const DisplayMedia = ({ media, children }) => {
  const styleObj = {
    width: "150px",
    height: "150px",
  };
  const { resource_type, url, secure_url } = media;
  const isDev = process.env.NODE_ENV === "development";
  const src = isDev ? url : secure_url;

  return (
    <div
      style={{
        position: "relative",
        margin: "1px",
        border: "1px solid lightgray",
      }}
    >
      {children}
      {resource_type === "image" ? (
        <img width={150} height={150} src={src} alt="thumbnail" />
      ) : (
        <VideoWidget url={src} style={styleObj} />
      )}
    </div>
  );
};

export default DisplayMedia;
