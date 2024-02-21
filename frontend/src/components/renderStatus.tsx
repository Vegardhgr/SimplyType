type wordTupleType = [string, boolean | undefined]

function renderStatus(removedChars:wordTupleType[], wordlist:wordTupleType[], initialTimeInSec:number) {
    let nrOfCorrectChars:number = 0
    let nrOfWrongChars:number = 0
    const charInAvgWord:number = 5
    
    removedChars.map(([_,bool]) => {
        if (bool) {
            nrOfCorrectChars += 1
        } else {
            nrOfWrongChars += 1 
        }
    })
    for (const [_,bool] of wordlist) {
        if (bool) {
            nrOfCorrectChars += 1
        } else if (bool === false) {
            nrOfWrongChars += 1
        } else {
            break
        }
    } 
    return <div>Correct: <span style={{color:"green"}}>{nrOfCorrectChars}</span>
        Wrong: <span style={{color:"red"}}>{nrOfWrongChars}</span>
        WPM: {(nrOfCorrectChars/(charInAvgWord*initialTimeInSec/60)).toFixed(1)}
        Accuracy: {(nrOfCorrectChars/(nrOfCorrectChars+nrOfWrongChars)).toFixed(2)}</div>
}

export default renderStatus;