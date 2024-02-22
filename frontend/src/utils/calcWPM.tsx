function CalcWPM(nrOfCorrectChars:number, initialTimeInSec:number) {
    const charInAvgWord:number = 5;
    return parseFloat((nrOfCorrectChars/(charInAvgWord*initialTimeInSec/60)).toFixed(1))
}

export default CalcWPM;