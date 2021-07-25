import React, { useState } from "react";
import VideoPlayer from "../Components/VideoPlayer"; // point to where the functional component is stored
import styled from "styled-components";
import firebase from "../Utils/firebase";
import VideoChat from "../Components/VideoChat";
import VideoChatMenu from "../Components/VideoChatMenu/VideoChatMenu";

const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

const VideoTestA = styled((props) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  return (
    <div {...props}>
      <div>Rest of app here</div>

      <VideoPlayer user={"user_x"} roomId={"user_x"} />

      <div>Rest of app here</div>
      {currentPage === "home" ? (
        <VideoChatMenu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setCurrentPage}
        />
      ) : (
        <VideoChat
          mode={currentPage}
          callId={joinCode}
          setPage={setCurrentPage}
          firestore={firestore}
          pc={pc}
        />
      )}
    </div>
  );
})`
  margin-top: 100px;
`;

export default VideoTestA;
