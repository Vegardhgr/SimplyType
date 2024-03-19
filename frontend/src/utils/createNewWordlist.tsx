import { Dispatch, SetStateAction } from "react";
import RandSortArr from "./randSortArr";
type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type wordTupleType = [string, boolean | undefined, boolean]

async function CreateNewWordlist(uniqueWords:string[], setWordlist:Dispatcher<wordTupleType[]>, char: string) {
    const numberOfWordsToRetrieve = 20
    const wordsArray = RandSortArr(uniqueWords, numberOfWordsToRetrieve, char) //Randomly sorting the array
    if (wordsArray[0] == "Please select another char") {
        setWordlist([[wordsArray[0], false, false]])
        return
    }
    const wordsString = wordsArray.join('-') //Converts array into string with whitespace between each word
    let wordsTuple: wordTupleType[] = wordsString.split("").map((char) => {
        return [char, undefined,false]
    })
    wordsTuple = [...wordsTuple, ["-", undefined, false]]
    setWordlist(wordsTuple)
}

export default CreateNewWordlist;