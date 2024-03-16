import { Dispatch, SetStateAction } from "react";
import RandSortArr from "./randSortArr";
type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

async function ConcatNewWordlist(uniqueWords:String[], setWordlist:Dispatcher<wordTupleType[]>) {
    const numberOfWordToRetrieve = 10
    const wordsArray = RandSortArr(uniqueWords, numberOfWordToRetrieve) //Randomly sorting the array
    const wordsString = wordsArray.join('-') //Converts array into string with whitespace between each word
    let wordsTuple: wordTupleType[] = wordsString.split("").map((char) => {
        return [char, undefined,false]
    })

    wordsTuple = [...wordsTuple, ["-", undefined, false]]

    setWordlist(currentWords => [...currentWords, ...wordsTuple])
}

export default ConcatNewWordlist;