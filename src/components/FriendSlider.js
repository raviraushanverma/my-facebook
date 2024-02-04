import { useContext, useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import FriendStateButton from "./FriendStateButton";
import { Link } from "react-router-dom";

function Arrow({ children, disabled, onClick }) {
  return (
    <div
      style={{
        opacity: disabled ? "0" : "1",
        userSelect: "none",
      }}
    >
      <button
        className="btn btn-info rounded-circle"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <i className="fa-solid fa-arrow-left"></i>
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } =
    useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = useState(
    !visibleElements.length && isLastItemVisible
  );
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <i className="fa-solid fa-arrow-right"></i>
    </Arrow>
  );
}

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const UserCard = ({ user, isFriendStateButtonShow }) => {
  const { profilePicURL } = user;
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      className="card"
      style={{
        width: "200px",
        margin: "10px",
        borderRadius: "0px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div
        style={{
          height: "100px",
          display: "flex",
        }}
      >
        <Link to={`/profile/${user._id}`} style={{ width: "100%" }}>
          {profilePicURL ? (
            <img
              src={isDev ? profilePicURL.url : profilePicURL.secure_url}
              className="card-img-top friend-slider-image"
              alt="user-card"
            />
          ) : (
            <div
              className="card-img-top friend-slider-image"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                style={{
                  fontSize: "5em",
                }}
                className="fas fa-user-alt text-info"
              ></i>
            </div>
          )}
        </Link>
      </div>
      <div
        className="card-body"
        style={{ textAlign: "center", marginTop: "80px" }}
      >
        <h6 className="card-title" style={{ textTransform: "capitalize" }}>
          {user.name}
        </h6>
        {isFriendStateButtonShow && (
          <FriendStateButton user={user} isProfilePage={false} />
        )}
      </div>
    </div>
  );
};
const FriendSlider = ({
  friendList,
  heading,
  isFriendStateButtonShow = true,
}) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <ScrollMenu
        Header={
          <h6 style={{ textAlign: "center", paddingTop: "10px" }}>{heading}</h6>
        }
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
      >
        {friendList.map((friend) => (
          <UserCard
            user={friend}
            key={friend._id}
            isFriendStateButtonShow={isFriendStateButtonShow}
          />
        ))}
      </ScrollMenu>
    </div>
  );
};

export default FriendSlider;
