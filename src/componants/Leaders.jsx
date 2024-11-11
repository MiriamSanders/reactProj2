import React, { useState } from "react";

function Leaders() {
    const [leaders, setLeaders] = useState(0);
    function calculateLeaders() {
        let leaderArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            let name = localStorage.key(i);
            let details = JSON.parse(localStorage.getItem(name));
            let arr = details.scoreArray;
            let avg = 0;
            arr.forEach(element => {
                avg = avg + element
            });
            leaderArray[i] = { name: name, score: avg / arr.length };

        }
        leaderArray.sort((a, b) => a.score - b.score);
        console.log(leaderArray);
        return leaderArray;
    }
    return (
        <>
            <button onClick={() => setLeaders(1)}>show leader boards</button>
            <div>{leaders && <div>{calculateLeaders().map((value, index) => { <div key={index}><p>{value.name}</p><p>{value.score}</p></div> })}</div>}</div >
        </>
    )
}
export default Leaders;