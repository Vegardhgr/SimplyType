import CalcWPM from "./calcWPM";

function SaveHighScoreToLocalStorage(nrOfCorrectChars: number, initialTimeInSec: number, 
    localStorageKey: string) {
    const newHighScore = CalcWPM(nrOfCorrectChars, initialTimeInSec)
    localStorage.setItem(localStorageKey, newHighScore.toString())
    return true
}

export default SaveHighScoreToLocalStorage;