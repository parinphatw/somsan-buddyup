import React from "react";
import Video from "../Components/VideoPlayer"; // point to where the functional component is stored
import styled from "styled-components";

const VideoTestB = styled((props) => {
  return (
    <div {...props}>
      <div>Rest of app here</div>

      <Video user={"user_b"} roomId={"user_a"} />

      <div>Rest of app here</div>
    </div>
  );
})`
  margin-top: 100px;
`;

export default VideoTestB;
