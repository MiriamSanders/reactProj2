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
        leaderArray.sort((a, b) => a.score - b.score);
        return leaderArray.slice(0, 3);
    }
    function toggleLeaders() {
        if (leaders.length > 0) {
            setLeaders([]);
        } else {
            const calculatedLeaders = calculateLeaders();
            setLeaders(calculatedLeaders);
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
