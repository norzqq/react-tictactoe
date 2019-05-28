import { createAction } from 'redux-actions';

export const clickSquare = createAction('SQUARE_CLICK');
export const jumpTo = createAction('HISTORY_JUMP');
export const toggleHistoryMenu = createAction('HISTORY_MENU_TOGGLE');
