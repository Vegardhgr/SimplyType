import { Dispatch, SetStateAction } from "react";
import RandSortArr from "./randSortArr";
type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

async function CreateWordlist(uniqueWords:String[], setWordlist:Dispatcher<wordTupleType[]>) {
        const wordsArray = RandSortArr(uniqueWords) //Randomly sorting the array
        const wordsString = wordsArray.join('-') //Converts array into string with whitespace between each word
        const wordsTuple: wordTupleType[] = wordsString.split("").map((char) => {
            return [char, undefined,false]
        })
        setWordlist(wordsTuple)
}

export default CreateWordlist;