import React from "react";
import { ExperimentTile } from "../components/experiment_tile";

export function Home() {
  const experiments = [
    {
      id: "1",
      name: "Experiment 1",
      date: "2020-01-01",
      time: "12:00",
      status: "completed",
    },
    {
      id: "2",
      name: "Experiment 2",
      date: "2020-01-01",
      time: "12:00",
      status: "running",
    },
    {
      id: "3",
      name: "Experiment 3",
      date: "2020-01-01",
      time: "12:00",
      status: "error",
    },
    {
      id: "4",
      name: "Experiment 4",
      date: "2020-01-01",
      time: "12:00",
      status: "completed",
    },
    {
      id: "5",
      name: "Experiment 5",
      date: "2020-01-01",
      time: "12:00",
      status: "completed",
    },
  ];

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {experiments.map((experiment) => (
        <div className="col-span-1" key={experiment.id}>
          <ExperimentTile {...experiment} />
        </div>
      ))}
    </div>
  );
}
