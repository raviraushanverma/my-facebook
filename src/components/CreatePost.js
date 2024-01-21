import { useState } from "react";
import UserAvatar from "./UserAvatar";
import MediaUpload from "./MediaUpload";
import ImageThumbnail from "./ImageThumbnail";
import { getLoggedInUser } from "../utility";
import Loading from "./Loading";

const user = getLoggedInUser();

const CreatePost = (props) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [imageList, setImageList] = useState([]);

  const onUploadHandler = (images) => {
    setImageList(images);
  };
  const post = async (event) => {
    const user = getLoggedInUser();
    event.preventDefault();
    const data = {
      content: content,
      owner: {
        userId: user._id,
        userName: user.name,
      },
    };
    if (imageList.length > 0) {
      data.images = imageList;
    }
    setLoading(true);
    const serverData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/post`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const response = await serverData.json();
    if (response.isSuccess === true) {
      props.updateData(response.post);
      document.getElementById("modalClose").click();
    }
    setLoading(false);
    setContent("");
    setImageList([]);
  };

  const onImageDeleteHandler = (index) => {
    const tempImageList = [...imageList];
    tempImageList.splice(index, 1);
    setImageList(tempImageList);
  };

  return (
    <>
      <div className="create-post-container">
        <UserAvatar />
        <input
          type="text"
          readOnly
          className="create-post-textbox"
          placeholder="What on your mind ?"
          data-bs-toggle="modal"
          data-bs-target="#createPostModal"
        />
      </div>
      <div
        className="modal fade"
        id="createPostModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title w-100 text-center">
                <b>
                  <h4>Create Post</h4>
                </b>
              </div>
              <button
                type="button"
                id="modalClose"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="wrapper">
                  <section className="post">
                    <form
                      onSubmit={(event) => {
                        post(event);
                      }}
                    >
                      <div className="content d-flex">
                        <div className="details">
                          <UserAvatar userName={user.name} />
                          <div className="privacy">
                            <i className="fas fa-user-friends" />
                            <span>Friends</span>
                            <i className="fas fa-caret-down" />
                          </div>
                        </div>
                      </div>
                      <textarea
                        style={{ textTransform: "capitalize" }}
                        placeholder={`What's on your mind, ${user.name}?`}
                        spellCheck="false"
                        value={content}
                        onChange={(event) => {
                          setContent(event.target.value);
                        }}
                      ></textarea>
                      <ImageThumbnail
                        images={imageList}
                        value={imageList}
                        onImageDelete={onImageDeleteHandler}
                      />
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={
                          content.length === 0 && imageList.length === 0
                        }
                      >
                        {loading ? <Loading /> : "Post"}
                      </button>
                    </form>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Add to Your Post</div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="post-icons">
                          <MediaUpload onSuccessUpload={onUploadHandler}>
                            <i className="fa-solid fa-camera"></i>
                          </MediaUpload>
                        </div>
                        <div className="post-icons">
                          <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="post-icons">
                          <i className="fa-regular fa-face-smile"></i>
                        </div>
                        <div className="post-icons">
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
