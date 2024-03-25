import './App.css'
import Typing from './components/typing'
import { useState, useEffect } from 'react'
import FetchWordsFromTxtFile from './utils/fetchWordsFromTxtFile'
import TimerDropDownList from './components/timerDropDownList'
import LangDropDownList from './components/langDropDownList'
import CreateWordlist from './utils/createNewWordlist'
import CharDropDownList from './components/charDropDownList'
import Circle from './components/circle'
import { CirclePosition } from './interfaces/interfaces'

/* wordTupleType is on the form -> [char, isItTyped, shouldTheCharBeHidden]*/
type wordTupleType = [string, boolean | undefined, boolean]

function App() {
    const localStorageHighScoreKey = "highScore"
    const localStoragePrevScoreKey = "score"
    const [initialTimeInSec, setInitialTimeInSec] = useState(15)
    const localStorageHighScore:string|null = localStorage.getItem(localStorageHighScoreKey)
    const [wordlist, setWordlist] = useState<wordTupleType[]>([]) 
    const [highScore, setHighScore] = useState<number>(localStorageHighScore===null?0:parseFloat(localStorageHighScore))
    const [nrOfCorrectChars, setNrOfCorrectChars] = useState<number>(0)
    const [nrOfWrongChars, setNrOfWrongChars] = useState<number>(0)
    const [timerHasStart, setTimerHasStart] = useState(false)
    const [language, setLanguage] = useState("eng")
    const [uniqueWords, setUniqueWords] = useState<string[]>([])
    const [char, setChar] = useState<string>("");
    const [position, setPosition] = useState<CirclePosition>({x:0, y:0})

    useEffect(() => {
        if ((wordlist.length === 0) || wordlist[0][0] ==="Loading...") {
            FetchWordsFromTxtFile(setUniqueWords, language)
        }
    }, [wordlist]);

    useEffect(() => {
        FetchWordsFromTxtFile(setUniqueWords, language)
    }, [language])

    useEffect(() => {
        CreateWordlist(uniqueWords, setWordlist, char)
    }, [uniqueWords, char])

    const clearHighScore = () => {
        localStorage.setItem(localStorageHighScoreKey, "0")
        setHighScore(0)
    }

    return (
        <div id = "content">
            <div style = {{marginLeft:"1300px"}}>Prev score: {localStorage.getItem(localStoragePrevScoreKey)}</div>
            <div id = "highScore">
                <div>High score: {highScore}</div>
                <div>
                    <button onClick={clearHighScore}>Clear high score</button>
                </div>
                {/* <div>
                    {timerIsZero  && saveHighScoreButton()}
                </div> */}
            </div>
            <div id = "textAndTimeRendering">
                <Typing setWordlist = {setWordlist} wordlist = {wordlist} 
                    nrOfCorrectChars = {nrOfCorrectChars} nrOfWrongChars = {nrOfWrongChars}
                    initialTimeInSec = {initialTimeInSec} setTimerHasStart = {setTimerHasStart}
                    uniqueWords={uniqueWords} char = {char} setPosition={setPosition}
                    setNrOfCorrectChars={setNrOfCorrectChars} setNrOfWrongChars={setNrOfWrongChars}
                    setHighScore={setHighScore}/>
            </div>
            <div className='circleContainer'>
                <Circle position={position}/>
            </div>
            {!timerHasStart && <TimerDropDownList setInitialTimeInSec={setInitialTimeInSec}/>}
            {!timerHasStart && <LangDropDownList setLanguage = {setLanguage}/>}
            {!timerHasStart && <CharDropDownList language={language} setChar={setChar}/>}
        </div>

    )
}

export default App
