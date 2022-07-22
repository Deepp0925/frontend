import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Home } from "./pages/home";
import { Realtime_experiment } from "./pages/realtime_experiment";
export function App() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="h-20 mt-3">
        <NavBar />
      </div>

      <div className="md:container w-24/25 mx-auto mb-10">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiment/:id" element={<Realtime_experiment />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
export default App;
