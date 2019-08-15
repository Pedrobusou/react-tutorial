import React from 'react';
import Square from './square';

export default class Board extends React.Component {
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