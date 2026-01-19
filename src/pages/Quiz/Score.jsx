import React from "react";
import "./Quiz.css";
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
    <div className="Score">
      <h1>Quiz Finished!!</h1>
      <h1>{username}'s Score : {score} / {questions.length}</h1>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Score;
