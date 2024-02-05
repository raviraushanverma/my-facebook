import { useEffect, useRef } from "react";

const VideoChat = () => {
  const videoElement = useRef();

  useEffect(() => {
    (async () => {
      if (videoElement && videoElement.current) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { width: "100vw", height: "100vh" },
        });
        videoElement.current.srcObject = mediaStream;
        videoElement.current.muted = true;
      }
    })();
  }, []);

  return (
    <video
      style={{ width: "100vw", height: "100vh" }}
      ref={videoElement}
      autoPlay
    />
  );
};

export default VideoChat;
