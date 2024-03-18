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

/* wordTupleType is on the form -> [char, isItTyped, shouldTheCharBeHidden]*/
type wordTupleType = [string, boolean | undefined, boolean]

function App() {
    const localStorageKey = "highScore"
    const [initialTimeInSec, setInitialTimeInSec] = useState(15)
    const localStorageHighScore:string|null = localStorage.getItem(localStorageKey)
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

    useEffect(() => {
        if ((wordlist.length === 0) || wordlist[0][0] ==="Loading...") {
            FetchWordsFromTxtFile(setUniqueWords, language)
        }
        if (timerIsZero && !isCharsCounted) {
            const [nrOfCorrect, nrOfWrong, isCounted] = CorrectAndWrongNrOfChars(wordlist)
            setNrOfCorrectChars(nrOfCorrect)
            setNrOfWrongChars(nrOfWrong)
            setIsCharsCounted(isCounted)
        }
    }, [wordlist, timerIsZero]);

    useEffect(() => {
        FetchWordsFromTxtFile(setUniqueWords, language)
    }, [language])

    useEffect(() => {
        CreateWordlist(uniqueWords, setWordlist, char)
    }, [uniqueWords])

    const isHighScore = () => {
        const potentialHighScore:number = CalcWPM(nrOfCorrectChars, initialTimeInSec)
        if (potentialHighScore>highScore) {
            return true
        }
        return false
    }
    const saveHighScore = () => {
        const newHighScore = CalcWPM(nrOfCorrectChars, initialTimeInSec)
        localStorage.setItem(localStorageKey, newHighScore.toString())
        setHighScore(newHighScore)
    }
    const saveHighScoreButton = () => {
        return isHighScore() ? <button onClick={saveHighScore}>Save high score</button>:""
    }
    const clearHighScore = () => {
        localStorage.setItem(localStorageKey, "0")
        setHighScore(0)
    }
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
                    uniqueWords={uniqueWords} char = {char}/>
            </div>
            {!timerHasStart && <TimerDropDownList setInitialTimeInSec={setInitialTimeInSec}/>}
            {!timerHasStart && <LangDropDownList setLanguage = {setLanguage}/>}
            {!timerHasStart && <CharDropDownList language={language} setChar={setChar}/>}
            <div>Prev score: {localStorage.getItem("score")}</div>
        </div>

    )
}

export default App
