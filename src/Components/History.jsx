import React, { Component } from 'react';
import refresh from '../css/refresh.svg';
import cn from 'classnames';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reset: false,
    };
  }

  handleKeyBoardHistoryClick = ({ keyCode: k }) => {
    if ([32, 13].some(n => n === k)) this.props.dropdownHandler();
  };
  handleResetAnimation = state => {
    if (this.state.reset !== state) {
      this.setState({ reset: state });
    }
  };
  handleResetClick = () => {
    this.props.jumpTo(0);
    this.handleResetAnimation(true);
  };
  render() {
    const { history, jumpTo, isOpened, dropdownHandler } = this.props;

    const moves = history.map((step, move) => {
      const desc = move ? `${move} move, coords: [${step.currentClick}]` : 'Start';
      return (
        <li key={move} className={isOpened ? 'show' : ''}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const rotateClass = cn({
      rotate: this.state.reset,
    });

    return (
      <div className="history">
        <div className="history-nav">
          <button className={'but side'} onClick={this.handleResetClick}>
            <img
              className={rotateClass}
              src={refresh}
              onTransitionEndCapture={() => this.handleResetAnimation(false)}
              alt="Reset"
            />
          </button>
          <button
            className="but main"
            onClick={history.length > 1 ? () => jumpTo(history.length - 2) : () => {}}
          >
            Undo last move
          </button>
          <div
            tabIndex={0}
            className="but side"
            onKeyDown={this.handleKeyBoardHistoryClick}
            onClick={dropdownHandler}
          >
            <div className={`arrow${isOpened ? ' down' : ''}`} />
          </div>
        </div>
        <ul style={{ visibility: isOpened ? 'visible' : 'hidden' }}>{moves}</ul>
      </div>
    );
  }
}
