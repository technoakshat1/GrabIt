import React from "react";
import {useSpring,animated} from "react-spring";

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x,y,s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function CategoryCard(props){
    const [animationProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    return(
      <animated.div className="category-card-container"
        onMouseEnter={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: animationProps.xys.interpolate(trans) }}
      >
        <div className="card-img-container">
          <img src={props.img} className="card-img" alt="Card"/>
          </div>
          <div className="card-footer">
           
              <h4>{props.title}</h4>
              <p>{props.content}</p>
             
          </div>
      </animated.div>
    );
}

export default CategoryCard;