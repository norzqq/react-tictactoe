import React from 'react';
import cn from 'classnames';

const statusStrings = players => ({
  next: `Next player: ${players[0]}`,
  win: `Winner: ${players[1]}`,
  draw: 'Draw',
});

export default (props) => {
  const {
    isBlink, status, handleAnimationEnd, players,
  } = props;
  const statusString = statusStrings(players)[status];
  const classnames = cn({
    blink: isBlink,
    finished: status !== 'next',
  });
  return (
    <header>
      <h2 className={classnames} onAnimationEnd={handleAnimationEnd}>
        {statusString}
      </h2>
    </header>
  );
};
