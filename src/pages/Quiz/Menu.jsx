import { useContext, useState } from "react";
import { GamestateContext } from "./Quiz_helpers/Contexts";
import { fetchQuestions } from "./Quiz_helpers/api";

function Menu() {
  const { setGamestate, username, setUsername, setQuestions, setLoading, setError } =
    useContext(GamestateContext);
  const [difficulty, setDifficulty] = useState("");

  const startQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
        const data = await fetchQuestions(10, difficulty);
        setQuestions(data);
        setGamestate("questions");
    } catch (err) {
        setError("Failed to load questions. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-100 w-full">
        <label className="mb-2 w-full text-left">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Enter your Name</h2>
        </label>
        <input
          type="text"
          placeholder="Your Name..."
          minLength={3}
          maxLength={15}
          value={username}
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-4 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-200 text-lg transition-all bg-gray-50 focus:bg-white"
        />

        <label className="mb-2 w-full text-left">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Select Difficulty</h2>
        </label>
        <div className="grid grid-cols-3 gap-3 w-full mb-8">
            {['easy', 'medium', 'hard'].map((level) => (
                <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`p-3 rounded-lg border-2 capitalize font-semibold transition-all ${
                        difficulty === level 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 text-gray-600 hover:border-purple-300'
                    }`}
                >
                    {level}
                </button>
            ))}
        </div>

        <button 
          onClick={startQuiz}
          className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          disabled={!username}
        >
          Start Quiz
        </button>
    </div>
  );
}
export default Menu;
