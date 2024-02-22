import CalcWPM from "../utils/calcWPM"

function renderStatus(nrOfCorrectChars:number, nrOfWrongChars:number, initialTimeInSec:number) {
    return <div>Correct: <span style={{color:"green"}}>{nrOfCorrectChars}</span>
        Wrong: <span style={{color:"red"}}>{nrOfWrongChars}</span>
        WPM: {CalcWPM(nrOfCorrectChars, initialTimeInSec)}
        Accuracy: {(nrOfCorrectChars/(nrOfCorrectChars+nrOfWrongChars)).toFixed(2)}</div>
}

export default renderStatus;