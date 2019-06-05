import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import Square from './Square';

const mapStateToProps = state => ({
  scaled: state.historyOpened
});

const Board = props => {
  const renderSquare = index => <Square index={index} key={index} />;

  const renderRow = row => {
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
    scaled: props.scaled
  });

  return (
    <section className={boardClasses}>
      {Array(3)
        .fill(null)
        .map((x, index) => renderRow(index))}
    </section>
  );
};

export default connect(mapStateToProps)(Board);
