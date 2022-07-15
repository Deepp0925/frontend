import React, { FormEvent } from "react";
import Modal from "react-modal";
import { createFileFromJson } from "../utils/file";

Modal.setAppElement("#app");

const MODELS = [
  {
    name: "ThreeLayer",
    val: "threeLayer",
  },
  {
    name: "SVM",
    val: "SVM",
  },
  {
    name: "SVM Grid",
    val: "SVM_Grid",
  },
  {
    name: "nn",
    val: "nn",
  },
  {
    name: "hu",
    val: "hu",
  },
  {
    name: "hamida",
    val: "hamida",
  },
  {
    name: "lee",
    val: "lee",
  },
  {
    name: "chen",
    val: "chen",
  },
  {
    name: "li",
    val: "li",
  },
  {
    name: "he",
    val: "he",
  },
  {
    name: "luo",
    val: "luo",
  },
  {
    name: "sharma",
    val: "sharma",
  },
  {
    name: "boulch",
    val: "boulch",
  },
  {
    name: "liu",
    val: "liu",
  },
  {
    name: "mou",
    val: "mou",
  },
];

const DATASETS = [
  {
    name: "AUM",
    val: "AUM",
  },
  {
    name: "PaviaC",
    val: "PaviaC",
  },
  {
    name: "Salinas",
    val: "Salinas",
  },
  {
    name: "PaviaU",
    val: "PaviaU",
  },
  {
    name: "KSC",
    val: "KSC",
  },
  {
    name: "IndianPines",
    val: "IndianPines",
  },
  {
    name: "Botswana",
    val: "Botswana",
  },
];

interface NewExperimentModel {
  exp_name: string;
  num_of_runs: string;
  model: string;
  dataset: string;
  computation_on: string;
  epochs: string;
  sample_size: string;
}

export function NewExperiment() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [inputs, setInputs] = React.useState<NewExperimentModel>({
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
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // write to file
    createFileFromJson(inputs);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="px-3 py-1 bg-green-600 text-white rounded-md"
      >
        New Experiment
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="overlay"
        shouldCloseOnOverlayClick={true}
        className="modal"
        contentLabel="New Experiment"
      >
        <div className="modal-new-experiment overflow-y-scroll h-full md:h-5/6 w-full p-10 md:w-5/6 lg:w-4/6 xl:w-1/2 md:rounded-md">
          <h1 className=" font-semibold">New Experiment</h1>
          <form onSubmit={handleSubmit}>
            <div className="experiment-name mt-7">
              <label className="text-sm font-regular text-gray-400">
                Experiment Name
              </label>
              <input
                className="w-full p-2 border-2 border-stone-500"
                type="text"
                onChange={handleChange}
                name="exp_name"
                minLength={3}
                maxLength={36}
                value={inputs.exp_name}
                required
                placeholder="Enter Experiment Name"
              />
            </div>
            <div className="training-sample mt-7">
              <label className="text-sm font-regular text-gray-400">
                Training Sample (0.0 - 1.0)
              </label>
              <input
                className="w-full p-2 border-2 border-stone-500"
                type="text"
                onChange={handleChange}
                name="sample_size"
                value={inputs.sample_size}
                pattern="[0](\.\d+)?$|1"
                required
                placeholder="Sample Size"
              />
            </div>
            <div className="model mt-7">
              <label className="text-sm font-regular text-gray-400">
                Choose a Model
              </label>
              <select
                required
                name="model"
                value={inputs.model}
                onChange={handleChange}
                className="w-full p-2 border-2 border-stone-500"
              >
                <option value="">Select a Model</option>
                {MODELS.map((model) => (
                  <option key={model.val} value={model.val}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="dataset mt-7">
              <label className="text-sm font-regular text-gray-400">
                Choose a Dataset
              </label>
              <select
                required
                name="dataset"
                value={inputs.dataset}
                onChange={handleChange}
                className="w-full p-2 border-2 border-stone-500"
              >
                <option value="">Select a Dataset</option>
                {DATASETS.map((dataset) => (
                  <option key={dataset.val} value={dataset.val}>
                    {dataset.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="num-of-runs mt-7">
              <label className="text-sm font-regular text-gray-400">
                Number of Runs
              </label>
              <input
                className="w-full p-2 border-2 border-stone-500"
                type="text"
                value={inputs.num_of_runs}
                onChange={handleChange}
                name="num_of_runs"
                pattern="0*[1-9][0-9]*"
                placeholder="Number of Runs"
              />
            </div>
            <div className="epoch mt-7">
              <label className="text-sm font-regular text-gray-400">
                Epochs
              </label>
              <input
                className="w-full p-2 border-2 border-stone-500"
                type="text"
                value={inputs.epochs}
                required
                onChange={handleChange}
                name="epochs"
                pattern="0*[1-9][0-9]*"
                placeholder="Epochs"
              />
            </div>
            <div className="computation-on mt-7">
              <label className="text-sm font-regular text-gray-400">
                Computation On
              </label>
              <select
                required
                value={inputs.computation_on}
                name="computation_on"
                onChange={handleChange}
                className="w-full p-2 border-2 border-stone-500"
              >
                <option value="">Computation on</option>
                <option value="GPU">GPU</option>
                <option value="CPU">CPU</option>
              </select>
            </div>
            <div className="buttons mt-12 flex">
              <button
                type="reset"
                className="w-full mr-1 p-2 border-2 border-stone-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full ml-1 p-2 text-white bg-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
