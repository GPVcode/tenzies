import "./style.css"
import React, { useEffect, useState } from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'

function App() {
  const [ dice, setDice ] = useState(generateNewDice)
  const [ tenzies, setTenzies ] = useState(false)

  useEffect(() => {
    const allHeldTrue = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value;
    const allValuesEqual = dice.every(die => die.value === firstValue)
    if(allHeldTrue && allValuesEqual){
      setTenzies(true)
      tenzies && alert("You Win!")
    }
  }, [dice])
  
  function generateNewDice(){
    const newDice = [];
    for(let i = 0; i < 10; i++){
      newDice.push(newDieGenerator())
    }
    return newDice
  };

  function newDieGenerator(){
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return {
      value: randomNumber,
      isHeld: false,
      id: nanoid()
    }
  }
  function holdDice(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => 
    <Die 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}
    />
  )

  const rollDice = (id) => {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld === true ? die : newDieGenerator()
    }))
}

  return(
    <main>
      <h1 className="title">Tenzies!</h1>
      <h3 className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
      <div className="dice-container">
        {diceElements}
      </div>
     
      <button onClick={rollDice} className="roll-dice">Roll Dice</button>

    </main>
  )
}


export default App