import React from 'react'
import Menu from './Menu'
import { useState } from 'react';
import Questions from './Questions';
import {GamestateContext} from "./Quiz_helpers/Contexts";
import Score from './Score';

// 'menu', 'questions', 'score'
const Quiz = () => {
    const [gamestate, setGamestate] = useState("menu");
    const [username, setUsername] = useState("");
    const [score, setScore] = useState(0)
    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans'>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-10 tracking-tight">Quiz App</h1>
            <GamestateContext.Provider value={{gamestate, setGamestate, username, setUsername, score, setScore}}>
                <div className="w-full max-w-lg">
                    {gamestate === "menu" ? <Menu /> : null}
                    {gamestate === "questions" ? <Questions /> : null}
                    {gamestate === "score" ? <Score /> : null}
                </div>
            </GamestateContext.Provider>
        </div>
    );
}

export default Quiz