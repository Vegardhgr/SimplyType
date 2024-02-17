import './App.css'
import Box from './components/box'
import { useState } from 'react'

type wordTupleType = [string, boolean | undefined]

function App() {
  const [wordlist, setWordlist] = useState<wordTupleType[]>([]) 

  return (
      <Box setWordlist = {setWordlist} wordlist = {wordlist}/>
  )
}

export default App
