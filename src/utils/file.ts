// this will handle all functions that are file related
import fileSaver from "file-saver";
import { ExperimentDetails } from "./parseExpFile";

interface fileOptions {
  filename: string;
}

export function writeFile(
  data: string,
  { filename = "file.txt" }: fileOptions
) {
  // fileSaver.saveAs(data, filename);
}

// converts json value pair into separate line and saves to the file
export function createFileFromJson(data: object) {
  console.log(Object.keys(data));
  let new_data = "";
  Object.keys(data).map((key) => {
    console.log(key);
    new_data += `${key}: ${data[key as keyof typeof data]}\n`;
  });
  console.log(new_data);
}

export async function readFile(file: string | URL) {
  let a = await fetch(file)
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      return "";
    });

  return a;
}

export function getLines(data: string) {
  return data.split("\n");
}
