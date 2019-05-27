import React from 'react';
import Board from './Board';
import History from './History';
import Status from './Status';
import '../View/normalize.css';
import '../View/styles.css';
import _ from 'lodash';

const getPlayers = (isPlayerOneMove, both = false) => {
  const values = ['X', 'O'];
  const sorted = isPlayerOneMove ? values : _.reverse(values);
  return both ? sorted : _.head(sorted);
};

const calculateWinner = squares => {
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
  const result = lines.find(line =>
    line
      .map(index => squares[index])
      .every((value, i, arr) => value !== null && value === _.head(arr)),
  );
  return result;
};

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };
  }

  // Handle buttons focus styles depending on input source
  componentDidMount() {
    const bodyClasses = document.body.classList;
    window.addEventListener('mousedown', e => {
      bodyClasses.add('mouse-navigation');
      bodyClasses.remove('kbd-navigation');
    });
    window.addEventListener('keydown', e => {
      if (e.keyCode === 9) {
        bodyClasses.add('kbd-navigation');
        bodyClasses.remove('mouse-navigation');
      }
    });
  }

  handleHistoryMenu = (state = !this.state.historyOpened) => e => {
    this.setState({ historyOpened: state });
  };

  // Square click
  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = _.last(history);
    const squares = [...current.squares];
    if (current.status !== 'next' || squares[i]) {
      return;
    }
    squares[i] = getPlayers(this.state.isPlayerOneMove);
    const currentClick = [Math.floor(i / 3) + 1, (i % 3) + 1];
    const squaresToHighlight = calculateWinner(squares);
    let status;
    if (squaresToHighlight) {
      status = 'win';
    } else if (!squares.some(s => s === null)) {
      status = 'draw';
    } else {
      status = 'next';
    }
    this.setState({
      history: history.concat([
        {
          squares,
          squaresToHighlight,
          currentClick,
          status,
        },
      ]),
      hoveringSquare: { index: -1, value: null },
      stepNumber: history.length,
      isPlayerOneMove: !this.state.isPlayerOneMove,
      shouldStatusBlink: true,
    });
  };
  handleHover = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = _.last(history);
    if (current.status !== 'next') {
      return;
    }
    this.setState({
      hoveringSquare: { index: i, value: getPlayers(this.state.isPlayerOneMove) },
    });
  };

  handleAnimationEnd = () => {
    this.setState({ shouldStatusBlink: false });
  };

  jumpTo = step => {
    this.setState({ stepNumber: step, isPlayerOneMove: step % 2 === 0 });
  };

  render() {
    const { history, stepNumber, isPlayerOneMove, hoveringSquare, shouldStatusBlink } = this.state;
    const current = history[stepNumber];

    return (
      <div className="container">
        <header>
          <h1>Tic Tac Toe</h1>
        </header>
        <main className="game">
          <Status
            isBlink={shouldStatusBlink}
            status={current.status}
            handleAnimationEnd={this.handleAnimationEnd}
            players={getPlayers(isPlayerOneMove, true)}
          />
          <Board
            squares={current.squares}
            squaresToHighlight={current.squaresToHighlight}
            onClick={this.handleClick}
            onHover={this.handleHover}
            hoveringSquare={hoveringSquare}
            scaled={this.state.historyOpened}
          />
          <History
            history={history}
            jumpTo={this.jumpTo}
            isOpened={this.state.historyOpened}
            dropdownHandler={this.handleHistoryMenu}
          />
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
  }
}
