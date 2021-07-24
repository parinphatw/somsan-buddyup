import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../Utils/firebase";

const BaseHome = (props) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const createToDo = () => {
    const toDoRef = firebase.database().ref("testnaja/" + text);
    const toDo = {
      text,
      completed: false,
    };
    toDoRef.set(toDo);
  };

  return (
    <div {...props}>
      <h1>Book App</h1>
      <p>This is home page naja</p>
      <input type="text" onChange={handleChange} />
      <button onClick={createToDo}>Click me</button>
    </div>
  );
};

const Home = styled(BaseHome)`
  position: relative;
  top: 100px;
`;

export default Home;
