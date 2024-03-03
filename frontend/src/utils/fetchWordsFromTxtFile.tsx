import { Dispatch, SetStateAction } from 'react'
import RandSortArr from './randSortArr';
// import wordlist from '../wordlists/wordlist_eng.txt'


type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

async function FetchWordsFromTxtFile(setWordlist:Dispatcher<wordTupleType[]>, language:string) {
    const wordlist = "/wordlists/wordlist_"+language+".txt"
    try {
        const response = await fetch(wordlist)
        const text = await response.text()
        let wordsArray: String[] = text.split(/\r?\n/) //Splitting the text into an array of words
        wordsArray = RandSortArr(wordsArray) //Randomly sorting the array
        const wordsString = wordsArray.join('-') //Converts array into string with whitespace between each word
        const wordsTuple: wordTupleType[] = wordsString.split("").map((char) => {
            return [char, undefined,false]
        })
        setWordlist(wordsTuple)
    } catch(error) {
        console.log(error)
    }
}

export default FetchWordsFromTxtFile;


