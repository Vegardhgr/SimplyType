import './typing.css'
import { useState, Dispatch, SetStateAction, useEffect, useRef} from 'react'
import renderStatus from '../utils/DisplayStatus';
import HandleKeyboardEvent from '../utils/handleKeyboardEvent';
import ConcatNewWordlist from '../utils/concatWordlist';
import CreateNewWordlist from '../utils/createNewWordlist';
import CalcWPM from '../utils/calcWPM';
import { CirclePosition } from '../interfaces/interfaces';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

function Typing({wordlist, setWordlist, nrOfCorrectChars,
    nrOfWrongChars, initialTimeInSec, setTimerIsZero,
    setIsCharsCounted, setTimerHasStart, uniqueWords, char, setPosition, 
    setNrOfCorrectChars, setNrOfWrongChars}: {
        wordlist: wordTupleType[], setWordlist: Dispatcher<wordTupleType[]>,
        nrOfCorrectChars: number, nrOfWrongChars: number, initialTimeInSec: number
        setTimerIsZero: Dispatcher<boolean>,
        setIsCharsCounted: Dispatcher<boolean>,
        setTimerHasStart: Dispatcher<boolean>,
        uniqueWords: string[], char:string, setPosition: Dispatcher<CirclePosition>,
        setNrOfCorrectChars: Dispatcher<number>, setNrOfWrongChars: Dispatcher<number>,
    }){
    const [charCount, setCharCount] = useState(0)
    const [firstCharTyped, setFirstCharTyped] = useState(false)
    const [timer, setTimer] = useState<number>(initialTimeInSec)
    const [timeLastUpdate, setTimeLastUpdate] = useState(0)
    const [wordCount, setWordCount] = useState(0)
    const lengthOfLine = 300
    const colorCorrect = "gray"
    const colorWrong = "brown"

    const textRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();
        }
    }, [firstCharTyped]);
    
    useEffect(() => {
        if (firstCharTyped) {
            // Start the timer when the component mounts
            const timerId = setInterval(() => {
                const timeNow = Date.now()
                const elapsedTime = timeNow - timeLastUpdate
                setTimeLastUpdate(timeNow)
                setTimer(prevTime => (prevTime - Math.floor(elapsedTime/1000))); //Converts elapsedTime from ms to s
            }, 100);

            // Stop the timer when the time reaches zero
            if (timer <= 0) {
                setTimerIsZero(true)
                clearInterval(timerId);
            }

            // Cleanup function to clear the timer when the component unmounts
            return () => clearInterval(timerId);
        }
    }, [timer, firstCharTyped])

    useEffect(() => {
        if (firstCharTyped) {
            let wpm = CalcWPM(nrOfCorrectChars, initialTimeInSec)
            const highScore = Number(localStorage.getItem("highScore"))
            if (highScore === 0) {
                setPosition({x:lengthOfLine,y:0})
            } else {
                if (wpm > highScore) {
                    wpm = highScore
                }
                setPosition({x:(wpm/Number(localStorage.getItem("highScore"))*lengthOfLine),y:0})
            }    
        }    
    }, [nrOfCorrectChars])

    useEffect(() => {
        setTimer(initialTimeInSec)
    }, [initialTimeInSec]) 

    const renderText = () => {
        return wordlist.map(([char, isItTyped, shouldTheCharBeHidden], index) => {
            if (shouldTheCharBeHidden) {
                // Do nothing
                return null
            } else if (isItTyped === undefined) {
                return <span key = {index}>{char}</span>
            } else if (isItTyped) {
                return <span key = {index} style={{color: colorCorrect}}>{char}</span>
            } else {
                return <span key = {index} style={{color: colorWrong}}>{char}</span>               
            }
        })
    }

    const reset = () => {
        if (timer <= 0) {
            localStorage.setItem("score", CalcWPM(nrOfCorrectChars, initialTimeInSec).toLocaleString())
        }    
        CreateNewWordlist(uniqueWords, setWordlist, char)
        setTimer(initialTimeInSec)
        setCharCount(0)
        setWordCount(0)
        setTimerIsZero(false)
        setFirstCharTyped(false)
        setIsCharsCounted(false)
        setTimerHasStart(false)
        setWordlist([["Loading...", undefined, false]]) // Forces an update in the wordlist
        if (textRef.current) {
            textRef.current.focus();
        }
        setPosition({x:0, y:0})
        setNrOfCorrectChars(0)
        setNrOfWrongChars(0)
    }

    const keyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (timer <= 0) {
            return
        }
        if (!firstCharTyped) { /*First time a character is typed*/
            setFirstCharTyped(true)
            setTimeLastUpdate(Date.now())
            setTimerHasStart(true)
        }

        HandleKeyboardEvent(charCount, setCharCount, wordlist, setWordlist, setWordCount, e,
            setNrOfCorrectChars, setNrOfWrongChars)

        if (wordlist[charCount][0] === "-" && wordCount % 10 == 0) {
            ConcatNewWordlist(uniqueWords, setWordlist, char)
        }
    }

    return(
        <div>
            {timer <= 0 ?
                renderStatus(nrOfCorrectChars, nrOfWrongChars, initialTimeInSec) :
                <p></p>
            }
            <div ref={textRef} style={{ outline: 'none' }} tabIndex={1} id = "text" onKeyDown={keyPressed} autoFocus>{renderText()}</div>
            <div>Time:  {timer} sec</div>
            <button onClick={reset}>Reset</button>
        </div>
    )

}

export default Typing;