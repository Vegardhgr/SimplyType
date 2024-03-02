import React, { SetStateAction } from "react"

function TimerDropDownList({setInitialTimeInSec}:
    {setInitialTimeInSec:React.Dispatch<SetStateAction<number>>}){


    const renderOptions = () => {
        let timerOptions = []
        for (let i = 5; i <= 60; i+=5) {
            let option = <option value = {i} key = {i}>{i}</option>
            timerOptions.push(option)
        }
        return timerOptions
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInitialTimeInSec(Number(e.target.value))
    }

    return(
        <div>
            <select onChange = {handleChange}>
                {renderOptions()}
            </select>
        </div>
    )
}

export default TimerDropDownList;