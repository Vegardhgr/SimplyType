import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined]

function HandleKeyboardEvent(charCount:number, setCharCount:Dispatcher<number>, 
    removedChars:wordTupleType[], setRemovedChars:Dispatcher<wordTupleType[]>, 
    wordlist:wordTupleType[], setWordlist:Dispatcher<wordTupleType[]>,
    e: React.KeyboardEvent<HTMLDivElement>) {

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
            if (keyValue === "Backspace" && charCount > 0) {
                setWordlist(oldValue => {
                        let newValue = [...oldValue]
                        newValue[charCount-removedChars.length-1] = [newValue[charCount-removedChars.length-1][0], undefined]                        
                        removedChars.length > 0 ? newValue = [removedChars[removedChars.length-1], ...newValue]:null
                        return newValue
                })
                
                if (removedChars.length > 0) {
                    setRemovedChars(oldValue => oldValue.slice(0,-1))
                }

                decCharCount()
            } else if (keyValue !== "Backspace" && (keyCode === 32 || keyCode >= 65 && keyCode <= 125)) { //keyCode === 32 is space            
                let isCorrectKey = false

                if (keyValue === wordlist[charCount-removedChars.length][0] || 
                    keyCode === 32 && wordlist[charCount-removedChars.length][0] === "-") {
                    isCorrectKey = true
                }

                setWordlist(oldValue => {
                    let newValue = [...oldValue]
                    newValue[charCount-removedChars.length] = [newValue[charCount-removedChars.length][0], isCorrectKey]                        
                    return newValue
                })

                if (charCount > keystrokesBeforeDeletion) {
                    setRemovedChars(prevVal => [...prevVal, wordlist[0]])
                    setWordlist(prevVal => prevVal.slice(1))
                }

                incCharCount()
            }
        }
    }
export default HandleKeyboardEvent;