import React from "react";
import styled from "styled-components";
const BaseHome = (props) => {
  return (
    <div {...props}>
      <h1>Book App</h1>
      <p>This is home page naja</p>
    </div>
  );
};

const Home = styled(BaseHome)`
  position: relative;
  top: 100px;
`;

export default Home;
