import { SetStateAction } from "react";

function CharDropDownList({language, setChar}:
    {language:string, setChar:React.Dispatch<SetStateAction<String>>}){
    
    const langLetterMap = new Map<string, string[]>([
        ["eng", ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']],
        ["nor", ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å']],
    ])
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChar(e.target.value)
    }

    const createOptions = () => {
        let optionArr:JSX.Element[] = []
        const letters = langLetterMap.get(language)
        optionArr.push(<option key = {-1} hidden>--Char--</option>)
        if (letters) {
            letters.forEach(char => {
                optionArr.push(<option key = {char} value = {char}>{char}</option>)
            })
        }
        return optionArr
    }

    return(
        <div>
            <label htmlFor="languageSelect">Select language</label><br/>
            <select id = "languageSelect" onChange = {handleChange}>
                {createOptions()}
            </select>
        </div>
    )
}

export default CharDropDownList;