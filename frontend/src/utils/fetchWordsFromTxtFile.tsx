import { Dispatch, SetStateAction } from 'react'

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

async function FetchWordsFromTxtFile(setUniqueWords:Dispatcher<string[]>, language:string) {
    const wordlist = "/wordlists/wordlist_"+language+".txt"
    try {
        const response = await fetch(wordlist)
        const text = await response.text()
        let wordsArray: string[] = text.split(/\r?\n/) //Splitting the text into an array of words
        setUniqueWords(wordsArray)
    } catch(error) {
        console.log(error)
    }
}

export default FetchWordsFromTxtFile;


