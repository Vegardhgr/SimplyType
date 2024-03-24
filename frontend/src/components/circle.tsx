import { CirclePosition } from "../interfaces/interfaces"
import "./circle.css"

function Circle({position}:{position:CirclePosition}) {
    return(
        <div 
            className="circle"
            style={{transform:`translate(${position.x}px, ${position.y}px)`}}>
        </div>
    )
}

export default Circle