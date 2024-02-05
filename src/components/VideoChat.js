import { useEffect, useRef } from "react";

const VideoChat = () => {
  const videoElement = useRef();

  useEffect(() => {
    (async () => {
      if (videoElement && videoElement.current) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            advanced: [
              { width: { exact: 2560 } },
              { width: { exact: 1920 } },
              { width: { exact: 1280 } },
              { width: { exact: 1024 } },
              { width: { exact: 900 } },
              { width: { exact: 800 } },
              { width: { exact: 640 } },
              { width: { exact: 320 } },
            ],
          },
        });
        videoElement.current.srcObject = mediaStream;
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
