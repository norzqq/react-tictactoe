import React, { Component } from 'react';
import refresh from '../ui/refresh.svg';
import cn from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

const mapStateToProps = state => state;

const actionCreators = {
  jumpTo: actions.jumpTo,
  toggleHistoryMenu: actions.toggleHistoryMenu,
};

class History extends Component {
  state = {
    playResetAnimation: false,
  };

  handleKeyBoardHistoryClick = ({ keyCode: k }) => {
    if ([32, 13].some(n => n === k)) this.props.toggleHistoryMenu();
  };

  handleResetAnimation = state => {
    if (this.state.playResetAnimation !== state) {
      this.setState({ playResetAnimation: state });
    }
  };

  handleResetClick = () => {
    this.props.jumpTo({ step: 0 });
    this.handleResetAnimation(true);
  };

  handleUndoClick = () => {
    const { jumpTo, stepNumber } = this.props;
    if (stepNumber > 0) {
      jumpTo({ step: stepNumber - 1 });
    }
  };
  render() {
    const { history, jumpTo, historyOpened, stepNumber, toggleHistoryMenu } = this.props;

    const moves = history.map((step, move) => {
      const desc = move ? `${move} move, coords: [${step.clickCoords}]` : 'Start';
      const buttonClass = cn({
        finished: move === stepNumber,
      });
      return (
        <li key={move} className={historyOpened ? 'show' : ''}>
          <button className={buttonClass} onClick={() => jumpTo({ step: move })}>
            {desc}
          </button>
        </li>
      );
    });

    const rotateClass = cn({
      rotate: this.state.playResetAnimation,
    });

    const arrowClass = cn({
      arrow: true,
      down: historyOpened,
    });

    return (
      <section className="history">
        <div className="history-nav">
          <button className="but side" onClick={this.handleResetClick}>
            <img
              className={rotateClass}
              src={refresh}
              onTransitionEnd={() => this.handleResetAnimation(false)}
              alt="R"
            />
          </button>
          <button className="but main" onClick={this.handleUndoClick}>
            Undo
          </button>
          <div
            tabIndex={0}
            className="but side"
            onKeyDown={this.handleKeyBoardHistoryClick}
            onClick={toggleHistoryMenu}
          >
            <div className={arrowClass} />
          </div>
        </div>
        <ul style={{ visibility: historyOpened ? 'visible' : 'hidden' }}>{moves}</ul>
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(History);
