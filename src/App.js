import "./App.css";
import RouteApp from "./Pages";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title =
      "Skooldio (สคูลดิโอ) | คอร์สเรียนออนไลน์และเวิร์กชอปพัฒนาทักษะ";
  }, []);
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
