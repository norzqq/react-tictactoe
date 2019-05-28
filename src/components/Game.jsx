import React from 'react';
import Board from './Board';
import History from './History';
import Status from './Status';
import '../ui/normalize.css';
import '../ui/styles.css';

export default () => (
  <div className="container">
    <header>
      <h1>Tic Tac Toe</h1>
    </header>
    <main className="game">
      <Status />
      <Board />
      <History />
    </main>
    <footer>
      <p>Created by: norzqq</p>
      <ul>
        <li>
          <a href="mailto:someone@example.com" rel="contact">
            <i className="fas fa-envelope" />
          </a>
        </li>
        <li>
          <a href="https://github.com/norzqq/react-tic-tac-toe" rel="author">
            <i className="fab fa-github" />
          </a>
        </li>
      </ul>
    </footer>
  </div>
);
