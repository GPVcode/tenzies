import "./style.css"
import React, { useState } from "react";
import Die from "./components/Die"
import {nanoid} from "nanoid"

function App() {

  //set state variables, set new dice object as default state
  const [ dice, setDice ] = useState(allNewDice)

  //create function that generates random numbers
  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i++){
      const randomNumber = Math.floor(Math.random() * 6 ) + 1;
      newDice.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} />)

  const rollDice = () => {
    setDice(allNewDice)
  }

  return(
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice} className="roll-dice">
        Roll
      </button>
    </main>
  )
}


export default App