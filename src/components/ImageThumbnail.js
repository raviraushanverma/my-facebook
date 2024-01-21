const ImageThumbnail = (props) => {
  return (
    <section className="d-flex justify-content-between align-items-center flex-wrap">
      {props.images.map((image, index) => {
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
            <img
              key={index}
              width={100}
              height={100}
              src={image.url}
              alt="thumbnail"
            />
          </div>
        );
      })}
    </section>
  );
};

export default ImageThumbnail;
