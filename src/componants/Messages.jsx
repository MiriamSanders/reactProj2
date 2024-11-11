import React, { useState } from "react";
import "../Messages.css"

function Messages({ message, type, funcType, setMessage }) {
    return (
        <>
            <span className="message">{message}</span>
            {type == "alert" && <button onClick={() => { funcType[0](1); setMessage(null) }}>OK</button>}
            {type == "successfulSignUp" && (
                <>
                    <div className="flex-btn">
                        <button className="btn-class" onClick={() => { funcType[2](1); setMessage(null); funcType[1](0) }}>start game</button>
                        <button className="btn-class" onClick={() => { funcType[1](1); setMessage(null) }}>add Player</button>
                    </div>
                </>
            )}
        </>
    )
}

export default Messages;