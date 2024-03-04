import { SetStateAction } from "react";

function LangDropDownList({setLanguage}:
    {setLanguage:React.Dispatch<SetStateAction<string>>}){

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value)
    }

    return(
        <div>
            <select onChange = {handleChange}>
                <option value = {"eng"}>English</option>
                <option value = {"nor"}>Norwegian</option>
            </select>
        </div>
    )
}

export default LangDropDownList;