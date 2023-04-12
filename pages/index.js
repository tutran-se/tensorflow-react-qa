import React, { useEffect, useRef, useState } from "react";
import * as qna from "@tensorflow-models/qna";
import * as tf from "@tensorflow/tfjs";
const App = () => {
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded");
  };

  useEffect(() => {
    loadModel();
  }, []);

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const passage = e.target.passage.value;
      const question = e.target.question.value;
      console.log(passage);
      console.log(question);
      if (model == null) {
        console.log("Model is null");
        return;
      }
      const answers = await model.findAnswers(question, passage);
      setAnswer(answers);
      console.log(answers);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      {model == null ? (
        <div>
          <div>Model Loading</div>
        </div>
      ) : (
        <div className="p-4 mx-auto w-full max-w-5xl">
          <div>
            <p className="border border-indigo-400 p-2 mb-3 inline-block rounded-lg">
              Assignment 05 - GROUP 03
            </p>
            <h1 className="text-2xl font-bold">Tensorflow with React</h1>
            <form onSubmit={onFormSubmit}>
              <div className="mb-4">
                <label htmlFor="question" className="font-medium mb-2 block">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  id="question"
                  placeholder="Enter your question"
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="passage" className="font-medium mb-2 block">
                  Passage
                </label>
                <textarea
                  placeholder="Enter your passage"
                  name="passage"
                  id="passage"
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="p-3 rounded bg-indigo-600 text-white"
                >
                  Get Answer
                </button>
              </div>
            </form>
          </div>
          <div>
            {answer && answer.length > 0 && (
              <div>
                <h2 className="font-bold text-xl mb-4">
                  {answer.length} Results
                </h2>
                <div className="flex flex-col space-y-2">
                  {answer.map((ans, idx) => (
                    <div key={idx}>
                      <b>Answer{idx + 1} = </b>
                      {ans.text} {ans.score}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
