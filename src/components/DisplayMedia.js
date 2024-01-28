import VideoWidget from "./VideoWidget";

const DisplayMedia = ({ media, children }) => {
  const styleObj = {
    width: "100%",
    height: "auto",
  };
  const { resource_type, url, secure_url } = media;
  const isDev = process.env.NODE_ENV === "development";
  const src = isDev ? url : secure_url;

  return (
    <div style={{ position: "relative", margin: "1px" }}>
      {children}
      {resource_type === "image" ? (
        <img width={100} height={100} src={src} alt="thumbnail" />
      ) : (
        <VideoWidget url={src} style={styleObj} />
      )}
    </div>
  );
};

export default DisplayMedia;
