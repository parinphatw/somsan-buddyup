import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import firebase from "../../Utils/firebase";

export const VideoPlayer = (props) => {
  const { user, roomId } = props;
  const playerRef = useRef(null);
  const rtdbRef = firebase.database().ref("room/" + roomId);

  // const [playing, setPlaying] = useState(false);
  const [videoState, setVideoState] = useState({
    roomId: undefined,
    playing: false,
  });

  const [currentTime, setCurrentTime] = useState(0);

  // fetch data from realtime database
  useEffect(() => {
    rtdbRef.on("value", async (snapshot) => {
      const data = snapshot.val();

      console.log("rtdb data:", data);
      if (data) {
        const { currentTime: ct, playing, roomId } = data;
        await setVideoState({ playing, roomId });
        await setCurrentTime(ct);

        const realCurrentTime = parseInt(playerRef.current?.getCurrentTime());
        if (Math.abs(ct - realCurrentTime) > 2) {
          playerRef.current?.seekTo(ct, "seconds");
        }
      } else {
        await rtdbRef.set({ roomId: "user_x", currentTime: 0, playing: false });
      }
    });
  }, []);

  // set current time
  // useEffect(() => {

  let interval;
  const handleStart = () => {
    interval = setInterval(async () => {
      const realCurrentTime = parseInt(
        playerRef.current?.getCurrentTime() ?? 0
      );
      // console.log("diff:", currentTime - realCurrentTime);
      if (realCurrentTime !== currentTime) {
        // console.log("bugs of current time:", realCurrentTime);
        await rtdbRef.update({ currentTime: realCurrentTime });
        await setCurrentTime(realCurrentTime);
        // console.log("updated!!!!!!!!!!!!!!!!", currentTime, realCurrentTime);
      }

      return () => {
        console.log("current time:", currentTime);
      };
    }, 1000);
  };

  const handleEnded = () => {
    clearInterval(interval);
  };

  // return () => clearInterval(i);
  // }, []);

  // to be deleted
  // useEffect(() => {
  //   console.log(playerRef);
  //   console.log(playerRef.current?.getCurrentTime());
  //   console.log(playerRef.current?.props?.playing);
  //   console.log("current fucking time:", currentTime);

  //   // setVideoState({ playing: true, currentTime: 20 });
  //   // console.log("video state:", videoState);
  // }, [videoState.playing]);

  const handlePlay = async () => {
    console.log("continue playing now...");
    await setVideoState({ ...videoState, playing: true });

    await rtdbRef.update({ playing: true });
    console.log("video state (interval):", videoState);
  };

  const handlePause = async () => {
    console.log("Pausing now...");
    await setVideoState({ ...videoState, playing: false });
    await rtdbRef.update({ playing: false });
    console.log("video state (interval):", videoState);
  };

  const handleSeek = async () => {
    const realCurrentTime = parseInt(playerRef.current?.getCurrentTime());

    await setCurrentTime(realCurrentTime);
    await rtdbRef.update({ currentTime: realCurrentTime });
  };

  // const handleClick = () => {
  //   setVideoState({ ...videoState, playing: !videoState.playing });
  // };

  return (
    <>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=aMyO6GNkfpo&ab_channel=KeshiVEVO"
        ref={playerRef}
        controls
        autoPlay
        onStart={handleStart}
        onEnded={handleEnded}
        playing={videoState.playing}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        playbackRate={1}
        volume={0.01}
        width="896px"
        height="504px"
      />
      {/* <button onClick={handleClick}>click me</button> */}
    </>
  );
};

export default VideoPlayer;
