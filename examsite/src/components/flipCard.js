import React, {useState} from 'react'
import {useSpring, animated as a} from 'react-spring'

function flipCard() {
    const [flipped, set] = useState(false)
    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80}
    })
    return (
        <h1>FlipCard Here</h1>
    )
}

export default flipCard;