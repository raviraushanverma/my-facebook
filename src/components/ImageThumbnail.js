const ImageThumbnail = (props) => {
  return (
    <section className="d-flex justify-content-between align-items-center flex-wrap">
      {props.images.map((image) => {
        return (
          <img
            style={{
              padding: "3px",
              margin: "3px",
              border: "1px solid black",
            }}
            width={100}
            height={100}
            src={image.url}
            alt="thumbnail"
          />
        );
      })}
    </section>
  );
};

export default ImageThumbnail;
