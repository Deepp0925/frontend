import React from "react";
import { Link } from "react-router-dom";
import { NewExperiment } from "../pages/new_experiment";

export function NavBar() {
  return (
    <div className="flex flex-1 md:container mx-2 md:m-auto self-center">
      <div className="title flex-1">
        <h1 className="text-2xl">AUM-UNG HSI</h1>
      </div>
      {/* <NewExperiment /> */}
    </div>
  );
}
