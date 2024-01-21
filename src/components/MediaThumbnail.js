import VideoWidget from "./VideoWidget";

const MediaThumbnail = (props) => {
  const styleObj = {
    width: "100%",
    height: "auto",
  };

  return (
    <section className="d-flex justify-content-between align-items-center flex-wrap">
      {props.medias.map((media, index) => {
        return (
          <div style={{ position: "relative", margin: "1px" }} key={index}>
            <div
              style={{
                position: "absolute",
                color: "white",
                top: "0px",
                left: "0px",
                width: "100%",
                backgroundColor: "black",
                opacity: 0.5,
              }}
            >
              <button
                style={{
                  float: "right",
                  opacity: 1,
                }}
                type="button"
                className="btn-close btn-close-white"
                onClick={() => props.onImageDelete(index)}
              />
            </div>
            {media.resource_type === "image" ? (
              <img
                key={index}
                width={100}
                height={100}
                src={
                  process.env.NODE_ENV === "development"
                    ? media.url
                    : media.secure_url
                }
                alt="thumbnail"
              />
            ) : (
              <VideoWidget
                url={
                  process.env.NODE_ENV === "development"
                    ? media.url
                    : media.secure_url
                }
                style={styleObj}
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default MediaThumbnail;
