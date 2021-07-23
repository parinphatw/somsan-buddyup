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

document.title =
  "Skooldio (สคูลดิโอ) | คอร์สเรียนออนไลน์และเวิร์กชอปพัฒนาทักษะ";

export default App;
