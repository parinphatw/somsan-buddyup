import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { ReactComponent as HangupIcon } from "../../icons/hangup.svg";
import { ReactComponent as MoreIcon } from "../../icons/more-vertical.svg";
import { ReactComponent as CopyIcon } from "../../icons/copy.svg";

const VideoChat = ({ mode, callId, setPage, setJoinCode, pc, firestore }) => {
  // const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

  const localRef = useRef();
  const remoteRef = useRef();

  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);

  let localStream;
  let remoteStream;

  const history = useLocation();
  useEffect(() => {
    console.log("history:", window.location);
    setupSources();
  }, [audio, video]);
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
    }

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        hangUp();
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

  const handleMicClick = async () => {
    await setAudio(!audio);
    if (audio || video) {
      localStream = await navigator.mediaDevices.getUserMedia({ video, audio });
    } else if (localStream) {
      await localStream.getTracks().map((track) => track.stop());
      localStream = null;
      localRef.current.srcObject = null;
    }
  };

  const handleWebCamClick = async () => {
    await setVideo(!video);
    // localStream?.stop();
    if (audio || video) {
      localStream = await navigator.mediaDevices.getUserMedia({ video, audio });
    } else if (localStream) {
      await localStream.getTracks().map((track) => track.stop());
      localStream = null;
      localRef.current.srcObject = null;
    }
  };

  return (
    <div>
      <video ref={localRef} autoPlay playsInline muted />
      <video ref={remoteRef} autoPlay playsInline />
      <button onClick={handleMicClick}>Microphone</button>
      <button onClick={handleWebCamClick}>Web Cam</button>
      {mode === "create" && (audio || video) && (
        <button
          onClick={() => {
            console.log("room id:", roomId);
            navigator.clipboard.writeText(
              window.location.origin + "/videotest_b/" + roomId
            );
          }}
        >
          Copy Code
        </button>
      )}
    </div>
  );
};

export default VideoChat;
