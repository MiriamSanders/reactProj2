import React,{useState} from "react";
function Messages({message,type})
{
    return(<>
    <span>{message}</span>
    {type=="alert"&&<button>OK</button>}
    {type=="successfulSignUp"&&(<><button>start game</button><button>add Player</button></>)}
    </>)
}
export default Messages;