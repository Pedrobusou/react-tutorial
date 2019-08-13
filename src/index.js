import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Square is no longer a React component
 * It will not have status nor (true react)props
 * @param {*} props 
 */
function Square(props) {
    let classes = props.isActive ? "square active" : "square";

    /**Using props given by parent component Board*/
    return (
        <button className={classes} onClick={props.onClick} >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    /**
     * Instantiate Squares passing props
     * @param {*} i 
     */
    renderSquare(i) {
        return (
            <Square
                key={"square" + i}
                isActive={i === this.props.activeSquare}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    /**This way makes the field size modification easier */
    renderBoard() {
        let xLength = this.props.xLength;
        let yLength = this.props.yLength;
        let squareNum = 0;
        let boardRows = [];
        let row = [];

        for (let i = 0; i < yLength; i++) {
            row = [];
            for (let j = 0; j < xLength; j++) {
                row.push(this.renderSquare(squareNum));
                squareNum++;
            }
            boardRows.push(row);
        }

        return <div>{boardRows.map(row => <div key={"board" + boardRows.indexOf(row)} className="board-row">{row}</div>)}</div>;
    }

    /**
     * Other way for rendering the board, hardcoding the field structure
     * Field size can also be modified by direcly editing boardStructure
    */
    renderBoard2() {
        const boardStructure = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

        const boardRows = boardStructure.map((squares, i) => {
            return (
                <div key={"board" + i} className="board-row">
                    {squares.map(squareNum => this.renderSquare(squareNum))}
                </div>
            )
        });

        return <div>{boardRows}</div>
    }

    render() {
        return this.renderBoard();
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) return;

        const currentPlayer = this.state.xIsNext ? 'X' : 'O';
        squares[i] = currentPlayer;

        let y;
        if (i <= 8) y = 3;
        if (i <= 5) y = 2;
        if (i <= 2) y = 1;

        this.setState({
            history: history.concat([{
                squares: squares,
                player: currentPlayer,
                move: {
                    x: i % 3 + 1,
                    y: y
                },
                activeSquare: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((val, i) => {
            const desc = i ? `Go to move #${i} ${val.player} [${val.move.x},${val.move.y}]` : 'Go to game start';
            return (
                <li key={i}>
                    <button onClick={() => this.jumpTo(i)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        xLength={this.props.boardXLength}
                        yLength={this.props.boardYLength}
                        activeSquare={current.activeSquare}
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game boardXLength={3} boardYLength={3} />, document.getElementById('root'));

/**@param {Array} squares Array(9) representing the board. Will store x, o or null*/
function calculateWinner(squares) {
    /**All the possible win positions: 3 lines horizontal, 3 lines vertical, 2 diagonals*/
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        //Check if, for any possible win positions, it is the same symbol (X or O)
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; //will return X or O as the winner
        }
    }

    return null;
}