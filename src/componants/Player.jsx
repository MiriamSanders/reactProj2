import React, { useState } from "react";
import "../styles/Player.css";

let flag = false;
function Player({ name, turn, setTurn, myturn, numPlayers, index, removePlayer }) {
    const [number, setNumber] = useState(Math.floor(Math.random() * 100));
    const [steps, setSteps] = useState(0);
    const [showScores, setShowScores] = useState(false);
    let scores = JSON.parse(localStorage.getItem(name)).scoreArray;

    function updateScore(updatedSteps) {
        let user = JSON.parse(localStorage.getItem(name)) || { scoreArray: [] };
        user.scoreArray.push(updatedSteps);
        localStorage.setItem(name, JSON.stringify(user));
    }
    function handleUpdate(updateFunc) {
        setNumber((prevNumber) => {
            const newNumber = updateFunc(prevNumber);
            if (newNumber === 100 && !flag) {
                flag = true;
                updateScore(steps + 1);
            } else if (newNumber !== 100) {
                flag = false;
            }
            return newNumber;
        });
        setSteps((prevSteps) => prevSteps + 1);
        setTurn((prevTurn) => (prevTurn + 1) % numPlayers);
    }
    function toggleScores() {
        setShowScores(!showScores);
    }

    return (
        <div className={myturn != turn ? "player-container disable" : "player-container"}  >
            <span className="player-name">Player: {name}</span>
            <span className="player-number">Current number: {number}</span>
            <span className="player-steps">Number of steps taken: {steps}</span>
            <div className="player-buttons">
                {number !== 100 && (
                    <div >
                        <button disabled={myturn !== turn} onClick={() => handleUpdate((num) => num + 1)}>+1</button>
                        <button disabled={myturn !== turn} onClick={() => handleUpdate((num) => num - 1)}>-1</button>
                        <button disabled={myturn !== turn} onClick={() => handleUpdate((num) => num * 2)}>*2</button>
                        <button disabled={myturn !== turn} onClick={() => handleUpdate((num) => Math.floor(num / 2))}>/2</button>
                    </div>
                )}
                {number === 100 && (
                    <div>
                        <button onClick={() => { setNumber(Math.floor(Math.random() * 100)); setSteps(0); }}>New Game</button>
                        <button onClick={() => { removePlayer(index); }}>Quit</button>
                    </div>
                )}
            </div>
            <button onClick={toggleScores} className="score-array-display">Scores</button>
            {showScores && (
                <div className="score-array">
                    {scores.map((value, index) => (
                        <p style={{ display: "inline" }} key={index}>{value}, </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Player;
