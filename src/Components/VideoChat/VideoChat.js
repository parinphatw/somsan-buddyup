import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import { StylesProvider } from "@material-ui/core/styles";

const VideoChatContainer = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

const VideoChat = ({ mode, callId, pc, firestore }) => {
  // const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);
  const [videoChat, setVideoChat] = useState(false);

  const localRef = useRef();
  const remoteRef = useRef();

  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);

  let localStream;
  let remoteStream;

  useEffect(() => {
    setVideoChat(true);
  }, []);

  useEffect(() => {
    console.log("history:", window.location);
    setupSources();
  }, [audio, video]);

  useEffect(() => {
    setInterval(() => {
      console.log(pc.connectionState);
    }, 2000);
  }, []);

  const setupSources = async () => {
    console.log("i found you");
    localStream =
      audio || video
        ? await navigator.mediaDevices.getUserMedia({ video, audio })
        : null;
    remoteStream = new MediaStream();

    localStream?.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    if (mode === "create") {
      const callDoc = firestore.collection("calls").doc();
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");

      await setRoomId(callDoc.id);

      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } else if (mode === "join") {
      const callDoc = firestore.collection("calls").doc(callId);
      const answerCandidates = callDoc.collection("answerCandidates");
      const offerCandidates = callDoc.collection("offerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      console.log("connection state:", pc.connectionState);
    }

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        hangUp();
        setVideoChat(false);
      }
    };
  };

  const hangUp = async () => {
    pc.close();

    if (roomId) {
      let roomRef = firestore.collection("calls").doc(roomId);
      await roomRef
        .collection("answerCandidates")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      await roomRef
        .collection("offerCandidates")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });

      await roomRef.delete();
    }

    window.location.reload();
  };

  // const handleMicClick = async () => {
  //   await setAudio(!audio);
  //   if (audio || video) {
  //     localStream = await navigator.mediaDevices.getUserMedia({ video, audio });
  //   } else if (localStream) {
  //     await localStream.getTracks().map((track) => track.stop());
  //     localStream = null;
  //     localRef.current.srcObject = null;
  //   }
  // };

  // const handleWebCamClick = async () => {
  //   await setVideo(!video);
  //   // localStream?.stop();
  //   if (audio || video) {
  //     localStream = await navigator.mediaDevices.getUserMedia({ video, audio });
  //   } else if (localStream) {
  //     await localStream.getTracks().map((track) => track.stop());
  //     localStream = null;
  //     localRef.current.srcObject = null;
  //   }
  // };

  const CopyLinkButton = styled(({ className }) => {
    return (
      <StylesProvider injectFirst>
        <Button
          onClick={() => {
            console.log("room id:", roomId);
            console.log("connection state:", pc.connectionState);
            navigator.clipboard.writeText(
              window.location.origin + "/videotest_b/" + roomId
            );
          }}
          className={className}
          variant={"contained"}
        >
          <LinkIcon />
          <div>Copy Link</div>
        </Button>
      </StylesProvider>
    );
  })`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #faa91a;
  `;

  return (
    videoChat && (
      <div>
        <VideoChatContainer className={"container"}>
          <video ref={localRef} autoPlay playsInline muted width={200} />
          <video ref={remoteRef} autoPlay playsInline width={200} />
          {/* <button onClick={handleMicClick}>Microphone</button>
          <button onClick={handleWebCamClick}>Web Cam</button> */}
          {mode === "create" &&
            (audio || video) &&
            pc.connectionState === "new" && <CopyLinkButton />}
        </VideoChatContainer>
      </div>
    )
  );
};

export default VideoChat;
