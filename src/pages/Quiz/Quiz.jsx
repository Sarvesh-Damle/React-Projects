import React, { useState, useEffect } from 'react';
import Menu from './Menu'
import Questions from './Questions';
import { GamestateContext } from "./Quiz_helpers/Contexts";
import Score from './Score';
import BackButton from '../../components/BackButton';

// 'menu', 'questions', 'score'
const Quiz = () => {
    const [gamestate, setGamestate] = useState("menu");
    const [username, setUsername] = useState("");
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans relative'>
            <BackButton />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-10 tracking-tight">Quiz App</h1>
            <GamestateContext.Provider value={{
                gamestate, setGamestate, 
                username, setUsername, 
                score, setScore,
                questions, setQuestions,
                loading, setLoading,
                error, setError
            }}>
                <div className="w-full max-w-lg">
                    {gamestate === "menu" && <Menu />}
                    {gamestate === "questions" && <Questions />}
                    {gamestate === "score" && <Score />}
                </div>
            </GamestateContext.Provider>
        </div>
    );
}

export default Quiz