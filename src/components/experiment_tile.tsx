import React from "react";
import { Link } from "react-router-dom";

type status = "completed" | "running" | "error";

interface ExperimentTileProps {
  id: string;
  name: string;
  date: string;
  time: string;
  status: status | string;
}

export function ExperimentTile(props: ExperimentTileProps) {
  let link = "";

  switch (props.status) {
    case "completed": {
      link = `/experiment/${props.id}`;
      break;
    }
    case "running": {
      link = "/experiment/running";
      break;
    }
    case "error": {
      link = "/experiment/error";
      break;
    }
  }

  return (
    <Link to={link}>
      <div className="bg-slate-100 p-4 rounded-lg flex flex-col">
        <h1 className="font-semibold">{props.name}</h1>
        <span className="text-xs text-neutral-600">Expanse Supercomputer</span>
        <span className="text-xs mt-3">Date: {props.date}</span>
        <span className="text-xs mt-1">Time: {props.time}</span>
        <span className="text-sm mt-4">Status: {TileStatus(props.status)}</span>
      </div>
    </Link>
  );
}

function TileStatus(status: status | string) {
  let color = "";

  switch (status) {
    case "completed": {
      color = "text-green-600";
      break;
    }
    case "running": {
      color = "text-blue-600";
      break;
    }
    case "error": {
      color = "text-red-600";
      break;
    }
    default: {
      color = "text-gray-600";
    }
  }
  return (
    <span className={`text-sm font-semibold uppercase ${color}`}>{status}</span>
  );
}
