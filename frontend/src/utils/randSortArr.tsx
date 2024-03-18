
function RandSortArr(arr: string[], numberOfWords: number, char: string) {
    /*for (let i: number = arr.length-1; i > 0; i--) {
        const j: number = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }*/

    const randomWordsFromArr: string[] = []

    for (let i = 0; i<numberOfWords; i++) {
        let notContainingChar = true
        let word = ""
        while(notContainingChar) {
            word = arr[Math.floor(Math.random() * arr.length)]
            if (word.includes(char)) {
                notContainingChar=false
            }
            console.log(notContainingChar)
        }
        randomWordsFromArr.push(word)
    }
    return randomWordsFromArr
}


export default RandSortArr