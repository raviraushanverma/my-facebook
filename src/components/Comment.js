import UserAvatar from "./UserAvatar";

const Comment = (props) => {
  console.log(props.data);
  return (
    <>
      <div className="commentList ">
        <p>{props.data.content}</p>
      </div>
    </>
  );
};

export default Comment;
