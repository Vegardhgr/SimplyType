import './box.css'
import wordlist_txt from '../wordlist.txt'
import { useState, Dispatch, SetStateAction, useEffect} from 'react'
import FetchWordsFromTxtFile from './fetchWordsFromTxtFile';
import Timer from './timer';
import renderStatus from './renderStatus';
import HandleKeyboardEvent from '../utils/handleKeyboardEvent';
import CalcWPM from '../utils/calcWPM';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined]

function Box({wordlist, setWordlist}:{wordlist: wordTupleType[], setWordlist: Dispatcher<wordTupleType[]>}){
    const [removedChars, setRemovedChars] = useState<wordTupleType[]>([])
    const [charCount, setCharCount] = useState<number>(0)
    const initialTimeInSec:number = 5
    const [timer, setTimer] = useState<number>(initialTimeInSec)
    const [timerId, setTimerId] = useState<number | null>(null); // State to hold the timer id 
    const [timeLastUpdate, setTimeLastUpdate] = useState<number>(0)
    const [isTimerSet, setIsTimerSet] = useState<boolean>(false)
    const localStorageKey = "highScore"
    const localStorageHighScore:string|null = localStorage.getItem(localStorageKey)
    const [highScore, setHighScore] = useState<number>(localStorageHighScore===null?0:parseFloat(localStorageHighScore))

    let nrOfCorrectChars:number = 0
    let nrOfWrongChars:number = 0
    

    useEffect(() => {
        /*if (timerId !== null && !isTimerSet) {
            setIsTimerSet(true);
            Timer({timeLastUpdate, setTimeLastUpdate, timer, setTimer})

        }*/
        
        if (timerId !== null) {
            // Start the timer when the component mounts
        
            const timerId = setInterval(() => {
                const timeNow = Date.now()
                const elapsedTime = timeNow - timeLastUpdate
                setTimeLastUpdate(timeNow)
                setTimer(prevTime => (prevTime - Math.floor(elapsedTime/1000))); //Converts elapsedTime from ms to s
            }, 100);

            // Stop the timer when the time reaches zero
            if (timer <= 0) {
                clearInterval(timerId);
            }

            // Cleanup function to clear the timer when the component unmounts
            return () => clearInterval(timerId);
        }
    }, [timer, timerId])

    useEffect(() => {
        if (wordlist.length === 0) {
            FetchWordsFromTxtFile(wordlist_txt, setWordlist)
        }
        
        if (timer<=0) {
            const currentHighScoreStr:string|null = localStorage.getItem("highScore")
            const currentHighScore:number = currentHighScoreStr===null?0:parseFloat(currentHighScoreStr)
            if(currentHighScore !== null){
                console.log("nrOfCorr: " + nrOfCorrectChars + " ;; " + "inital time: " + initialTimeInSec )
                const potentialHighScore:number = CalcWPM(nrOfCorrectChars, initialTimeInSec)
                if (potentialHighScore>currentHighScore) {
                    console.log("pHS: " + potentialHighScore)
                    localStorage.setItem("highScore", potentialHighScore.toString())
                    setHighScore(potentialHighScore)
                }
            }
        }
    });
    
    const renderText = () => {
        return wordlist.map(([char, bool], index) => {
            if (bool === undefined) {
                return <span key = {index}>{char}</span>
            } else if (bool) {
                return <span key = {index} style={{color: 'green'}}>{char}</span>
            } else {
                return <span key = {index} style={{color: 'red'}}>{char}</span>               
            }
        })
    }

    const reset = () => {
        setTimer(initialTimeInSec)
        setTimerId(null)
        setRemovedChars([])
        setCharCount(0)
        FetchWordsFromTxtFile(wordlist_txt, setWordlist)
    }

    const keyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (timer <= 0) {
            return
        }
        if (timerId===null) {
            setTimerId(1)
            setTimeLastUpdate(Date.now())
        }

        HandleKeyboardEvent(charCount, setCharCount, removedChars, setRemovedChars, wordlist, setWordlist, e)
    }
        
    const countNumberOfCorrectAndWrongChars = () => {
        removedChars.map(([_,bool]) => {
            if (bool) {
                nrOfCorrectChars += 1
            } else {
                nrOfWrongChars += 1 
            }
        })
        for (const [_,bool] of wordlist) {
            if (bool) {
                nrOfCorrectChars += 1
            } else if (bool === false) {
                nrOfWrongChars += 1
            } else {
                break
            }
        }
        return true
    } 

    const clearHighScore = () => {
        localStorage.setItem(localStorageKey, "0")
        setHighScore(0)
    }

    return(
        <>
            <div>High score: {highScore} WPM </div>
            <button onClick={clearHighScore}>Clear high score</button>
            <div id = "textWrapperBox">
                <div tabIndex={1} id = "text" onKeyDown={keyPressed}>{renderText()}</div>
            </div>
            <div>Time:  {timer} sec</div>
            {timer == 0 && countNumberOfCorrectAndWrongChars() &&
                    renderStatus(nrOfCorrectChars, nrOfWrongChars, initialTimeInSec)
            }
            <button onClick={reset}>Reset</button>
        </>
    )

}

export default Box;