import React from "react";
import { Loading } from "../components/loading";

export function Experiment_Running() {
  return (
    <div className="flex flex-1 flex-col items-center mt-40">
      <div>
        <Loading />
        <div className="mt-12 w-full text-center">
          <span className="font-thin text-3xl">
            This experiment is currently running...
            <br />
            Please come back here later.
          </span>
        </div>
      </div>
    </div>
  );
}
