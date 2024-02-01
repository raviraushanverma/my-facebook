import { useEffect, useState } from "react";
import Modal from "./Modal";
import DisplayMedia from "./DisplayMedia";

const MediaUpload = ({ onSuccessUpload, isMultiple = true, children }) => {
  const [visibility, setVisibility] = useState(false);

  const getFileType = (file) => {
    return file.includes("image") ? "image" : "video";
  };

  const [fileList, setFileList] = useState(null);

  useEffect(() => {
    setFileList(null);
    document.getElementById("formFileLg").value = "";
  }, [visibility]);

  useEffect(() => {
    const files = !!fileList ? [...fileList] : [];
    if (files.length) {
      (async () => {
        await onImageUploadHandler(files);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);

  const modalCloseHandler = () => {
    setVisibility(false);
  };

  const uploadImageOnCloud = async (imageData, file) => {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/drwcm1tej/${getFileType(file)}/upload`,
      {
        method: "POST",
        body: imageData,
      }
    );
    const json = await res.json();
    return json;
  };

  const onImageUploadHandler = async (e) => {
    if (!fileList || !files.length) {
      return;
    }
    const allImagePromises = [];
    files.forEach((file, i) => {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "ravi_raushan_ka_apna_facebook");
      imageData.append("cloud_name", "drwcm1tej");
      allImagePromises.push(uploadImageOnCloud(imageData, file.type));
    });
    const medias = await Promise.all(allImagePromises);
    const mainMedia = medias.map((media) => {
      const { asset_id, resource_type, secure_url, url } = media;
      return { asset_id, resource_type, secure_url, url };
    });
    setVisibility(false);
    onSuccessUpload(mainMedia);
  };

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  return (
    <span>
      <span
        onClick={() => {
          setVisibility(true);
        }}
      >
        {children}
      </span>
      <Modal onClose={modalCloseHandler} show={visibility}>
        <section
          className="d-flex justify-content-center"
          style={{ minHeight: "100px" }}
        >
          <div style={{ padding: "10px" }}>
            <input
              className="form-control form-control-lg"
              id="formFileLg"
              type="file"
              multiple={isMultiple}
              onChange={(e) => {
                setFileList(e.target.files);
              }}
            />
          </div>
        </section>
        {!!files.length && (
          <section className="uploading-image-section">
            {files.map((file, index) => {
              return (
                <DisplayMedia
                  key={index}
                  media={{
                    resource_type: getFileType(file.type),
                    url: URL.createObjectURL(file),
                    secure_url: URL.createObjectURL(file),
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      color: "white",
                      top: "0px",
                      left: "0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "black",
                      opacity: 0.5,
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                    }}
                  >
                    <div
                      className="spinner-border"
                      style={{ width: "3rem", height: "3rem" }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </DisplayMedia>
              );
            })}
          </section>
        )}
      </Modal>
    </span>
  );
};

export default MediaUpload;
