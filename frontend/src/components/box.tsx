import './box.css'
import wordlist_txt from '../wordlist.txt'
import React, { useState, Dispatch, SetStateAction, ChangeEvent } from 'react'

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type PressEvent = React.KeyboardEvent<HTMLInputElement>;

function Box({wordlist, setWordlist}:{wordlist: string, setWordlist: Dispatcher<string>}){
    const [typedString, setTypedString] = useState<String>("")
    const testWordString = "hello world type keyboard practice easy words quick fox jump lazy dog cat hat ball park"

    /*Fetching words from a text file*/
    async function fetchWordlist_txt(wordlist_file:string) {
        try {
            const response = await fetch(wordlist_file)
            const text = await response.text()
            const wordsArray = text.split(/\r?\n/) //Splitting the text into an array of words
            const wordsString = wordsArray.join('-') //Converts array into string with whitespace between each word
            setWordlist(wordsString)
        } catch(error) {
            console.log(error)
        }
    }

    const renderText = () => {
        return wordlist.split("").map((char, index) => {
            console.log("her", typedString[index])
            if (index+1 > typedString.length || typedString[index] === undefined) {
                return <span key = {index}>{char}</span>
            } else if (char === typedString[index] || typedString[index] === " " && char == "-") {
                return <span key = {index} style={{color: 'green'}}>{char}</span>
            } else {
                 return <span key = {index} style={{color: 'red'}}>{char}</span>               
            }
        })
    }

    const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const key = e.key
        console.log("hei: ", key.charCodeAt(0))
        if (key === "Backspace") {
            setTypedString(typedString.slice(0,-1))
        } else if (key.length > 1 && key !== "Space") {
            
        }
        else if (key.charCodeAt(0) === 32 || key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 125) {
            setTypedString(typedString+key)
        }
    }

    {wordlist.length == 0 && fetchWordlist_txt(wordlist_txt)}    

    return(
        <div id = "textWrapperBox">
            <div tabIndex={1} id = "text" onKeyDown={handleChange}>{renderText()}</div>
        </div>
    )

}

export default Box;