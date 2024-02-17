import './box.css'
import wordlist_txt from '../wordlist.txt'
import React, { useState, Dispatch, SetStateAction, useEffect} from 'react'
import RandSortArr from './randSortArr';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined]

function Box({wordlist, setWordlist}:{wordlist: wordTupleType[], setWordlist: Dispatcher<wordTupleType[]>}){
    const [removedChars, setRemovedChars] = useState<wordTupleType[]>([])
    const [charCount, setCharCount] = useState<number>(0)

    const incCharCount = () => {
        setCharCount(prevVal => prevVal+1)
    }
    const decCharCount = () => {
        setCharCount(prevVal => prevVal-1)
    }

    useEffect(() => {
        {wordlist.length === 0 && fetchWordlist_txt(wordlist_txt)}    
    },[])
    
    /*Fetching words from a text file*/
    async function fetchWordlist_txt(wordlist_file:string) {
        try {
            const response = await fetch(wordlist_file)
            const text = await response.text()
            let wordsArray: String[] = text.split(/\r?\n/) //Splitting the text into an array of words
            wordsArray = RandSortArr(wordsArray) //Randomly sorting the array
            const wordsString = wordsArray.join('-') //Converts array into string with whitespace between each word
            const wordsTuple: wordTupleType[] = wordsString.split("").map((char) => {
                return [char, undefined]
            })
            setWordlist(wordsTuple)
        } catch(error) {
            console.log(error)
        }
    }

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

    const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const keyCode = e.key.charCodeAt(0)
        const keyValue = e.key.valueOf()
        console.log(e.key.valueOf())   
        if (keyValue.length === 1 || keyValue === "Backspace") {
            if (keyValue === "Backspace" && charCount > 0) {
                decCharCount()
                setWordlist(oldValue => {
                        let newValue = [...oldValue]
                        newValue[charCount-removedChars.length-1] = [newValue[charCount-removedChars.length-1][0], undefined]                        
                        removedChars.length > 0 ? newValue = [removedChars[removedChars.length-1], ...newValue]:null
                        return newValue
                })
                if (removedChars.length > 0) {
                    setRemovedChars(oldValue => oldValue.slice(0,-1))
                }
            } else if (keyValue !== "Backspace" && (keyCode === 32 || keyCode >= 65 && keyCode <= 125)) { //keyCode === 32 is space            
                let isCorrectKey = false
                console.log(charCount)
                if (keyValue === wordlist[charCount-removedChars.length][0] || 
                    keyCode === 32 && wordlist[charCount-removedChars.length][0] === "-") {
                    isCorrectKey = true
                }
                setWordlist(oldValue => {
                    let newValue = [...oldValue]
                    newValue[charCount-removedChars.length] = [newValue[charCount-removedChars.length][0], isCorrectKey]                        
                    return newValue
                })

                incCharCount()

                if (charCount > 4) {
                    setRemovedChars(prevVal => [...prevVal, wordlist[0]])
                    setWordlist(prevVal => prevVal.slice(1))
                }
            }
        }

    }
    return(
        <div id = "textWrapperBox">
            <div tabIndex={1} id = "text" onKeyDown={handleChange}>{renderText()}</div>
        </div>
    )

}

export default Box;