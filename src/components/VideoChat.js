import { useEffect, useRef } from "react";

const VideoCall = () => {
  const videoElement = useRef(null);

  useEffect(() => {
    const mediaStream = (async () => {
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
        if (videoElement && videoElement.current) {
          videoElement.current.srcObject = mediaStream;
        }
        return mediaStream;
      }
    })();

    return async () => {
      const stream = await mediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div>
      <video
        style={{ width: "100%", height: "100%" }}
        ref={videoElement}
        autoPlay
      />
    </div>
  );
};

export default VideoCall;
