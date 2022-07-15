import React from "react";
import { ConfusionMatrix } from "../pkgs";
import "./matrix.scss";

interface ConfusionMatrixProps {
  matrix: number[][];
  classes: string[];
}

export function ConfusionMatrixTable({
  matrix,
  classes,
}: ConfusionMatrixProps) {
  const scale_labels = ["0.0", "0.25", "0.5", "0.75", "1.0"];

  // creates the confusion matrix
  let cnfs_mtrx = new ConfusionMatrix({
    labels: classes,
    matrix,
  });

  // retrieve the max and the min value from the matrix
  const max_val = cnfs_mtrx.getMinAndMax()!.max;

  // maintains the state of the view
  const [isPercentView, setIsOpen] = React.useState(true);

  // toggles if the percent view is shown or the actual value is shown
  const togglePercentView = () => {
    setIsOpen(!isPercentView);
  };

  return (
    <>
      <div className="mtrx-scale">
        {/* Scale  */}
        <div className="mtrx-scale-item flex w-full justify-between">
          {scale_labels.map((label, index) => (
            <span key={index} className="text-xs truncate">
              {label}
            </span>
          ))}
        </div>
        <div className="scale"></div>
      </div>
      {/* Table */}
      <div className="table-container mt-5">
        <table onClick={togglePercentView}>
          <tr>
            <th></th>
            {classes.map((className, index) => (
              <th key={index}>
                <div title={className}>{className}</div>
              </th>
            ))}
          </tr>
          {
            // iterates through the matrix and creates the table
            matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="truncate" title={classes[rowIndex]}>
                  {classes[rowIndex]}
                </td>
                {row.map((cell, index) => (
                  <Cell
                    percent={Math.round((cell * 100) / max_val)}
                    key={index}
                    val={cell}
                    isPercentView={isPercentView}
                  />
                ))}
              </tr>
            ))
          }
        </table>
      </div>
    </>
  );
}

interface CellProps {
  percent: number;
  val: number;
  isPercentView?: boolean;
}
function Cell({ percent, val, isPercentView = false }: CellProps) {
  if (percent > 100) {
    percent = 100;
  } else if (percent < 0) {
    percent = 0;
  }

  return (
    <td className={`mtrx-bg-opacity-${percent} border-slate-100 border-2`}>
      <span
        className={`${percent > 65 ? "text-white" : "text-black"} text-left`}
      >
        {isPercentView ? percent / 100 : val}
      </span>
    </td>
  );
}
