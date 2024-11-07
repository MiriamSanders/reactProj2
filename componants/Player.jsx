import React, { useState } from "react";
import "../src/Player.css";

function Player({ name }) {
    const [number, setNumber] = useState(Math.floor(Math.random() * 100));
    const [steps, setSteps] = useState(0);
    const [addedToarray,setAddedToArray]=useState(0);
    function updateScore() {
        let user = JSON.parse(localStorage.getItem(name)) || { scoreArray: [] };
        user.scoreArray.push(steps+1);
        localStorage.setItem(name, JSON.stringify(user));
    }

    // Function to update both number and steps, with a check for number === 100
    function handleUpdate(updateFunc) {
        setNumber((prevNumber) => {
            const newNumber = updateFunc(prevNumber);
            if (newNumber === 100&&addedToarray==0) {
                updateScore();
                setAddedToArray(1);
            }
            return newNumber;
        });
        setSteps((prevSteps) => prevSteps + 1);
    }

    return (
        <div className="player-container">
            <span className="player-name">Player: {name}</span>
            <span className="player-number">Current number: {number}</span>
            <span className="player-steps">Number of steps taken: {steps}</span>
            <div className="player-buttons">
                {number !== 100 && (
                    <div>
                        <button onClick={() => handleUpdate((num) => num + 1)}>+1</button>
                        <button onClick={() => handleUpdate((num) => num - 1)}>-1</button>
                        <button onClick={() => handleUpdate((num) => num * 2)}>*2</button>
                        <button onClick={() => handleUpdate((num) => num / 2)}>/2</button>
                    </div>
                )}
                {number === 100 && (
                    <div>
                        <button onClick={() => { setNumber(Math.floor(Math.random() * 100)); setSteps(0); }}>New Game</button>
                        <button onClick={() => { /* Quit logic here */ }}>Quit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Player;
