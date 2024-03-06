function CalcWPM(nrOfCorrectChars:number, initialTimeInSec:number) {
    const charInAvgWord:number = 5;
    const wpm = parseFloat((nrOfCorrectChars/(charInAvgWord*initialTimeInSec/60)).toFixed(1))
    localStorage.setItem("score", wpm.toLocaleString())
    return wpm

}

export default CalcWPM;