import CalcWPM from "../utils/calcWPM"

function renderStatus(nrOfCorrectChars:number, nrOfWrongChars:number, initialTimeInSec:number) {
    const accuracy = (nrOfCorrectChars/(nrOfCorrectChars+nrOfWrongChars)*100).toFixed(1)
    return <div>Correct: <span style={{color:"green"}}>{nrOfCorrectChars}</span>
        Wrong: <span style={{color:"red"}}>{nrOfWrongChars}</span>
        WPM: {CalcWPM(nrOfCorrectChars, initialTimeInSec)}
        Accuracy: {accuracy == "NaN" ? 0 : accuracy}%</div>
}

export default renderStatus;