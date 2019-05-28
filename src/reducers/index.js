// import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

// Utility function: Get symbol value to fill a square
const getNewPlayersOrder = (players) => {
  const [first, ...rest] = players;
  return [...rest, first];
};

// Utility function: Hardcoded lines to compare values inside
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Its functional programming baby
  const result = lines.find(line => line
    .map(index => squares[index])
    .every((value, i, arr) => value !== null && value === _.head(arr)));
  return result;
};

const initState = {
  history: [
    // Initial history step
    {
      squares: Array(9).fill(null),
      clickCoords: [null, null],
      status: 'next',
      squaresToHighlight: null,
      players: ['X', 'O'],
    },
  ],
  stepNumber: 0,
  historyOpened: false,
};

const gamestate = handleActions(
  {
    // Square is clicked
    [actions.clickSquare](
      state,
      {
        payload: { index },
      },
    ) {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = _.last(history);
      const squares = [...current.squares];
      // If game ended or square already filled -> do nothing
      if (current.status !== 'next' || squares[index]) {
        return state;
      }
      squares[index] = _.head(current.players);
      const clickCoords = [Math.floor(index / 3) + 1, (index % 3) + 1];
      const squaresToHighlight = calculateWinner(squares);
      // Get new game status
      let status;
      if (squaresToHighlight) {
        status = 'win';
      } else if (!squares.some(s => s === null)) {
        status = 'draw';
      } else {
        status = 'next';
      }
      const players = getNewPlayersOrder(current.players);
      return {
        ...state,
        history: history.concat([
          {
            squares,
            squaresToHighlight,
            clickCoords,
            status,
            players,
          },
        ]),
        stepNumber: history.length,
      };
    },
    // Alter current history step
    [actions.jumpTo](
      state,
      {
        payload: { step },
      },
    ) {
      return {
        ...state,
        stepNumber: step,
      };
    },
    [actions.toggleHistoryMenu](state) {
      return {
        ...state,
        historyOpened: !state.historyOpened,
      };
    },
  },
  initState,
);

export default gamestate;
