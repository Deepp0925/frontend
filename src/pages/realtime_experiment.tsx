import React, { useMemo } from "react";
import usePromise from "react-promise";
import { Loading } from "../components/loading";
import { DATASETS, MODELS } from "../utils/constants";
import { ExperimentDetails, ParseExpFile } from "../utils/parseExpFile";
import { ExperimentResults } from "./experiment_results";

interface otherOpts {
  val?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string; // regex pattern
  onChange?: (evt: React.ChangeEvent) => void;
}

// select input field
class SelectField {
  constructor(
    // name of the field
    public name: string,
    // the label that appears above the input field
    public label: string,
    // list of options
    public options: string[],
    // aditional options
    public additionalOpts: otherOpts = {}
  ) {}
}

// text input field
class InputField {
  constructor(
    // name of the field
    // keep this unique between the form
    public name: string,
    // the label that appears above the input field
    public label: string,
    // aditional options
    public additionalOpts: otherOpts = {}
  ) {}
}

interface RenderInputFieldProps {
  fieldData: SelectField | InputField;
  isDisabled: boolean;
}

function noop() {}

function RenderInputField({
  fieldData,
  isDisabled = false,
}: RenderInputFieldProps) {
  if (fieldData instanceof SelectField) {
    return (
      <>
        <label
          className="text-sm font-regular text-gray-400"
          htmlFor={fieldData.name}
        >
          {fieldData.label}
        </label>
        <select
          required={fieldData.additionalOpts.required || true}
          disabled={isDisabled}
          id={fieldData.name}
          name={fieldData.name}
          value={fieldData.additionalOpts.val || ""}
          onChange={fieldData.additionalOpts.onChange || noop}
          className="w-full h-12 p-2 border-2 border-stone-500 rounded-md disabled:border-0  disabled:bg-gray-200 disabled:text-gray-600"
        >
          <option value="">Select</option>
          {fieldData.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </>
    );
  } else {
    return (
      <>
        <label
          className="text-sm font-regular text-gray-400"
          htmlFor={fieldData.name}
        >
          {fieldData.label}
        </label>
        <input
          disabled={isDisabled}
          required={fieldData.additionalOpts.required || true}
          className="w-full h-12 p-2 border-2 border-stone-500 rounded-md disabled:border-0  disabled:bg-gray-200 disabled:text-gray-600"
          type="text"
          value={fieldData.additionalOpts.val || ""}
          onChange={fieldData.additionalOpts.onChange || noop}
          name={fieldData.name}
          id={fieldData.name}
          // pattern={fieldData.additionalOpts.pattern || "[a-zA-Z0-9]"}
          placeholder={fieldData.additionalOpts.placeholder || ""}
        />
      </>
    );
  }
}

interface NewExperimentState {
  exp_name: string;
  num_of_runs: string;
  model: string;
  dataset: string;
  computation_on: string;
  epochs: string;
  sample_size: string;
}

// the state of the experiment
type ExperimentState = "init" | "processing" | "completed" | "error";

interface InputProps {
  currentState: ExperimentState;
  changeState: (s: ExperimentState) => void;
}

function AllInputs(props: InputProps) {
  const [inputs, setInputs] = React.useState<NewExperimentState>({
    exp_name: "",
    num_of_runs: "30",
    model: "",
    dataset: "",
    computation_on: "",
    epochs: "100",
    sample_size: "0.95",
  });

  // handle changes for all elements
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // handles the post submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.changeState("processing");
    setTimeout(() => {
      props.changeState("completed");
    }, 2000);
    // write to file
    // createFileFromJson(inputs);
  };

  const fields: Array<SelectField | InputField> = [
    new InputField("exp_name", "Experiment Name", {
      onChange: handleChange,
      placeholder: "Name",
      val: inputs.exp_name,
      pattern: "[a-zA-Z0-9]{3,100}",
    }),
    new InputField("sample_size", "Training Size (0.0 - 1.0)", {
      onChange: handleChange,
      placeholder: "Sample Size",
      val: inputs.sample_size,
      // pattern: `0\.(d+)?$|1`,
    }),
    new SelectField("model", "Model", MODELS, {
      onChange: handleChange,
      val: inputs.model,
    }),
    new SelectField("dataset", "Dataset", DATASETS, {
      onChange: handleChange,
      val: inputs.dataset,
    }),
    new InputField("num_of_runs", "Number of runs", {
      onChange: handleChange,
      placeholder: "Number of runs",
      val: inputs.num_of_runs,
      pattern: "[1-9]",
    }),
    new InputField("epochs", "Epochs", {
      onChange: handleChange,
      placeholder: "Epochs",
      val: inputs.epochs,
      pattern: "[0-9]",
    }),
    new SelectField("computation_on", "Computation on", ["GPU", "CPU"], {
      onChange: handleChange,
      val: inputs.computation_on,
    }),
  ];

  // render all input fields
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {fields.map((field) => (
          <div className="col-span-1" key={field.name}>
            <RenderInputField
              fieldData={field}
              isDisabled={props.currentState == "processing"}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={props.currentState == "processing"}
          className="w-full h-12 self-end rounded-md bottom-0 p-2 text-white bg-blue-500 disabled:bg-gray-300 disabled:text-stone-400"
        >
          Run
        </button>
      </form>
    </>
  );
}

const expDet = new ParseExpFile(
  new URL("../../experimentResults.txt", import.meta.url)
).parseExperimentDetails();

export function Realtime_experiment() {
  const { value, loading } = usePromise(expDet);
  const memo = useMemo(
    () => ({ value: value, loading: loading }),
    [value, loading]
  );

  const [expState, setExpState] = React.useState<ExperimentState>("init");

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-lg font-medium">Experiment Name</h1>
      <p className="text-sm font-regular text-gray-400">Date: 01/01/2022</p>
      <p className="text-sm font-regular text-gray-400">
        Time: 09:12 PM (Local)
      </p>
      <div className="mt-10">
        <AllInputs changeState={setExpState} currentState={expState} />
      </div>
      <div className="mt-16" hidden={expState != "processing"}>
        <Loading />
      </div>
      <div className="mt-16" hidden={expState != "completed"}>
        {memo.loading ? <Loading /> : experiment(memo.value)}
      </div>
    </div>
  );
}

function experiment(value: ExperimentDetails | undefined) {
  if (value === undefined || !value) {
    return null;
  }

  return <ExperimentResults details={value} />;
}
