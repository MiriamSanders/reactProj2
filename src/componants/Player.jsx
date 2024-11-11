// import React, { useState } from "react";
// import "../Player.css";

// let flag = false
// function Player({ name, turn, setTurn, numPlayers, index,removePlayer }) {
//     const [number, setNumber] = useState(Math.floor(Math.random() * 100));
//     const [steps, setSteps] = useState(0);
//     const [addedToarray, setAddedToArray] = useState(0);

//     function updateScore() {
//         let user = JSON.parse(localStorage.getItem(name)) || { scoreArray: [] };
//         setSteps(prevSteps=>prevSteps+1)
//         user.scoreArray.push(steps+1);
//     }
//     function updateScore() {
//         let user = JSON.parse(localStorage.getItem(name)) || { scoreArray: [] };
//         user.scoreArray.push(steps);
//         localStorage.setItem(name, JSON.stringify(user));
//     }
//     function handleUpdate(updateFunc) {
//         setNumber((prevNumber) => {
//             const newNumber = updateFunc(prevNumber);
//             // if (newNumber === 100 && addedToarray == 0) {
//             //     updateScore();
//             //     setAddedToArray(1);
//             // }
//             if (newNumber === 100 && !flag) {
//                 flag = true
//                 updateScore();
//                 setAddedToArray(1);
//             } else if (number !== 100) {
//                 flag = false
//             }
//             return newNumber;
//         });
//         setSteps((prevSteps) => prevSteps+1);

//         setTurn(prevturn => (prevturn + 1) % numPlayers);
//     }
//     return (
//         <div className={name!=null?"player-container":"hide"}>
//             <span className="player-name">Player: {name}</span>
//             <span className="player-number">Current number: {number}</span>
//             <span className="player-steps">Number of steps taken: {steps}</span>
//             <div className="player-buttons">
//                 {number !== 100 && (
//                     <div disabled={index != turn}>
//                         <button disabled={index != turn} onClick={() => handleUpdate((num) => num + 1)}>+1</button>
//                         <button disabled={index != turn} onClick={() => handleUpdate((num) => num - 1)}>-1</button>
//                         <button disabled={index != turn} onClick={() => handleUpdate((num) => num * 2)}>*2</button>
//                         <button disabled={index != turn} onClick={() => handleUpdate((num) => Math.floor(num / 2))}>/2</button>
//                     </div>
//                 )}
//                 {number === 100 && (
//                     <div>
//                         <button onClick={() => { setNumber(Math.floor(Math.random() * 100)); setSteps(0); }}>New Game</button>
//                         <button onClick={() => {removePlayer(index)}}>Quit</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Player;
import React, { useState } from "react";
import "../Player.css";

let flag = false;
function Player({ name, turn, setTurn, myturn, numPlayers, index, removePlayer }) {
    const [number, setNumber] = useState(Math.floor(Math.random() * 100));
    const [steps, setSteps] = useState(0);
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
                updateScore(steps + 1);  // Passing steps + 1 to get the updated count
            } else if (newNumber !== 100) {
                flag = false;
            }

            return newNumber;
        });

        setSteps((prevSteps) => prevSteps + 1);
        setTurn((prevTurn) => (prevTurn + 1) % numPlayers);
    }

    return (
        <div className={name != null ? "player-container" : "hide"}>
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
                <div>{scores.map((value, index) => (<p key={index}>{value}</p>))}</div>
            </div>
        </div>
    );
}

export default Player;
