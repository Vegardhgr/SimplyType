import { Dispatch, SetStateAction } from "react";
import RandSortArr from "./randSortArr";
type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

async function CreateNewWordlist(uniqueWords:String[], setWordlist:Dispatcher<wordTupleType[]>) {
    const numberOfWordsToRetrieve = 10
    const wordsArray = RandSortArr(uniqueWords, numberOfWordsToRetrieve) //Randomly sorting the array
    const wordsString = wordsArray.join('-') //Converts array into string with whitespace between each word
    let wordsTuple: wordTupleType[] = wordsString.split("").map((char) => {
        return [char, undefined,false]
    })
    wordsTuple = [...wordsTuple, ["-", undefined, false]]
    setWordlist(wordsTuple)
}

export default CreateNewWordlist;