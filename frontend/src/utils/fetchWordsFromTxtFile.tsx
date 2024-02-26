import { Dispatch, SetStateAction } from 'react'
import RandSortArr from './randSortArr';


type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined]

async function FetchWordsFromTxtFile(wordlist_txt:string, setWordlist:Dispatcher<wordTupleType[]>) {
    try {
        const response = await fetch(wordlist_txt)
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

export default FetchWordsFromTxtFile;


