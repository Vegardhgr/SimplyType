
function RandSortArr(arr: string[], numberOfWords: number, char: string) {
    /*for (let i: number = arr.length-1; i > 0; i--) {
        const j: number = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }*/

    const randomWordsFromArr: string[] = []

    if (char !== "") {
        let newArr = []
        for (let i = 0; i<arr.length; i++) {
            if (arr[i].includes(char)) {
                newArr.push(arr[i])
            }
        }
        if (newArr.length === 0) {
            return ["Please select another char"]
        }
        arr = newArr
    }
    for (let i = 0; i<numberOfWords; i++) {
        let word = arr[Math.floor(Math.random() * arr.length)]
        randomWordsFromArr.push(word)
    }
    return randomWordsFromArr
}


export default RandSortArr