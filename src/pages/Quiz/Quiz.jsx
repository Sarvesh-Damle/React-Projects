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
        <div className='Main'>
            <h1>Quiz App</h1>
            <GamestateContext.Provider value={{gamestate, setGamestate, username, setUsername, score, setScore}}>
                {gamestate === "menu" ? <Menu /> : null}
                {gamestate === "questions" ? <Questions /> : null}
                {gamestate === "score" ? <Score /> : null}
            </GamestateContext.Provider>
        </div>
    );
}

export default Quiz