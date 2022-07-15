import React from "react";

export function Experiment_Error() {
  return (
    <div className="flex flex-1 flex-col items-center mt-40">
      <div>
        <div className="mt-12 w-full text-center">
          <span className="font-thin text-3xl">
            An error occurred while running this experiment.
          </span>
        </div>
      </div>
    </div>
  );
}
