import { Dispatch, SetStateAction } from 'react'
import RandSortArr from './randSortArr';
// import wordlist from '../wordlists/wordlist_eng.txt'


type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

async function FetchWordsFromTxtFile(setUniqueWords:Dispatcher<String[]>, setWordlist:Dispatcher<wordTupleType[]>, language:string) {
    const wordlist = "/wordlists/wordlist_"+language+".txt"
    try {
        const response = await fetch(wordlist)
        const text = await response.text()
        let wordsArray: String[] = text.split(/\r?\n/) //Splitting the text into an array of words
        setUniqueWords(wordsArray)
    } catch(error) {
        console.log(error)
    }
}

export default FetchWordsFromTxtFile;


