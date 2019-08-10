import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    /**
     * on a React.component constructor, first line must always be: super(props);
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    /**
     * calling setState will cause the component and its childs to re-render in order to show the new state
     */
    render() {
        return (
            <button className="square" onClick={() => this.setState({ value: 'x' })} >
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    /**
     * Passing props to the Square instantiation
     * @param {*} i 
     */
    renderSquare(i) {
        return <Square value={i} />;
    }

    render() {
        const status = 'Next player: X';

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
