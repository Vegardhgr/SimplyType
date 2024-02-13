import './App.css'
import Box from './components/box'
import { useState } from 'react'

function App() {
  const [wordlist, setWordlist] = useState<string>("") 

  return (
      <Box setWordlist = {setWordlist} wordlist = {wordlist}/>
  )
}

export default App
