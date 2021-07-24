import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import firebase from "../../Utils/firebase";

export const Video = (props) => {
  const { user } = props;
  const playerRef = useRef(null);
  const rtdbRef = firebase.database().ref("room/user_a");

  // const [playing, setPlaying] = useState(false);
  const [videoState, setVideoState] = useState({
    roomId: undefined,
    playing: false,
  });

  const [currentTime, setCurrentTime] = useState(0);

  // fetch data from realtime database
  useEffect(() => {
    rtdbRef.on("value", (snapshot) => {
      const data = snapshot.val();

      console.log("rtdb data:", data);
      if (data) {
        const { currentTime: ct, playing, roomId } = data;
        setVideoState({ playing, roomId });
        setCurrentTime(ct);

        const realCurrentTime = parseInt(playerRef.current?.getCurrentTime());
        if (Math.abs(ct - realCurrentTime) > 2) {
          playerRef.current?.seekTo(ct, "seconds");
        }

        console.log("after updating: (video state):", videoState);
        console.log("after updating (current time):", currentTime);
      } else {
        rtdbRef.set({ roomId: "user_a", currentTime: 0, playing: false });
      }
    });
  }, []);

  // set current time
  useEffect(() => {
    const i = setInterval(() => {
      const realCurrentTime = parseInt(playerRef.current?.getCurrentTime());
      console.log("diff:", currentTime - realCurrentTime);
      if (
        realCurrentTime !== currentTime &&
        Math.abs(realCurrentTime - currentTime) <= 2
      ) {
        rtdbRef.update({ currentTime: realCurrentTime });
        setCurrentTime(realCurrentTime);
        console.log("updated!!!!!!!!!!!!!!!!", currentTime, realCurrentTime);
      }

      return () => {
        console.log("current time:", currentTime);
      };
    }, 500);

    // return () => clearInterval(i);
  }, []);

  // to be deleted
  useEffect(() => {
    console.log(playerRef);
    console.log(playerRef.current?.getCurrentTime());
    console.log(playerRef.current?.props?.playing);

    // setVideoState({ playing: true, currentTime: 20 });
    // console.log("video state:", videoState);
  }, [videoState.playing]);

  const handlePlay = () => {
    console.log("continue playing now...");
    setVideoState({ ...videoState, playing: true });

    rtdbRef.update({ playing: true });
    console.log("video state (interval):", videoState);
  };

  const handlePause = () => {
    console.log("Pausing now...");
    setVideoState({ ...videoState, playing: false });
    rtdbRef.update({ playing: false });
    console.log("video state (interval):", videoState);
  };

  const handleSeek = () => {
    const realCurrentTime = parseInt(playerRef.current?.getCurrentTime());

    setCurrentTime(realCurrentTime, () => {
      rtdbRef.update({ currentTime: realCurrentTime });
    });
  };

  const handleClick = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  return (
    <>
      <ReactPlayer
        url="test.mp4"
        ref={playerRef}
        controls
        playing={videoState.playing}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        playbackRate={1}
        volume={0.01}
        width="896px"
        height="504px"
      />
      <button onClick={handleClick}>click me</button>
    </>
  );
};

export default Video;
