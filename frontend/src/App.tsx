import './App.css'
import Typing from './components/typing'
import { useState, useEffect } from 'react'
import CalcWPM from './utils/calcWPM'
import FetchWordsFromTxtFile from './utils/fetchWordsFromTxtFile'
import CorrectAndWrongNrOfChars from './utils/correctAndWrongNrOfChars'
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
    const [timerIsZero, setTimerIsZero] = useState(false)
    const [isCharsCounted, setIsCharsCounted] = useState(false)
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

    const isHighScore = () => {
        const potentialHighScore:number = CalcWPM(nrOfCorrectChars, initialTimeInSec)
        if (potentialHighScore>highScore) {
            return true
        }
        return false
    }
    const saveHighScore = () => {
        const newHighScore = CalcWPM(nrOfCorrectChars, initialTimeInSec)
        localStorage.setItem(localStorageHighScoreKey, newHighScore.toString())
        setHighScore(newHighScore)
    }
    const saveHighScoreButton = () => {
        return isHighScore() ? <button onClick={saveHighScore}>Save high score</button>:""
    }
    const clearHighScore = () => {
        localStorage.setItem(localStorageHighScoreKey, "0")
        setHighScore(0)
    }
    // const calcAnimationSpeed = () => {
    //     const prevWPM = Number(localStorage.getItem(localStoragePrevScoreKey))
    //     if (prevWPM !== 0) {
    //         const speed = prevWPM * initialTimeInSec/60
    //         // Number(localStoragePrevScoreKey)/initialTimeInSec
    //     }
    // }

    return (
        <div id = "content">
            <div id = "highScore">
                <div>High score: {highScore}</div>
                {timerIsZero  && saveHighScoreButton()}
                <button onClick={clearHighScore}>Clear high score</button>
            </div>
            <div id = "textAndTimeRendering">
                <Typing setWordlist = {setWordlist} wordlist = {wordlist} 
                    nrOfCorrectChars = {nrOfCorrectChars} nrOfWrongChars = {nrOfWrongChars}
                    initialTimeInSec = {initialTimeInSec} setTimerIsZero = {setTimerIsZero}
                    setIsCharsCounted = {setIsCharsCounted} setTimerHasStart = {setTimerHasStart}
                    uniqueWords={uniqueWords} char = {char} setPosition={setPosition}
                    setNrOfCorrectChars={setNrOfCorrectChars} setNrOfWrongChars={setNrOfWrongChars}/>
            </div>
            <div className='circleContainer'>
                <Circle position={position}/>
            </div>
            {!timerHasStart && <TimerDropDownList setInitialTimeInSec={setInitialTimeInSec}/>}
            {!timerHasStart && <LangDropDownList setLanguage = {setLanguage}/>}
            {!timerHasStart && <CharDropDownList language={language} setChar={setChar}/>}
            <div>Prev score: {localStorage.getItem(localStoragePrevScoreKey)}</div>
        </div>

    )
}

export default App
