import React from "react";
import { useContext } from "react";
import { GamestateContext } from "./Quiz_helpers/Contexts";
import { questions } from "./Quiz_helpers/question";

const Score = () => {
  const { score, setScore, username, setUsername, setGamestate } = useContext(GamestateContext);
  const restartQuiz = () => {
    setScore(0)
    setGamestate("menu")
  }
  if (username === "") {
    setUsername("Player")
  }
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-100 w-full animate-fade-in-up">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz Finished!</h1>
      
      <div className="bg-purple-50 rounded-full p-8 w-40 h-40 flex items-center justify-center mb-8 border-4 border-purple-100">
        <div className="text-center">
          <span className="block text-4xl font-extrabold text-purple-600">{score}</span>
          <span className="text-gray-500 font-medium">/ {questions.length}</span>
        </div>
      </div>

      <h2 className="text-xl text-gray-700 mb-8">
        Well done, <span className="font-bold text-purple-600">{username}</span>!
      </h2>

      <button 
        onClick={restartQuiz}
        className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md active:scale-95"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Score;
