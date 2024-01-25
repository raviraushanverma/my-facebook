import { useContext, useState } from "react";
import UserAvatar from "./UserAvatar";
import MediaUpload from "./MediaUpload";
import MediaThumbnail from "./MediaThumbnail";
import { SessionContext } from "../providers/SessionProvider";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";

const CreatePost = (props) => {
  const [user] = useContext(SessionContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [mediaList, setMediaList] = useState([]);

  const onUploadHandler = (medias) => {
    setMediaList(medias);
  };

  const post = async (event) => {
    event.preventDefault();
    const data = {
      content: content,
      owner: user._id,
    };
    if (mediaList.length > 0) {
      data.medias = mediaList;
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
      document.getElementById("createPostModalClose").click();
    }
    setLoading(false);
    setContent("");
    setMediaList([]);
  };

  const onImageDeleteHandler = (index) => {
    const tempMediaList = [...mediaList];
    tempMediaList.splice(index, 1);
    setMediaList(tempMediaList);
  };

  return (
    <>
      <div className="create-post-container">
        <Link to={`/profile/${user._id}`}>
          <UserAvatar profilePicURL={props.profilePicURL} />
        </Link>
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
                id="createPostModalClose"
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
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              document
                                .getElementById("createPostModalClose")
                                .click();
                              navigate(`/profile/${user._id}`);
                            }}
                          >
                            <UserAvatar
                              userName={user.name}
                              profilePicURL={props.profilePicURL}
                            />
                          </div>
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
                      <MediaThumbnail
                        medias={mediaList}
                        onImageDelete={onImageDeleteHandler}
                      />
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={
                          content.length === 0 && mediaList.length === 0
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
