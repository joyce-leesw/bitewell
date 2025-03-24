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
  const characterLimit = 50;

  const ENDPOINT: string =
    "https://ecx6sb9wme.execute-api.eu-west-2.amazonaws.com/prod/generate_recipes";

  const onSubmit = () => {
    setIsPending(true);
    console.log("Submitting: " + prompt);
    fetch(`${ENDPOINT}?user_input=${prompt}`)
      .then((res) => res.json())
      .then(onReceived);
  };

  const onReceived = (data: { recipes: string }) => {
    console.log("recipes unparsed", data.recipes);
    let cleanedRecipes;
    if (typeof data.recipes === "string") {
      const cleanedString = data.recipes
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      cleanedRecipes = JSON.parse(cleanedString);
      setRecipes(cleanedRecipes);
      console.log("recipes ready", recipes);
      setResults(true);
      setIsPending(false);
    }
  };

  const onReset = () => {
    setPrompt("");
    setResults(false);
    setIsPending(false);
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
          {!results ? (
            <Form
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={onSubmit}
              isPending={isPending}
              characterLimit={characterLimit}
            />
          ) : (
            <Results prompt={prompt} recipes={recipes} onBack={onReset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bitewell;
