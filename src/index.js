import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Square is no longer a React component
 * It will not have status nor (true react)props
 * @param {*} props 
 */
function Square(props) {
    /**
     * Using props given by parent component Board
     */
    return (
        <button className="square" onClick={props.onClick} >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * Array(9). Will store x, o or null
             */
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); //Slice to return a new instance to prevent mutation of the original
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    /**
     * Instantiate Squares passing props
     * @param {*} i 
     */
    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
