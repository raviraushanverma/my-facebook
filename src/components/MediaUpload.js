import { useState } from "react";
import Modal from "./Modal";
import Loading from "./Loading";
import VideoWidget from "./VideoWidget";

const MediaUpload = ({ onSuccessUpload, isMultiple = true, children }) => {
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const mediaStyle = {
    height: "100px",
    width: "100px",
    padding: "10px",
    border: "1px solid #ffffff",
  };

  const [fileList, setFileList] = useState(null);

  const modalCloseHandler = () => {
    setVisibility(false);
    setFileList(null);
  };

  const uploadImage = async (imageData, fileType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/drwcm1tej/${
            fileType.includes("image") ? "image" : "video"
          }/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );
        const response = await res.json();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const onImageUploadHandler = async (e) => {
    if (!fileList || !files.length) {
      return;
    }
    const allImagePromises = [];
    setLoading(true);
    files.forEach((file, i) => {
      const imageData = new FormData();

      imageData.append("file", file);
      imageData.append("upload_preset", "ravi_raushan_ka_apna_facebook");
      imageData.append("cloud_name", "drwcm1tej");
      allImagePromises.push(uploadImage(imageData, file.type));
    });
    Promise.all(allImagePromises)
      .then(async (medias) => {
        setLoading(false);
        setVisibility(false);
        setFileList(null);
        const mainMedia = medias.map((media) => {
          const { asset_id, resource_type, secure_url, url } = media;
          return {
            asset_id,
            resource_type,
            secure_url,
            url,
          };
        });
        onSuccessUpload(mainMedia);
      })
      .catch((error) => {
        console.log("There is some error while uploading media", error);
        setLoading(false);
      });
  };

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  return (
    <section>
      <div
        onClick={() => {
          setVisibility(true);
        }}
      >
        {children}
      </div>
      <Modal onClose={modalCloseHandler} show={visibility}>
        <section
          className="d-flex justify-content-center"
          style={{ minHeight: "50px" }}
        >
          <input
            style={{ display: "none" }}
            className="fileInput"
            id="selectedFile"
            type="file"
            multiple={isMultiple}
            onChange={(e) => {
              setFileList(e.target.files);
            }}
          />
          <button
            className="btn btn-primary btn-lg"
            onClick={(e) => {
              document.getElementById("selectedFile").click();
            }}
          >
            <i className="fa-solid fa-camera"></i> Click here to upload images
          </button>
        </section>
        {!!files.length && (
          <div>
            <section className="uploading-image-section">
              {files.map((file, index) => {
                return (
                  <>
                    {file.type === "image" ? (
                      <img
                        key={index}
                        style={mediaStyle}
                        src={URL.createObjectURL(file)}
                        alt="uploading-pic"
                      />
                    ) : (
                      <VideoWidget
                        url={URL.createObjectURL(file)}
                        style={mediaStyle}
                      />
                    )}
                  </>
                );
              })}
            </section>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                type="button"
                disabled={loading}
                onClick={onImageUploadHandler}
              >
                {loading ? <Loading /> : <span>Upload Image on server</span>}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default MediaUpload;
