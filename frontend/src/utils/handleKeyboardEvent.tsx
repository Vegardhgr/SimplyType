import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

function HandleKeyboardEvent(charCount:number, setCharCount:Dispatcher<number>, 
    wordlist:wordTupleType[], setWordlist:Dispatcher<wordTupleType[]>,
    setWordCount:Dispatcher<number>, e: React.KeyboardEvent<HTMLDivElement>,
    setNrOfCorrectChars:Dispatcher<number>, setNrOfWrongChars:Dispatcher<number>) {

    const keystrokesBeforeDeletion:number = 20 
    const keyCode = e.key.charCodeAt(0)
    const keyValue = e.key.valueOf()

    const incCharCount = () => {
        setCharCount(prevVal => prevVal+1)
    }

    const decCharCount = () => {
        setCharCount(prevVal => prevVal-1)
    }
        
    if (keyValue.length === 1 || keyValue === "Backspace") {
        if (keyValue === "Backspace" && charCount > 0 &&
            wordlist[charCount-1][0] != "-") {  
            if (wordlist[charCount-1][1] === false) {
                setNrOfWrongChars(prevVal => prevVal-1)
            } else {
                setNrOfCorrectChars(prevVal => prevVal-1)
                
            }
            const newCopy = [...wordlist]
            newCopy[charCount-1][1] = undefined
            if (charCount >= keystrokesBeforeDeletion) {
                newCopy[charCount-keystrokesBeforeDeletion][2] = false
            }

            setWordlist(newCopy)

            decCharCount()
        } else if (keyValue !== "Backspace" && (keyCode === 32 || keyCode >= 65 && keyCode <= 125) ||  //keyCode === 32 is space
                       keyCode === 230 || keyCode === 248 || keyCode === 229) { // lowercase æ, ø, å             
            let isCorrectKey = false

            if (keyValue === wordlist[charCount][0] || 
                keyCode === 32 && wordlist[charCount][0] === "-") {
                isCorrectKey = true
            } 
            if (wordlist[charCount][0] === "-") {
                setWordCount(prevValue => prevValue + 1)
            }

            const newCopy = [...wordlist]
            if (charCount >= keystrokesBeforeDeletion) {
                newCopy[charCount-keystrokesBeforeDeletion][2] = true
            } 
            newCopy[charCount] = [wordlist[charCount][0], isCorrectKey, false]
            
            setWordlist(newCopy)
            if (!isCorrectKey) {
                setNrOfWrongChars(prevVal => prevVal+1)
            } else {
                setNrOfCorrectChars(prevVal => prevVal+1)
            }
            incCharCount()
        }
    }
}
export default HandleKeyboardEvent;