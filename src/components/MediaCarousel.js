import React from "react";
import { Carousel } from "react-responsive-carousel";
import VideoWidget from "./VideoWidget";

const MediaCarousel = ({ mediaList }) => {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <Carousel
      autoPlay={false}
      emulateTouch={true}
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      useKeyboardArrows
      dynamicHeight={200}
    >
      {mediaList.map(({ asset_id, resource_type, secure_url, url }) => {
        return (
          <div key={asset_id}>
            {resource_type === "image" ? (
              <img src={isDev ? url : secure_url} alt="carousel-media" />
            ) : (
              <VideoWidget url={isDev ? url : secure_url} />
            )}
          </div>
        );
      })}
    </Carousel>
  );
};

export default MediaCarousel;
