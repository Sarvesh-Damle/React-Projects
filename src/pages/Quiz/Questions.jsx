import { useContext, useState } from "react";
import { GamestateContext } from "./Quiz_helpers/Contexts";
import { questions } from "./Quiz_helpers/question";

function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const { score, setScore, setGamestate } =
    useContext(GamestateContext);

  const chooseOption = (option) => {
    setOptionChosen(option);
  };
  const nextQuestion = () => {
    if (questions[currentQuestion].answer === optionChosen) {
      setScore(() => score + 1);
    }
    setCurrentQuestion(() => currentQuestion + 1);
    setOptionChosen(""); // Reset selection for next question
  };
  const finishQuiz = () => {
    if (questions[currentQuestion].answer === optionChosen) {
      setScore(() => score + 1);
    }
    setGamestate("score")
  }

  const getOptionClass = (option) => {
    const baseClass = "w-full p-4 mb-3 rounded-xl border-2 text-left transition-all font-medium text-lg relative";
    if (optionChosen === option) {
      return `${baseClass} bg-purple-100 border-purple-500 text-purple-900 shadow-md transform scale-[1.02]`;
    }
    return `${baseClass} bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-purple-300`;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center w-full border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
        <div 
          className="h-full bg-purple-500 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="mb-8 w-full">
        <span className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2 block">
          Question {currentQuestion + 1} / {questions.length}
        </span>
        <h2 className="text-2xl font-bold text-gray-800 leading-snug">
          {questions[currentQuestion].prompt}
        </h2>
      </div>

      <div className="w-full space-y-3 mb-8">
        {['option_A', 'option_B', 'option_C', 'option_D'].map((opt) => (
          <button
            key={opt}
            className={getOptionClass(opt)}
            onClick={() => chooseOption(opt)}
          >
            {questions[currentQuestion][opt]}
            {optionChosen === opt && (
               <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                 ●
               </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-end w-full">
        {currentQuestion === questions.length - 1 ? (
          <button 
            onClick={finishQuiz}
            className="px-8 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors shadow-lg active:scale-95"
          >
            Finish Quiz
          </button>
        ) : (
          <button 
            onClick={nextQuestion}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!optionChosen}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}
export default Questions;
