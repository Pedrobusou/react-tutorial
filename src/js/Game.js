import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
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

    /**@param {Array} squares Array(9) representing the board. Will store x, o or null*/
 calculateWinner(squares) {
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

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) return;

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
        const winner = this.calculateWinner(current.squares);
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