
    interface Speed {
        position: {x:number,y:number}
    }

function animationOfSpeed(localStoragePrevScoreKey:string, initialTimeInSec: number,
    {position}:Speed) {
    const calcSpeed = () => {
        if (Number(localStoragePrevScoreKey) !== 0) {
            const speed = Number(localStoragePrevScoreKey) * initialTimeInSec/60
            // Number(localStoragePrevScoreKey)/initialTimeInSec
        }
    }
    
}

export default animationOfSpeed