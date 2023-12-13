import { useState } from "react";
import Modal from "./Modal";

const MediaUpload = ({ onSuccessUpload, isMultiple = true, children }) => {
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const [fileList, setFileList] = useState(null);

  const modalCloseHandler = () => {
    setVisibility(false);
    setFileList(null);
  };

  const uploadImage = async (imageData) => {
    return new Promise(async (resolve, reject) => {
      try {
        // const res = await fetch(
        //   `${process.env.REACT_APP_SERVER_END_PONT}/media-upload`,
        //   {
        //     mode: "cors",
        //     method: "POST",
        //     body: imageData,
        //   }
        // );
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/drwcm1tej/image/upload`,
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
      allImagePromises.push(uploadImage(imageData));
    });
    Promise.all(allImagePromises)
      .then(async (medias) => {
        setLoading(false);
        setVisibility(false);
        setFileList(null);
        const mainMedia = medias.map((media) => {
          return {
            url: media.url,
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
              {files.map((file, index) => (
                <img
                  key={index}
                  className="uploading-image"
                  src={URL.createObjectURL(file)}
                  alt="uploading-pic"
                />
              ))}
            </section>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                type="button"
                disabled={loading}
                onClick={onImageUploadHandler}
              >
                {loading ? (
                  <span>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </span>
                ) : (
                  <span>Upload Image on server</span>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default MediaUpload;
