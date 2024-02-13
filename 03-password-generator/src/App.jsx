import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  
  // You have to declare one for each variable you want to use
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialAllowed, setSpecialAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  /**
   * This is a very common optimization technique, use memoization to avoid re-creating the function every time the component re-renders.
   * 
   * If the dependencies don't change so often this is a good way to optimize the performance of the component.
   */
  const generatePassword = useCallback(() => {

    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const special = '!@#$%^&*()_+'

    if (numberAllowed) str += numbers
    if (specialAllowed) str += special

    // The length of the password is determined by the length state [length, setLength]
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }

    setPassword(pass)
  }, [length, numberAllowed, specialAllowed]) // This array contains the dependencies of the function, if any of these change, the function will be re-created.


  /**
   * Use useEffect when you want to update the state of a variable after some event, at least run once when the page is loaded.
   * 
   * Use this technique for frequently changing states, like the password in this case.
   */
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, specialAllowed, generatePassword])

  /**
   * Basically this function use the clipboard API to copy the password (our state object) to the clipboard.
   */
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select() // We use the ref to select the input field
    alert('Password copied to clipboard')
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef} // allow to keep the reference to the component in the App context.
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={() => copyPasswordToClipboard()}
          >copy</button>
      </div>
      
      <div className='flex text-sm gap-x-2' >
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          name="" 
          id=""
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {

            /*
              * This is a way to update the state of a variable using the previous state.
              * This callback funcion also guarantees that the state is updated correctly and propagated.
            */
            setNumberAllowed((prev) => !prev)
          }}
          name=""
          id="" />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={specialAllowed}
          onChange={() => {
            setSpecialAllowed((prev) => !prev)
          }}
          name=""
          id="" />
          <label htmlFor="charInput">Character</label>
        </div>
        
      </div>

    </div>
  )
  
}

export default App
