import ImageViewer from "./ImageViewer";

const MediaSlider = (props) => {
  return (
    <div
      className="modal fade"
      id="mediaSlidlerModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog   modal-fullscreen">
        <div className="modal-content">
          <img
            className="image-viewer-img"
            src={
              "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            }
            alt="post-data"
            data-bs-toggle="modal"
            data-bs-target="#mediaSlidlerModal"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaSlider;
