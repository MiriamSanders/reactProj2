import React, { useState } from "react";
function Messages({ message, type, funcType, setMessage }) {
    return (<>
        <span>{message}</span>
        {type == "alert" && <button onClick={() => { funcType[0](1); setMessage(null) }}>OK</button>}
        {type == "successfulSignUp" && (<>
            <button onClick={() => { funcType[2](1); setMessage(null); funcType[1](0) }}>start game</button>
            <button onClick={() => { funcType[1](1); setMessage(null) }}>add Player</button>
        </>)}
    </>)
}
export default Messages;