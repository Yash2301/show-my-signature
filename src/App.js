import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <div>
        {/* <Navigation /> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
