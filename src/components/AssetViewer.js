import MediaViewer from "./MediaViewer";

const AssetViewer = (props) => {
  if (props.assets.length === 1) {
    return <MediaViewer style={{ width: "100%" }} media={props.assets[0]} />;
  } else if (props.assets.length === 2) {
    return (
      <div style={{ width: "100%", display: "flex" }}>
        <MediaViewer
          className="image-viewer"
          style={{ width: "50%", height: "300px" }}
          media={props.assets[0]}
        />
        <MediaViewer
          style={{ width: "50%", height: "300px" }}
          media={props.assets[1]}
        />
      </div>
    );
  } else if (props.assets.length === 3) {
    return (
      <div style={{ width: "100%", display: "flex" }}>
        <MediaViewer
          style={{ width: "50%", height: "500px" }}
          media={props.assets[0]}
        />
        <div style={{ width: "50%" }}>
          <MediaViewer
            style={{ width: "100%", height: "250px" }}
            media={props.assets[1]}
          />
          <MediaViewer
            style={{ width: "100%", height: "250px" }}
            media={props.assets[2]}
          />
        </div>
      </div>
    );
  } else if (props.assets.length >= 4) {
    return (
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "50%" }}>
          <MediaViewer
            style={{ width: "100%", height: "300px" }}
            media={props.assets[0]}
          />
          <MediaViewer
            style={{ width: "100%", height: "300px" }}
            media={props.assets[1]}
          />
        </div>
        <div style={{ width: "50%" }}>
          <MediaViewer
            style={{ width: "100%", height: "300px" }}
            media={props.assets[2]}
          />
          <MediaViewer
            style={{ width: "100%", height: "300px" }}
            media={props.assets[3]}
            textCount={props.assets.length - 4}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default AssetViewer;
