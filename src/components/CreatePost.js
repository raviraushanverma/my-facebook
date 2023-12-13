import { useRef } from "react";
import { useState } from "react";
import UserAvatar from "./UserAvatar";

const CreatePost = (props) => {
  const [alertData, setAlertData] = useState({ enable: false });
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files;

    setImage(file);
  };
  const post = async (event) => {
    event.preventDefault();
    const data = {
      content: content,
    };
    const serverData = await fetch("http://localhost:5000/post", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await serverData.json();
    setAlertData({ ...response, enable: true });
    if (response.isSuccess === true) {
      document.getElementById("modalClose").click();
    }
    props.updateData(response.post);
  };

  const imageUploadImage = async () => {
    const imagesdata = {
      images: image,
    };
    const imagePost = await fetch("http://localhost:5000/postimage", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(imagesdata),
    });
  };

  return (
    <>
      <div className="create-post-container">
        <UserAvatar profilePicURL={""} />
        <input
          type="text"
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
                        imageUploadImage();
                      }}
                    >
                      <div className="content d-flex">
                        <UserAvatar />
                        <div className="details">
                          <p>Ravi Raushan</p>
                          <div className="privacy">
                            <i className="fas fa-user-friends" />
                            <span>Friends</span>
                            <i className="fas fa-caret-down" />
                          </div>
                        </div>
                      </div>
                      <textarea
                        placeholder="What's on your mind, Ravi Raushan?"
                        spellCheck="false"
                        required
                        onChange={(event) => {
                          setContent(event.target.value);
                        }}
                      ></textarea>
                      <div className="options">
                        <p>Add to Your Post</p>
                        <div className="list">
                          <div onClick={handleImageClick}>
                            {image ? (
                              <img src={URL.createObjectURL(image)} alt="" />
                            ) : (
                              <img
                                src="../assets/images/istockphoto-1248723171-612x612.jpg"
                                alt=""
                              />
                            )}
                            <input
                              type="file"
                              ref={inputRef}
                              onChange={handleImageChange}
                            ></input>
                          </div>
                          <div>
                            <i className="fa-solid fa-user"></i>
                          </div>
                          <div>
                            <i className="fa-regular fa-face-smile"></i>
                          </div>
                          <div>
                            <i className="fa-solid fa-location-dot"></i>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg">
                        Post
                      </button>
                    </form>
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
