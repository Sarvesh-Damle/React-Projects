import "./Quiz.css";
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
  };
  const finishQuiz = () => {
    if (questions[currentQuestion].answer === optionChosen) {
      setScore(() => score + 1);
    }
    setGamestate("score")
  }
  return (
    <div className="Questions">
      <h2>{questions[currentQuestion].prompt}</h2>
      <button
        style={{
          backgroundColor: optionChosen === "option_A" ? "lightgreen" : null,
        }}
        onClick={() => chooseOption("option_A")}
      >
        {questions[currentQuestion].option_A}
      </button>
      <button
        style={{
          backgroundColor: optionChosen === "option_B" ? "lightgreen" : null,
        }}
        onClick={() => chooseOption("option_B")}
      >
        {questions[currentQuestion].option_B}
      </button>
      <button
        style={{
          backgroundColor: optionChosen === "option_C" ? "lightgreen" : null,
        }}
        onClick={() => chooseOption("option_C")}
      >
        {questions[currentQuestion].option_C}
      </button>
      <button
        style={{
          backgroundColor: optionChosen === "option_D" ? "lightgreen" : null,
        }}
        onClick={() => chooseOption("option_D")}
      >
        {questions[currentQuestion].option_D}
      </button>
      {score}
      <div id="next">
        {currentQuestion === questions.length - 1 ? (
          <button onClick={finishQuiz}>Finish Quiz</button>
        ) : (
          <button onClick={nextQuestion}>Next Question</button>
        )}
      </div>
    </div>
  );
}
export default Questions;
