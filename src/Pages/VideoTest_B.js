import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/VideoPlayer"; // point to where the functional component is stored
import VideoChat from "../Components/VideoChat";
import VideoChatMenu from "../Components/VideoChatMenu/VideoChatMenu";
import styled from "styled-components";
import firebase from "../Utils/firebase";

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

const VideoTestB = styled((props) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");
  let { code } = useParams();

  //todo: use code to do something

  return (
    <div {...props}>
      <div>Rest of app here 5555555</div>

      <VideoPlayer user={"user_a"} roomId={"user_a"} />

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

export default VideoTestB;
