
function RandSortArr(arr: String[], numberOfWords: number) {
    /*for (let i: number = arr.length-1; i > 0; i--) {
        const j: number = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }*/

    const randomWordsFromArr: String[] = []

    for (let i = 0; i<numberOfWords; i++) {
        randomWordsFromArr.push(arr[Math.floor(Math.random() * arr.length)])
    }
    return randomWordsFromArr
}


export default RandSortArr