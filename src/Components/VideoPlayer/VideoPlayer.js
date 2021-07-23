import React, { useEffect, useRef, useState } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
import ReactPlayer from "react-player";

export const VideoJS = () => {
  const ref = useRef(null);

  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    console.log("continue playing now...");
    setPlaying(true);
  };

  const handlePause = () => {
    console.log("Pausing now...");
    setPlaying(false);
  };

  useEffect(() => {
    // setPlaying(true);
    const i = setInterval(() => {
      console.log(ref);
      console.log(ref.current?.getCurrentTime());
      console.log(ref.current?.props?.playing);
    }, 10000);

    // return () => {
    //   console.log("clean up...");
    //   clearInterval(i);
    // };
  }, [playing]);

  return (
    <ReactPlayer
      url="test.mp4"
      ref={ref}
      controls
      playing={playing}
      onPlay={handlePlay}
      onPause={handlePause}
      playbackRate={1}
      volume={0.01}
      width="896px"
      height="504px"
    />
  );
};

// const VideoJS = (props) => {
//   const videoRef = React.useRef(null);
//   const { options } = props;

//   // This seperate functional component fixes the removal of the videoelement
//   // from the DOM when calling the dispose() method on a player
//   const VideoHtml = (props) => (
//     <div data-vjs-player>
//       <video ref={videoRef} className="video-js vjs-big-play-centered" />
//     </div>
//   );

//   React.useEffect(() => {
//     const videoElement = videoRef.current;
//     let player;
//     if (videoElement) {
//       player = videojs(videoElement, options, () => {
//         console.log("player is ready");
//       });
//     }
//     return () => {
//       if (player) {
//         player.dispose();
//       }
//     };
//   }, [options]);

//   return <VideoHtml />;
// };

export default VideoJS;
