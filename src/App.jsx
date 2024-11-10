import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Player from '../componants/Player'
import Register from '../componants/Register'
import Messages from '../componants/Messages'
function App() {
  const [players, setPlayers] = useState([]);
  const [register, setRegister] = useState("signup");
  const [message, setMessage] = useState(null)
  const [alert, setAlert] = useState(0);
  const [addPlayer, setAddPlayer] = useState(1);
  const [startGame, setStartGame] = useState(0);

  function ChangePage(registerMethod) {
    setRegister(registerMethod);
  }

  function updateAlert(message, type) {
    setMessage({ message: message, type: type, funcType: [setAlert, setAddPlayer, setStartGame] })
  }

  return (<>
    {addPlayer && <Register setPlayers={setPlayers} type={register} ChangePage={ChangePage} alertMessage={updateAlert}></Register>}
    {message ? <Messages message={message.message} type={message.type} funcType={message.funcType} setMessage={setMessage}></Messages> : null}
    {startGame && <div>{players.map((value, index) => { return <Player name={value} key={index}></Player> })}</div>}
  </>)
}

export default App
