import React from "react";
import { ConfusionMatrixTable } from "../components/matrix";
import { ExperimentDetails } from "../utils/parseExpFile";

interface ExperimentResultsProps {
  details: ExperimentDetails;
}

export function ExperimentResults({ details }: ExperimentResultsProps) {
  const imgs = {
    gt: new URL("../imgs/gt.png", import.meta.url),
    prediction: new URL("../imgs/prediction.png", import.meta.url),
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="mt-5 col-span-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-3">
          {Object.entries(details.additional_info).map(([key, value]) => (
            <div className="col-span-1 mt-5" key={key}>
              <label className="text-sm font-regular text-indigo-800">
                {key.replaceAll("_", " ").toUpperCase()}
              </label>
              <br />
              <span className="text-lg">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 mt-5 items-center flex flex-col">
            <img
              src={imgs.gt as unknown as string}
              alt="gt image"
              className="w-48 rounded-md hover:shadow-2xl"
            />
            <span className="mt-2">Ground Truth</span>
          </div>
          <div className="col-span-1 mt-5 items-center flex flex-col">
            <img
              src={imgs.prediction as unknown as string}
              alt="prediction image"
              className="w-48 rounded-md hover:shadow-2xl"
            />
            <span className="mt-2">Prediction</span>
          </div>
        </div>
      </div>

      <div className="w-full mt-20">
        <ConfusionMatrixTable
          matrix={details.confusion_matrix}
          classes={Object.keys(details.f1_score)}
        />
      </div>

      <div className="f1-score mt-16">
        <span className="text-md font-semibold">F1 Scores</span>
      </div>

      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {Object.entries(details.f1_score).map(([key, value]) => (
          <div className="col-span-1 overflow-hidden truncate" key={key}>
            <label className="text-sm font-regular text-indigo-800" title={key}>
              {key.toUpperCase()}
            </label>
            <br />
            <span className="text-lg">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h1 className="text-lg font-semibold">Download</h1>
        <button className="mt-3 w-full md:w-auto rounded-md bg-teal-500 text-white p-4">
          Download All files as ZIP
        </button>
      </div>
    </>
  );
}
