import React, { Component } from 'react';
import cn from 'classnames';

const statusStrings = players => ({
  next: `Next player: ${players[0]}`,
  win: `Winner: ${players[1]}`,
  draw: 'Draw',
});

export default class Status extends Component {
  render() {
    const {
      isBlink, status, handleAnimationEnd, players,
    } = this.props;
    const statusString = statusStrings(players)[status];
    const classnames = cn({
      blink: isBlink,
      finished: status !== 'next',
    });
    return (
      <div className="game-info">
        <div className={classnames} onAnimationEnd={handleAnimationEnd}>
          {statusString}
        </div>
      </div>
    );
  }
}
