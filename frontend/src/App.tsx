import './App.css'
import wordlist_txt from './wordlist.txt'
import Text from './components/typing'
import { useState, useEffect } from 'react'
import CalcWPM from './utils/calcWPM'
import FetchWordsFromTxtFile from './utils/fetchWordsFromTxtFile'
import CorrectAndWrongNrOfChars from './utils/correctAndWrongNrOfChars'

/* wordTupleType is on the form -> [char, isItTyped, shouldTheCharBeHidden]*/
type wordTupleType = [string, boolean | undefined, boolean]

function App() {
    const localStorageKey = "highScore"
    const initialTimeInSec = 5
    const localStorageHighScore:string|null = localStorage.getItem(localStorageKey)
    const [wordlist, setWordlist] = useState<wordTupleType[]>([]) 
    const [highScore, setHighScore] = useState<number>(localStorageHighScore===null?0:parseFloat(localStorageHighScore))
    const [nrOfCorrectChars, setNrOfCorrectChars] = useState<number>(0)
    const [nrOfWrongChars, setNrOfWrongChars] = useState<number>(0)
    const [timerIsZero, setTimerIsZero] = useState(false)
    const [isCharsCounted, setIsCharsCounted] = useState(false)

    useEffect(() => {
        if ((wordlist.length === 0) || wordlist[0][0] ==="Loading...") {
            FetchWordsFromTxtFile(wordlist_txt, setWordlist)
        }
        if (timerIsZero && !isCharsCounted) {
            console.log("it does actually go in here")
            const [nrOfCorrect, nrOfWrong, isCounted] = CorrectAndWrongNrOfChars(wordlist)
            setNrOfCorrectChars(nrOfCorrect)
            setNrOfWrongChars(nrOfWrong)
            setIsCharsCounted(isCounted)
        }
    }, [wordlist, timerIsZero]);

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
                <Text setWordlist = {setWordlist} wordlist = {wordlist} 
                    nrOfCorrectChars = {nrOfCorrectChars} nrOfWrongChars = {nrOfWrongChars}
                    initialTimeInSec = {initialTimeInSec} setTimerIsZero = {setTimerIsZero}
                    setIsCharsCounted = {setIsCharsCounted}/>
            </div>
        </div>
    )
}

export default App
