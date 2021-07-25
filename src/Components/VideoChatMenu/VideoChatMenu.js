import React from "react";

function VideoChatMenu({ joinCode, setJoinCode, setPage }) {
  // todo: change "localhost to something else"
  return (
    <div className="home">
      <div className="create box">
        <button onClick={() => setPage("create")}>Create Call</button>
      </div>

      <div className="answer box">
        <input
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Join with code"
        />
        <button onClick={() => setPage("join")}>Answer</button>
      </div>
    </div>
  );
}

export default VideoChatMenu;
