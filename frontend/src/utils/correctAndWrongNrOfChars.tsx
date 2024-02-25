type wordTupleType = [string, boolean | undefined]

function CorrectAndWrongNrOfChars(removedChars: wordTupleType[],
    wordlist: wordTupleType[]) : [number, number, boolean] {
    let correct = 0
    let wrong = 0
    let charsAreCounted = false
    removedChars.map(([_,bool]) => {
        if (bool) {
            correct += 1
        } else {
            wrong += 1 
        }
    })
    for (const [_,bool] of wordlist) {
        if (bool) {
            correct += 1
        } else if (bool === false) {
            wrong += 1
        } else {
            break
        }
    }
    charsAreCounted = true
    return [correct, wrong, charsAreCounted]
} 
export default CorrectAndWrongNrOfChars;