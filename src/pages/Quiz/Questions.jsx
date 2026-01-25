import { useContext, useState, useEffect } from "react";
import { GamestateContext } from "./Quiz_helpers/Contexts";

function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  
  const { score, setScore, setGamestate, questions, loading, error } = useContext(GamestateContext);

  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(15);
    setIsAnswered(false);
    setOptionChosen("");
  }, [currentQuestion]);

  useEffect(() => {
    if (loading || error || isAnswered || questions.length === 0) return;

    const timer = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(timer);
                handleTimeUp();
                return 0;
            }
            return prev - 1;
        });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, isAnswered, loading, error, questions]);

  const handleTimeUp = () => {
      setIsAnswered(true);
      // Auto advance after 2 seconds even if no answer selected (timeout)
      setTimeout(nextQuestion, 2000);
  };

  const chooseOption = (option) => {
    if (isAnswered) return;
    setOptionChosen(option);
    setIsAnswered(true);

    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setGamestate("score");
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const getOptionClass = (option) => {
    const baseClass = "w-full p-4 mb-3 rounded-xl border-2 text-left transition-all font-medium text-lg relative flex justify-between items-center";
    const correct = questions[currentQuestion].correctAnswer;
    
    if (isAnswered) {
        if (option === correct) {
            return `${baseClass} bg-green-100 border-green-500 text-green-900 shadow-md`;
        }
        if (option === optionChosen && option !== correct) {
            return `${baseClass} bg-red-100 border-red-500 text-red-900 shadow-md opacity-80`;
        }
        return `${baseClass} bg-gray-50 border-gray-200 text-gray-400 opacity-60`; // Dim other options
    }

    if (optionChosen === option) {
      return `${baseClass} bg-purple-100 border-purple-500 text-purple-900 shadow-md transform scale-[1.02]`;
    }
    return `${baseClass} bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-purple-300`;
  };

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center p-12 w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600 mb-4"></div>
              <p className="text-gray-500 font-medium">Loading Questions...</p>
          </div>
      );
  }

  if (error) {
      return (
          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-red-100 w-full">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                  Try Again
              </button>
          </div>
      );
  }

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col items-center w-full border border-gray-100 relative overflow-hidden max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
        <div 
          className="h-full bg-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="mb-6 w-full flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">
            Question {currentQuestion + 1} / {questions.length}
            </span>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                currentQ.difficulty === 'hard' ? 'bg-red-100 text-red-600' :
                currentQ.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
            }`}>
                {currentQ.difficulty.toUpperCase()}
            </span>
        </div>
        
        {/* Timer */}
        <div className={`flex flex-col items-center ${timeLeft <= 5 ? 'animate-pulse text-red-500' : 'text-gray-600'}`}>
            <span className="text-2xl font-mono font-bold">{timeLeft}</span>
            <span className="text-[10px] uppercase font-bold tracking-wide">Seconds</span>
        </div>
      </div>

      <div className="w-full mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
          {currentQ.question}
        </h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">{currentQ.category}</p>
      </div>

      <div className="w-full space-y-3 mb-8">
        {currentQ.options.map((opt, index) => (
          <button
            key={index}
            className={getOptionClass(opt)}
            onClick={() => chooseOption(opt)}
            disabled={isAnswered}
          >
            <span className="flex-1">{opt}</span>
            {isAnswered && opt === currentQ.correctAnswer && (
                 <span className="text-green-600 ml-2">✔</span>
            )}
            {isAnswered && opt === optionChosen && opt !== currentQ.correctAnswer && (
                 <span className="text-red-600 ml-2">✖</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-end w-full h-12">
          {isAnswered && (
            <button 
                onClick={nextQuestion}
                className="px-8 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all shadow-lg active:scale-95 flex items-center gap-2 animate-bounce-short"
            >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                <span>→</span>
            </button>
          )}
      </div>
    </div>
  );
}
export default Questions;
