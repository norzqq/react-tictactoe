import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Game from './components/Game';
import reducer from './reducers';

const bodyClasses = document.body.classList;
window.addEventListener('mousedown', () => {
  bodyClasses.add('mouse-navigation');
  bodyClasses.remove('kbd-navigation');
});
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 9) {
    bodyClasses.add('kbd-navigation');
    bodyClasses.remove('mouse-navigation');
  }
});

const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root'),
);
