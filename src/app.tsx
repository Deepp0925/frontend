import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ConfusionMatrixTable } from "./components/matrix";
import { NavBar } from "./components/navbar";
import { Experiment_Error } from "./pages/experiment_error";
import { Experiment_Running } from "./pages/experiment_running";
import { Home } from "./pages/home";
import { Realtime_experiment } from "./pages/realtime_experiment";
export function App() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="h-20 mt-3">
          <NavBar />
        </div>

        <div className="md:container w-24/25 mx-auto mb-10">
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route
                path="/experiment/running"
                element={<Experiment_Running />}
              /> */}
              {/* <Route path="/experiment/error" element={<Experiment_Error />} /> */}
              <Route path="/experiment/:id" element={<Realtime_experiment />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </HashRouter>
        </div>
      </div>
    </>
  );
}
export default App;
