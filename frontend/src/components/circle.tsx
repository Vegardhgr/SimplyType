import "./circle.css"
interface Speed {
    position: {x:number,y:number}
}

function Circle({position}:Speed) {
    return(
        <div 
            className="circle"
            style={{transform:`translate(${position.x}px, ${position.y}px)`}}>
        </div>
    )
}

export default Circle