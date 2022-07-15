export * from "./confusion_matrix.model";
/**
 * Gets the confusion matrix min and max value.
 * @return Min and max confusion matrix value or null if not exists.
 */
//   export function getMinAndMax(): { min: number; max: number } | null {
//     let min = this._matrix[0][0];
//     let max = this._matrix[0][0];

//     if (min == null || max == null) {
//       return null;
//     }
//     for (let line of this._matrix) {
//       for (let val of line) {
//         max = max < val ? val : max;
//         min = min > val ? val : min;
//       }
//     }

//     return { min, max };
//   }
