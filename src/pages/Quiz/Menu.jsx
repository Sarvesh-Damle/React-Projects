import "./Quiz.css";
import { useContext } from "react";
import {GamestateContext} from "./Quiz_helpers/Contexts";

function Menu() {
  const { setGamestate, username, setUsername } =
    useContext(GamestateContext);
  return (
    <div className="Menu">
        <label>
          <h2>Enter your Name: </h2>
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
        />
        <button onClick={() => setGamestate("questions")}>Start Quiz</button>
    </div>
  );
}
export default Menu;
