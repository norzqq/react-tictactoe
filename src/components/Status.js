import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { status, players } = state.history[state.stepNumber];
  return { status, players };
};

const statusStrings = players => ({
  next: `Next player: ${players[0]}`,
  win: `Winner: ${players[1]}`,
  draw: 'Draw'
});

const Status = props => {
  const { status, players } = props;
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    setBlink(true);
  }, [players]);

  const statusString = statusStrings(players)[status];
  const classnames = cn({
    blink,
    finished: status !== 'next'
  });
  return (
    <header>
      <h2 className={classnames} onAnimationEnd={() => setBlink(false)}>
        {statusString}
      </h2>
    </header>
  );
};
export default connect(mapStateToProps)(Status);
