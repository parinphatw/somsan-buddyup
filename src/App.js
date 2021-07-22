import "./App.css";
import RouteApp from "./Pages";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <RouteApp />
      </Router>
    </>
  );
}

export default App;
