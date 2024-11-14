import { useState } from 'react'
import './App.css'
import Player from './componants/Player'
import Register from './componants/Register'
import Messages from './componants/Messages'
import Leaders from './componants/Leaders'

function App() {
  const [players, setPlayers] = useState([]);
  const [register, setRegister] = useState("signup");
  const [message, setMessage] = useState(null)
  const [alert, setAlert] = useState(0);
  const [addPlayer, setAddPlayer] = useState(1);
  const [startGame, setStartGame] = useState(0);
  const [turn, setTurn] = useState(0);

  function ChangePage(registerMethod) {
    setRegister(registerMethod);
  }
  function updateAlert(message, type) {
    setMessage({ message: message, type: type, funcType: [setAlert, setAddPlayer, setStartGame] })
  }
  function removePlayer(idToRemove) {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== idToRemove));
  }
  function startNewGame()
  {
    setAddPlayer(1);
    setStartGame(0);
  }

  return (
    <>
    <button onClick={startNewGame} className='new-game-button'>Start new game</button>
      <Leaders></Leaders>
      <h1 className="title">Get to 100</h1>
      {addPlayer ? <Register setPlayers={setPlayers} type={register} ChangePage={ChangePage} alertMessage={updateAlert}></Register> : null}
      {message ? <Messages message={message.message} type={message.type} funcType={message.funcType} setMessage={setMessage}></Messages> : null}
      {startGame ? <div className='flex-div'>{players.map((value, index) => { return <Player name={value.name} key={value.id} index={value.id} myturn={index} turn={turn} setTurn={setTurn} numPlayers={players.length} removePlayer={removePlayer}></Player> })}</div> : null}
    </>
  )
}

export default App