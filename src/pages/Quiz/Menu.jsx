import { useContext } from "react";
import {GamestateContext} from "./Quiz_helpers/Contexts";

function Menu() {
  const { setGamestate, username, setUsername } =
    useContext(GamestateContext);
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-100 w-full">
        <label className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Enter your Name:</h2>
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
          className="w-full p-4 mb-8 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-200 text-lg text-center transition-all bg-gray-50 focus:bg-white"
        />
        <button 
          onClick={() => setGamestate("questions")}
          className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          disabled={!username}
        >
          Start Quiz
        </button>
    </div>
  );
}
export default Menu;
