import { useState } from 'react'
import './App.css'

function App() {

  /**
   * THe first value is a variable that will store the value of the state
   * and the second value is a function that will allow us to change the value of the state
   */
  const [count, setCount] = useState(0)


  /**
   * Trying to change the state multiple times it's not going to work
   * because the react update the state in batch mode and they recognize that the same function 
   * is trying to change the state multiple times and only execute the last one.(batch mode)
   */
  const addOneMultipleTimes = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  /**
   * In this function we use a callback to get the previous state and then we can change the state to a new one.
   * This works because have to wait for the previous state to be updated.
   */
  const addOneMultipleTimesWithPrevState = () => {
    setCount(prevCount => prevCount + 1)
    setCount(prevCount => prevCount + 1)
    setCount(prevCount => prevCount + 1)
    setCount(prevCount => prevCount + 1)
  }

  const addValue = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  return (
    <>
      <h1>Fiest react app</h1>
      <h2>Count value: {count} </h2>
      <button onClick={addValue}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={addOneMultipleTimesWithPrevState}>Add multiple times</button>
      <p>footer: {count}</p>
    </>
  )
}

export default App
