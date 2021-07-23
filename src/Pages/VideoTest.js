import React from "react";
import VideoJS from "../Components/VideoPlayer"; // point to where the functional component is stored
import styled from "styled-components";

const VideoTest = styled((props) => {
  return (
    <div {...props}>
      <div>Rest of app here</div>

      <VideoJS />

      <div>Rest of app here</div>
    </div>
  );
})`
  margin-top: 100px;
`;

export default VideoTest;
