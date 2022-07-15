import { getLines, readFile } from "./file";

export interface ExperimentDetails {
  confusion_matrix: Array<Array<number>>;
  additional_info: object;
  f1_score: object;
}

export class ParseExpFile {
  constructor(readonly filePath: string | URL) {
    if (!filePath) {
      alert("File path not provided");
      return;
    }
  }

  lines: string[] = [];
  encounteredErr = false;
  isParsingConfMatrix = false;
  confMtrxIndex = -1;
  confMtrx: Array<Array<number>> = [];

  public async parseExperimentDetails(): Promise<
    ExperimentDetails | undefined
  > {
    try {
      this.lines = getLines(await readFile(this.filePath));

      if (!this.lines.length) {
        alert("File is empty");
        return undefined;
      }

      // if line begins
      // - [[ meaning confusion matrix
      // - 'dataset' then dataset name
      // - 'model' then model name
      // - 'accuracy' then accuracy
      // - 'number of runs' then number of runs
      // - 'epochs' then epochs
      // - 'training percentage' then training %
      // - 'computation on' then computation on
      // - 'training time' then training time
      // - 'testing time' then testing time
      // - 'kappa' then kappa
      // - 'total time' then total time
      // - 'Agregated results' then agregated results which will be ignored
      // - 'Confusion Matrix' then confusion matrix which will be ignored
      // - 'anything else' is considered a f1 score

      let ExperimentDetails: any = {
        additional_info: {},
        f1_score: {},
      };

      for (let line of this.lines) {
        line = line.trim();

        if (!line) {
          // skip empty lines
          continue;
        }

        if (this.isParsingConfMatrix) {
          this.parseConfusionMatrix(line);
        } else if (line.startsWith("[[")) {
          this.isParsingConfMatrix = true;
          // begin parsing confusion matrix
          this.parseConfusionMatrix(line);
          continue;
        } else if (line.startsWith("Dataset")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            dataset: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Model")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            model: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Accuracy")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            accuracy: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Number of Runs")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            "Number of Runs": line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Training Percentage")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            training_sample: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Computation on")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            computation_on: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Training time")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            training_time: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Testing time")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            testing_time: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Kappa")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            kappa: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Total time")) {
          ExperimentDetails.additional_info = {
            ...ExperimentDetails.additional_info,
            total_time: line.split(":")[1].trim(),
          };
        } else if (line.startsWith("Aggregated results")) {
          continue;
        } else if (line.startsWith("Confusion matrix")) {
          this.isParsingConfMatrix = true;
          continue;
        } else {
          let f1_score = line.split(":");
          ExperimentDetails.f1_score = {
            ...ExperimentDetails.f1_score,
            [f1_score[0].trim()]: f1_score[1].trim(),
          };
        }
      }

      ExperimentDetails.confusion_matrix = this.confMtrx;

      return ExperimentDetails as ExperimentDetails;
    } catch (error) {
      console.error(error);
      alert("Error parsing file");
      return;
    }
  }

  parseConfusionMatrix(line: string) {
    if (!this.isParsingConfMatrix) {
      return alert("Confusion matrix not found");
    }
    // we are processing the first lne of the confusion matrix
    if (line.startsWith("[[")) {
      // strip off the first character
      line = line.substring(1);
    }

    if (line.includes("[")) {
      this.confMtrxIndex++;
      this.confMtrx[this.confMtrxIndex] = [];
    } else if (line.includes("]]")) {
      this.isParsingConfMatrix = false;
    }
    // this will look something like this:
    // ["[1" , "2", "3", "4]"]
    let nums_dirty = line.split(" ");
    for (const num_dirty in nums_dirty) {
      // replace '[' and ']' with ''
      let num = nums_dirty[num_dirty].replace(/[\[\]]/g, "").trim();
      if (num) {
        this.confMtrx[this.confMtrxIndex].push(parseFloat(num));
      }
    }
  }
}
