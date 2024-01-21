const VideoWidget = ({ url, style }) => {
  return (
    <video autoPlay={true} controls style={style}>
      <source src={url} />
    </video>
  );
};

export default VideoWidget;
