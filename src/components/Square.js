import React, { useState } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

const mapStateToProps = state => ({
  currentHistory: state.history[state.stepNumber]
});

const actionCreators = {
  clickSquare: actions.clickSquare
};

const Square = props => {
  const [hover, setHover] = useState(false);
  const {
    index,
    currentHistory: { squares, squaresToHighlight, players, status },
    clickSquare
  } = props;

  const handleHover = i => () => {
    if (i >= 0 && status === 'next' && !squares[i]) {
      setHover(true);
    } else if (hover) {
      setHover(false);
    }
  };

  const handleClick = i => () => {
    setHover(false);
    clickSquare({ index: i });
  };

  const value = hover ? _.head(players) : squares[index];
  const isHighlight =
    squaresToHighlight && squaresToHighlight.some(s => s === index);
  const btnClass = cn({
    square: true,
    hover,
    highlight: isHighlight
  });

  return (
    <button
      className={btnClass}
      onClick={handleClick(index)}
      onMouseEnter={handleHover(index)}
      onMouseLeave={handleHover(-1)}
    >
      {value}
    </button>
  );
};

export default connect(
  mapStateToProps,
  actionCreators
)(Square);
