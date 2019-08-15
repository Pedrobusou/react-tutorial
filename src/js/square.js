import React from 'react';

/**
 * Square is no longer a React component
 * It will not have status nor (true react)props
 * @param {*} props 
 */
export default function Square(props) {
    let classes = props.isActive ? "square active" : "square";

    /**Using props given by parent component Board*/
    return (
        <button className={classes} onClick={props.onClick} >
            {props.value}
        </button>
    );
}