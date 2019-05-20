import React from 'react';
import cn from 'classnames';

export default class Square extends React.Component {
  render() {
    const {
      onClick, value, onHoverEnter, onHoverExit, isHover, highlight,
    } = this.props;
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
  }
}
