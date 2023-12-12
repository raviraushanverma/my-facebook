import ImageViewer from "./ImageViewer";

const AssetViewer = (props) => {
  if (props.assets.length === 1) {
    return <ImageViewer imageUrl={props.assets[0].url} />;
  } else if (props.assets.length === 2) {
    return (
      <div style={{ width: "100%", display: "flex" }}>
        <ImageViewer
          className="image-viewer"
          style={{ width: "50%", height: "300px" }}
          imageUrl={props.assets[0].url}
        />
        <ImageViewer
          style={{ width: "50%", height: "300px" }}
          imageUrl={props.assets[1].url}
        />
      </div>
    );
  } else if (props.assets.length === 3) {
    return (
      <div style={{ width: "100%", display: "flex" }}>
        <ImageViewer
          style={{ width: "50%", height: "500px" }}
          imageUrl={props.assets[0].url}
        />
        <div style={{ width: "50%" }}>
          <ImageViewer
            style={{ width: "100%", height: "250px" }}
            imageUrl={props.assets[1].url}
          />
          <ImageViewer
            style={{ width: "100%", height: "250px" }}
            imageUrl={props.assets[2].url}
          />
        </div>
      </div>
    );
  } else if (props.assets.length >= 4) {
    return (
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "50%" }}>
          <ImageViewer
            style={{ width: "100%", height: "300px" }}
            imageUrl={props.assets[0].url}
          />
          <ImageViewer
            style={{ width: "100%", height: "300px" }}
            imageUrl={props.assets[1].url}
          />
        </div>
        <div style={{ width: "50%" }}>
          <ImageViewer
            style={{ width: "100%", height: "300px" }}
            imageUrl={props.assets[2].url}
          />
          <ImageViewer
            style={{ width: "100%", height: "300px" }}
            imageUrl={props.assets[3].url}
            textCount={props.assets.length - 4}
          />
        </div>
      </div>
    );
  }
  return <div>hello</div>;
};

export default AssetViewer;
