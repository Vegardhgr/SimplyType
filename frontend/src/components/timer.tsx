import { useEffect } from "react";

function Timer(timeLeft: number, prevTime: number) {
    useEffect(() => {
        const timeNow: number = Date.now()
        const elapsedTime = timeNow - prevTime
        prevTime = timeNow;


    });

}

export default Timer;