// import React, { useState } from "react";

// function Leaders() {
//     const [leaders, setLeaders] = useState(0);
//     function calculateLeaders() {
//         let leaderArray = [];
//         for (let i = 0; i < localStorage.length; i++) {
//             let name = localStorage.key(i);
//             let details = JSON.parse(localStorage.getItem(name));
//             let arr = details.scoreArray;
//             let avg = 0;
//             arr.forEach(element => {
//                 avg = avg + element
//             });
//             leaderArray[i] = { name: name, score: avg / arr.length };

//         }
//         leaderArray.sort((a, b) => a.score - b.score);
//         console.log(leaderArray);
//         return leaderArray;
//     }
//     return (
//         <>
//             <button onClick={() => setLeaders(1)}>show leader boards</button>
//             <div>{leaders && <div>{calculateLeaders().map((value, index) => { <div key={index}><p>{value.name}</p><p>{value.score}</p></div> })}</div>}</div >
//         </>
//     )
// }
// export default Leaders;
import React, { useState } from "react";
import "../leaders.css"; 

function Leaders() {
    const [leaders, setLeaders] = useState([]);

    function calculateLeaders() {
        let leaderArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            let name = localStorage.key(i);
            let details = JSON.parse(localStorage.getItem(name));
            let arr = details.scoreArray;
            let avg = arr.reduce((sum, score) => sum + score, 0) / arr.length;
            leaderArray.push({ name: name, score: avg });
        }
        // Sort the leaders by score in ascending order and take the top 4
        leaderArray.sort((a, b) => a.score - b.score);
        return leaderArray.slice(0, 3);
    }

    function toggleLeaders() {
        if (leaders.length > 0) {
            setLeaders([]); // If leaderboard is shown, hide it
        } else {
            const calculatedLeaders = calculateLeaders();
            setLeaders(calculatedLeaders); // If leaderboard is hidden, show it
        }
    }

    return (
        <div className="leaderboard-container">
            <button className="show-button" onClick={toggleLeaders}>
                {leaders.length > 0 ? "Hide Leaderboard" : "Show Leaderboard"}
            </button>
            {leaders.length > 0 && (
                <div className="leaderboard">
                    <h3>Top 3 Leaders</h3>
                    {leaders.map((leader, index) => (
                        <div key={index} className="leader-item">
                            <p className="leader-name">{leader.name}</p>
                            <p className="leader-score">{Math.round(leader.score)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Leaders;
