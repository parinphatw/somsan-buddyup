import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/VideoPlayer"; // point to where the functional component is stored
import VideoChat from "../Components/VideoChat";
import styled from "styled-components";
import firebase from "../Utils/firebase";

const Container = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
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

const VideoTestB = styled((props) => {
  let { code } = useParams();

  //todo: use code to do something

  return (
    <div {...props}>
      <Container>
        <VideoPlayer user={"user_x"} roomId={"user_x"} />

        <VideoChat mode={"join"} callId={code} firestore={firestore} pc={pc} />
      </Container>
    </div>
  );
})`
  margin-top: 100px;
`;

export default VideoTestB;
