import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  /*
    color is a state variable, if the value of color changes, the component will re-render (react propagates the changes to the DOM)
    setColor is a function to change the value of color: see onClick={() => setColor('green')
    olive is the initial value of color
  */
  const [color, setColor] = useState('olive')

  return (

    <div className='w-full h-screen duration-300' style={{backgroundColor:color}}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <button onClick={() => {setColor('red')}} className='outline-none px-4 py-1 rounded-full 
          shadow-lg text-black' style={{backgroundColor: 'red'}}>Red</button>
        
        <button onClick={() => setColor('green')} className='outline-none px-4 py-1 rounded-full 
          shadow-lg text-black' style={{backgroundColor: 'green'}}>Green</button>

        <button onClick={() => setColor('blue')} className='outline-none px-4 py-1 rounded-full 
          shadow-lg text-black' style={{backgroundColor: 'blue'}}>Blue</button>
      </div>
    </div>
  )
}

export default App
