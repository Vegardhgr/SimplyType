import './box.css'
import wordlist_txt from '../wordlist.txt'
import { useState, Dispatch, SetStateAction, useEffect} from 'react'
import FetchWordsFromTxtFile from './fetchWordsFromTxtFile';
import Timer from './timer';
import renderStatus from './renderStatus';
import HandleKeyboardEvent from '../utils/handleKeyboardEvent';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined]

function Box({wordlist, setWordlist}:{wordlist: wordTupleType[], setWordlist: Dispatcher<wordTupleType[]>}){
    const [removedChars, setRemovedChars] = useState<wordTupleType[]>([])
    const [charCount, setCharCount] = useState<number>(0)
    const initialTimeInSec = 5
    const [timer, setTimer] = useState<number>(initialTimeInSec)
    const [timerId, setTimerId] = useState<number | null>(null); // State to hold the timer id 
    const [timeLastUpdate, setTimeLastUpdate] = useState<number>(0)
    const [isTimerSet, setIsTimerSet] = useState<boolean>(false);

    const keystrokesBeforeDeletion: number = 20

    const incCharCount = () => {
        setCharCount(prevVal => prevVal+1)
    }
    const decCharCount = () => {
        setCharCount(prevVal => prevVal-1)
    }

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
    }, [timer, timerId]);

    useEffect(() => {
        if (wordlist.length === 0) {
            FetchWordsFromTxtFile(wordlist_txt, setWordlist)
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
        
    

    return(
        <>
            <div id = "textWrapperBox">
                <div tabIndex={1} id = "text" onKeyDown={keyPressed}>{renderText()}</div>
            </div>
            <div>{timer}</div>
            {timer == 0 && renderStatus(removedChars, wordlist, initialTimeInSec)}
            <button onClick={reset}>Reset</button>
        </>
    )

}

export default Box;