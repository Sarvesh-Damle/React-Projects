import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { GamestateContext } from "./Quiz_helpers/Contexts";

const Score = () => {
  const { score, setScore, username, setUsername, setGamestate, questions } = useContext(GamestateContext);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // Save and load high score
    const savedScore = localStorage.getItem("quizHighScore");
    if (savedScore) {
      setHighScore(parseInt(savedScore));
    }
    
    if (score > (savedScore ? parseInt(savedScore) : 0)) {
        localStorage.setItem("quizHighScore", score);
        setHighScore(score);
    }
  }, [score]);

  const restartQuiz = () => {
    setScore(0)
    setGamestate("menu")
  }
  
  const percentage = Math.round((score / questions.length) * 100);
  
  let message = "";
  if (percentage === 100) message = "Perfect! 🏆";
  else if (percentage >= 80) message = "Great Job! 🌟";
  else if (percentage >= 50) message = "Good Effort! 👍";
  else message = "Keep Practicing! 📚";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-100 w-full animate-fade-in-up max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Finished!</h1>
      <p className="text-xl text-purple-600 font-bold mb-8">{message}</p>
      
      <div className="relative mb-8">
        <div className="bg-purple-50 rounded-full p-10 w-48 h-48 flex flex-col items-center justify-center border-4 border-purple-100 shadow-inner">
            <span className="block text-5xl font-extrabold text-purple-600 mb-1">{score}</span>
            <span className="text-gray-400 font-medium text-lg">/ {questions.length}</span>
        </div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            High Score: {highScore}
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <h2 className="text-xl text-gray-700">
            Player: <span className="font-bold text-gray-900">{username || "Player"}</span>
        </h2>
        <p className="text-gray-500">Accuracy: {percentage}%</p>
      </div>

      <button 
        onClick={restartQuiz}
        className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
      >
        <span>🔄</span> Play Again
      </button>
    </div>
  );
};

export default Score;
