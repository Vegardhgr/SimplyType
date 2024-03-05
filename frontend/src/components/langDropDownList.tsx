import { SetStateAction } from "react";

function LangDropDownList({setLanguage}:
    {setLanguage:React.Dispatch<SetStateAction<string>>}){

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value)
    }

    return(
        <div>
            <label htmlFor="languageSelect">Select language</label><br/>
            <select id = "languageSelect" onChange = {handleChange}>
                <option value = "" hidden>--Language--</option>
                <option value = "eng">English</option>
                <option value = "nor">Norwegian</option>
            </select>
        </div>
    )
}

export default LangDropDownList;