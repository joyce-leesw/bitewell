"use client";

import { useState } from "react";
import Results from "./results";
import Form from "./form";
import logo from "../public/bitewell.png";
import Image from "next/image";

type Recipe = {
  name: string;
  total_time: string;
  steps: string[];
};

const Bitewell: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [results, setResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const characterLimit = 50;

  const ENDPOINT: string =
    "https://mzgohuey4gygbj7igupfrrgubu0yxtjn.lambda-url.eu-west-2.on.aws/generate_recipes";

  const onSubmit = () => {
    setIsPending(true);
    console.log("Submitting: " + prompt);
    fetch(`${ENDPOINT}?user_input=${prompt}`)
      .then((res) => res.json())
      .then(onReceived);
  };

  const onReceived = (data: { recipes: string }) => {
    console.log("recipes unparsed", data.recipes);
    if (typeof data.recipes === "string") {
      const jsonArray = data.recipes.match(/\[.*\]/s);
      if (jsonArray) {
        const cleanedRecipes = JSON.parse(jsonArray[0]);
        setRecipes(cleanedRecipes);
        setResults(true);
      } else {
        console.error("No valid JSON array found");
        setRecipes([]);
        setError("Couldn't parse recipes. Please try again.");
      }
      setIsPending(false);
    }
  };

  const onReset = () => {
    setPrompt("");
    setResults(false);
    setIsPending(false);
    setError(null);
  };

  const gradientTextStyle =
    "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-700 w-fit mx-auto";

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-lg m-auto p-2">
        <div className="bg-gray-100 p-6 rounded-md">
          <div className="text-center my-6">
            <Image
              src={logo}
              width={200}
              className="mx-auto block"
              alt="Bitewell logo"
            />
            <h1 className={`${gradientTextStyle} text-3xl font-light`}>
              Bitewell
            </h1>
            <div className={`${gradientTextStyle} text-lg`}>
              Your AI recipes assistant
            </div>
          </div>

          {isPending && (
            <div className="flex justify-center items-center my-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600 border-solid"></div>
              <span className="ml-4 text-green-700">Loading...</span>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-center mb-4">
              <p>{error}</p>
              <button
                onClick={onReset}
                className="text-white bg-gradient-to-r from-red-300 to-red-500 w-full p-2 rounded-md text-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {!results && !isPending && !error && (
            <Form
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={onSubmit}
              isPending={isPending}
              characterLimit={characterLimit}
            />
          )}

          {results && !isPending && !error && (
            <Results prompt={prompt} recipes={recipes} onBack={onReset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bitewell;
