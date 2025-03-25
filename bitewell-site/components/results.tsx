import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Recipe = {
  name: string;
  total_time: string;
  steps: string[];
};

type Props = {
  prompt: string;
  recipes: Recipe[];
  onBack: () => void;
};

const Results: React.FC<Props> = ({ prompt, recipes, onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="mb-5">
        <div className="bg-white p-4 my-3 rounded-md">
          <div className="text-slate-500 mb-4 text-sm">
            <b>Ingredients</b>
          </div>
          <div className="text-lg font-semibold text-gray-700">{prompt}</div>
        </div>
        <div className="bg-white p-4 my-3 rounded-md">
          <div className="text-slate-500 mb-4 text-sm">
            <b>Recipes</b>
          </div>
          {recipes.map((recipe, index) => (
            <div key={index} className="py-2">
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full flex justify-between items-center bg-teal-500 hover:bg-teal-600 text-white px-4 shadow-md py-3 text-left rounded-md transition duration-100"
              >
                <div>
                  <h2 className="text-lg font-semibold">{recipe.name}</h2>
                  <p className="text-sm">{recipe.total_time}</p>
                </div>
                {openIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="bg-white p-4">
                  <b className="text-slate-500 mb-4 text-sm">Steps:</b>
                  <ol className="list-decimal pl-5 space-y-2">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        className="text-white bg-gradient-to-r from-teal-400 to-green-700 w-full disabled:opacity-50 p-2 rounded-md text-sm"
        onClick={onBack}
      >
        Back
      </button>
    </>
  );
};

export default Results;
