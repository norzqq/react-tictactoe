import React from 'react';
import cn from 'classnames';

// import Square from './Square';

const Square = (props) => {
  const {
    onClick, value, onHoverEnter, onHoverExit, isHover, highlight,
  } = props;
  const btnClass = cn({
    square: true,
    hover: isHover,
    highlight,
  });
  return (
    <button
      className={btnClass}
      onClick={onClick}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverExit}
    >
      {value}
    </button>
  );
};

export default (props) => {
  const renderSquare = (index) => {
    const {
      squares, squaresToHighlight, onClick, onHover, hoveringSquare,
    } = props;
    const isHover = hoveringSquare.index === index && !squares[index];
    const value = isHover ? hoveringSquare.value : squares[index];
    return (
      <Square
        highlight={squaresToHighlight && squaresToHighlight.some(s => s === index)}
        value={value}
        onClick={() => onClick(index)}
        onHoverEnter={() => onHover(index)}
        onHoverExit={() => onHover(-1)}
        isHover={isHover}
        key={index}
      />
    );
  };

  const renderRow = (row) => {
    const squares = Array(3)
      .fill(null)
      .map((x, index) => renderSquare(row * 3 + index));
    return (
      <div className="board-row" key={row}>
        {squares}
      </div>
    );
  };

  const boardClasses = cn({
    'game-board': true,
    scaled: props.scaled,
  });

  return (
    <section className={boardClasses}>
      {Array(3)
        .fill(null)
        .map((x, index) => renderRow(index))}
    </section>
  );
};
