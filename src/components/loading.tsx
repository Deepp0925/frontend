import React from "react";
import "./loading.scss";
interface LoadingProps {
  word?: string;
}

export function Loading() {
  // if you change the number of character make sure to change
  // the number in the 'loading.scss' file
  const loading = "Loading...".toUpperCase();
  return (
    <div className="loading text-center">
      <div className="loading-text">
        {loading.split("").map((letter, index) => (
          <span key={index} className="loading-text-words">
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
