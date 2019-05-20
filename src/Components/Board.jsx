import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i) {
    const {
      squares, squaresToHighlight, onClick, onHover, hoveringSquare,
    } = this.props;
    const isHover = hoveringSquare.index === i && !squares[i];
    const value = isHover ? hoveringSquare.value : squares[i];
    return (
      <Square
        highlight={squaresToHighlight && squaresToHighlight.some(s => s === i)}
        value={value}
        onClick={() => onClick(i)}
        onHoverEnter={() => onHover(i)}
        onHoverExit={() => onHover(-1)}
        isHover={isHover}
        key={i}
      />
    );
  }

  renderRow(r) {
    const squares = Array(3)
      .fill(null)
      .map((x, c) => this.renderSquare(r * 3 + c));
    return (
      <div className="board-row" key={r}>
        {squares}
      </div>
    );
  }

  render() {
    return (
      <div className="game-board">
        {Array(3)
          .fill(null)
          .map((x, i) => this.renderRow(i))}
      </div>
    );
  }
}
