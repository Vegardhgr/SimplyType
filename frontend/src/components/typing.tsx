import './typing.css'
import { useState, Dispatch, SetStateAction, useEffect} from 'react'
import renderStatus from '../utils/DisplayStatus';
import HandleKeyboardEvent from '../utils/handleKeyboardEvent';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

function Typing({wordlist, setWordlist, nrOfCorrectChars,
    nrOfWrongChars, initialTimeInSec, setTimerIsZero,
    setIsCharsCounted} : {
        wordlist: wordTupleType[], setWordlist: Dispatcher<wordTupleType[]>,
        nrOfCorrectChars: number, nrOfWrongChars: number, initialTimeInSec: number
        setTimerIsZero: Dispatcher<boolean>,
        setIsCharsCounted: Dispatcher<boolean>
    }){
    const [charCount, setCharCount] = useState(0)
    const [firstCharTyped, setFirstCharTyped] = useState(false)
    const [timer, setTimer] = useState<number>(initialTimeInSec)
    const [timeLastUpdate, setTimeLastUpdate] = useState(0)
    
    useEffect(() => {
        /*if (timerId !== null && !isTimerSet) {
            setIsTimerSet(true);
            Timer({timeLastUpdate, setTimeLastUpdate, timer, setTimer})

        }*/
        
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
    }, [timer, firstCharTyped /*timerId*/])

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
                return <span key = {index} style={{color: 'green'}}>{char}</span>
            } else {
                return <span key = {index} style={{color: 'red'}}>{char}</span>               
            }
        })
    }

    const reset = () => {
        setTimer(initialTimeInSec)
        setCharCount(0)
        setTimerIsZero(false)
        setFirstCharTyped(false)
        setIsCharsCounted(false)
        setWordlist([["Loading...", undefined, false]]) // Forces an update in the wordlist
    }

    const keyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (timer <= 0) {
            return
        }
        if (!firstCharTyped) { /*First time a character is typed*/
            setFirstCharTyped(true)
            setTimeLastUpdate(Date.now())
        }

        HandleKeyboardEvent(charCount, setCharCount, wordlist, setWordlist, e)
    }
    return(
        <div>
            {timer <= 0 ?
                renderStatus(nrOfCorrectChars, nrOfWrongChars, initialTimeInSec) :
                <p></p>
            }
            <div tabIndex={1} id = "text" onKeyDown={keyPressed}>{renderText()}</div>
            <div>Time:  {timer} sec</div>
            <button onClick={reset}>Reset</button>
        </div>
    )

}

export default Typing;