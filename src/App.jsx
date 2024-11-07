import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Player from '../componants/Player'
import Register from '../componants/Register'
import Messages from '../componants/Messages'
function App() {
 const [players,setPlayers]=useState([]);
 const [register,setRegister]=useState("signup");
 const [message,setMessage]=useState(null)
 function ChangePage(registerMethod){
 setRegister(registerMethod);}

 function updateAlert(message,type){
  setMessage({message:message,type:type})
 }
 
  return (<>
    <Register setPlayers={setPlayers} type={register}  ChangePage={ChangePage}  alertMessage={updateAlert}></Register>
    <div>{players.map((value, index) => { return <Player name={value} key={index}></Player> })}</div>
    {console.log(message)}
    {message?<Messages message={message.message} type={message.type}></Messages>:null}
  </>)
}

export default App
