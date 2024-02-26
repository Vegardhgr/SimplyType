import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>

function Timer({timeLastUpdate, setTimeLastUpdate, timer, setTimer}:
    {timeLastUpdate:number, setTimeLastUpdate: Dispatch<number>, 
        timer:number, setTimer:Dispatcher<number>}) {      
          useEffect(() => {
            const timerId = setInterval(() => {
                const timeNow = Date.now()
                const elapsedTime = timeNow - timeLastUpdate
                setTimeLastUpdate(timeNow)
                setTimer(prevTime => (prevTime - Math.floor(elapsedTime/1000))); //Converts elapsedTime from ms to s

                // Stop the timer when the time reaches zero
                if (timer <= 0) {
                    clearInterval(timerId);
                }
            }, 100);


            // Cleanup function to clear the timer when the component unmounts
            return () => clearInterval(timerId);
          })
    /*  useEffect(() => {
    let intervalId: number;

    // Function to update timer
    const updateTimer = () => {
      const timeNow = Date.now();
      const elapsedTime = timeNow - timeLastUpdate;
      setTimeLastUpdate(timeNow);
      setTimer(timer - Math.floor(elapsedTime / 1000)); // Convert elapsedTime from ms to s
      // Stop the timer when the time reaches zero
      if (timer <= 0) {
        clearInterval(intervalId);
      }
    };

    // Start the timer
    intervalId = setInterval(updateTimer, 100);

    

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(intervalId);
  }, [timeLastUpdate, setTimeLastUpdate, timer, setTimer]);

  return null; // Timer component doesn't render anything*/
 /* 
    const intervalId = setInterval(() => {
        const timeNow = Date.now()
        const elapsedTime = timeNow - timeLastUpdate
        setTimeLastUpdate(timeNow)
        setTimer(prevValue => prevValue - Math.floor(elapsedTime/1000)); //Converts elapsedTime from ms to s
        // Stop the timer when the time reaches zero
        if (timer <= 0) {
            clearInterval(intervalId);
        }
    }, 100);

    

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(intervalId);*/
}

export default Timer;