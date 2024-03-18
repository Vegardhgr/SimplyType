import './typing.css'
import { useState, Dispatch, SetStateAction, useEffect, useRef} from 'react'
import renderStatus from '../utils/DisplayStatus';
import HandleKeyboardEvent from '../utils/handleKeyboardEvent';
import ConcatNewWordlist from '../utils/concatWordlist';
import CreateNewWordlist from '../utils/createNewWordlist';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

function Typing({wordlist, setWordlist, nrOfCorrectChars,
    nrOfWrongChars, initialTimeInSec, setTimerIsZero,
    setIsCharsCounted, setTimerHasStart, uniqueWords, char}: {
        wordlist: wordTupleType[], setWordlist: Dispatcher<wordTupleType[]>,
        nrOfCorrectChars: number, nrOfWrongChars: number, initialTimeInSec: number
        setTimerIsZero: Dispatcher<boolean>,
        setIsCharsCounted: Dispatcher<boolean>,
        setTimerHasStart: Dispatcher<boolean>,
        uniqueWords: string[], char:string
    }){
    const [charCount, setCharCount] = useState(0)
    const [firstCharTyped, setFirstCharTyped] = useState(false)
    const [timer, setTimer] = useState<number>(initialTimeInSec)
    const [timeLastUpdate, setTimeLastUpdate] = useState(0)
    const [wordCount, setWordCount] = useState(0)
    // const [fetchWords, setFetchWords] = useState(false)

    const textRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();
        }
    }, [firstCharTyped]);
    
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

    useEffect(() => {
        console.log("wordcount" + wordCount)
    }, [wordCount])

    const reset = () => {
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

        HandleKeyboardEvent(charCount, setCharCount, wordlist, setWordlist, setWordCount, e)
        if (wordlist[charCount][0] === "-" && wordCount % 10 == 0) {
            console.log("Updated at", wordCount)
            ConcatNewWordlist(uniqueWords, setWordlist, char)
            // setFetchWords(false)
        }
        // } else if (!fetchWords && wordCount % 10 !== 0) {
        //     setFetchWords(true)
        // }
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