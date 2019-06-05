import React, { useState } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import refresh from '../ui/refresh.svg';
import * as actions from '../actions';

const mapStateToProps = state => state;

const actionCreators = {
  jumpTo: actions.jumpTo,
  toggleHistoryMenu: actions.toggleHistoryMenu
};

const History = props => {
  const {
    history,
    jumpTo,
    historyOpened,
    stepNumber,
    toggleHistoryMenu
  } = props;
  const [resetAnimation, setResetAnimation] = useState(false);

  const handleKeyBoardHistoryClick = ({ keyCode: k }) => {
    if ([32, 13].some(n => n === k)) toggleHistoryMenu();
  };

  const handleResetClick = () => {
    jumpTo({ step: 0 });
    setResetAnimation(true);
  };

  const handleUndoClick = () => {
    if (stepNumber > 0) {
      jumpTo({ step: stepNumber - 1 });
    }
  };

  const moves = history.map((step, move) => {
    const desc = move ? `${move} move, coords: [${step.clickCoords}]` : 'Start';
    const buttonClass = cn({
      finished: move === stepNumber
    });
    return (
      <li key={move} className={cn({ show: historyOpened })}>
        <button className={buttonClass} onClick={() => jumpTo({ step: move })}>
          {desc}
        </button>
      </li>
    );
  });

  const arrowClass = cn({
    arrow: true,
    down: historyOpened
  });

  return (
    <section className="history">
      <div className="history-nav">
        <button className="but side" onClick={handleResetClick}>
          <img
            className={cn({ rotate: resetAnimation })}
            src={refresh}
            onTransitionEnd={() => setResetAnimation(false)}
            alt="R"
          />
        </button>
        <button className="but main" onClick={handleUndoClick}>
          Undo
        </button>
        <div
          tabIndex={0}
          className="but side"
          onKeyDown={handleKeyBoardHistoryClick}
          onClick={toggleHistoryMenu}
        >
          <div className={arrowClass} />
        </div>
      </div>
      <ul style={{ visibility: historyOpened ? 'visible' : 'hidden' }}>
        {moves}
      </ul>
    </section>
  );
};

export default connect(
  mapStateToProps,
  actionCreators
)(History);
