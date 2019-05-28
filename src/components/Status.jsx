import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';

const mapStateToProps = state => {
  // players: state.players,
  const { status, players } = state.history[state.stepNumber];
  return { status, players };
};

const statusStrings = players => ({
  next: `Next player: ${players[0]}`,
  win: `Winner: ${players[1]}`,
  draw: 'Draw',
});

class Status extends React.Component {
  state = {
    isBlink: true,
  };

  toggleBlink = condition => {
    if (this.state.isBlink !== condition) {
      this.setState({ isBlink: condition });
    }
  };

  componentWillUpdate() {
    this.toggleBlink(true);
  }

  render() {
    const { status, players } = this.props;
    const statusString = statusStrings(players)[status];
    const classnames = cn({
      blink: this.state.isBlink,
      finished: status !== 'next',
    });
    return (
      <header>
        <h2 className={classnames} onAnimationEnd={() => this.toggleBlink(false)}>
          {statusString}
        </h2>
      </header>
    );
  }
}
export default connect(mapStateToProps)(Status);
