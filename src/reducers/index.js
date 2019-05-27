import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

const getPlayers = (isPlayerOneMove, both = false) => {
  const values = ['X', 'O'];
  const sorted = isPlayerOneMove ? values : _.reverse(values);
  return both ? sorted : _.head(sorted);
};
const gamestate = handleActions(
  {
    [actions.hoverSquare](
      state,
      {
        payload: { index },
      },
    ) {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = _.last(history);
      if (current.status !== 'next') {
        return;
      }
      return {
        ...state,
        hoveringSquare: { index, value: getPlayers(state.isPlayerOneMove) },
      };
    },
  },
  {
    history: [
      {
        squares: Array(9).fill(null),
        currentClick: [null, null],
        status: 'next',
        squaresToHighlight: null,
      },
    ],
    isPlayerOneMove: true,
    stepNumber: 0,
    hoveringSquare: { index: -1, value: null },
    shouldStatusBlink: true,
    historyOpened: false,
  },
);

export default combineReducers({
  gamestate,
});
