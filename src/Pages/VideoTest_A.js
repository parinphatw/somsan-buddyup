import React, { useState } from "react";
import VideoPlayer from "../Components/VideoPlayer"; // point to where the functional component is stored
import styled from "styled-components";
import firebase from "../Utils/firebase";
import VideoChat from "../Components/VideoChat";

const Container = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

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
  const [joinCode, setJoinCode] = useState("");

  return (
    <div {...props}>
      <Container>
        <VideoPlayer user={"user_x"} roomId={"user_x"} />

        <VideoChat
          mode={"create"}
          callId={joinCode}
          setJoinCode={setJoinCode}
          firestore={firestore}
          pc={pc}
        />
      </Container>
    </div>
  );
})`
  margin-top: 100px;
`;

export default VideoTestA;
