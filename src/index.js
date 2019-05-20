import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import Board from './Components/Board';
import History from './Components/History';
import Status from './Components/Status';

const getPlayers = (xIsNext, both = false) => {
  const sorted = xIsNext ? ['X', 'O'] : ['O', 'X'];
  return both ? sorted : sorted[0];
};

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

class Game extends React.Component {
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
      xIsNext: true,
      stepNumber: 0,
      hoveringSquare: { index: -1, value: null },
      shouldStatusBlink: true,
    };
  }

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    if (current.status !== 'next') {
      return;
    }
    const squares = [...current.squares];
    squares[i] = getPlayers(this.state.xIsNext);
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
      xIsNext: !this.state.xIsNext,
      shouldStatusBlink: true,
    });
  };

  handleHover = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    if (current.status !== 'next') {
      return;
    }
    this.setState({ hoveringSquare: { index: i, value: getPlayers(this.state.xIsNext) } });
  };

  handleAnimationEnd = () => {
    this.setState({ shouldStatusBlink: false });
  };

  jumpTo = step => {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  };

  render() {
    const { history, stepNumber, xIsNext, hoveringSquare, shouldStatusBlink } = this.state;
    const current = history[stepNumber];

    return (
      <div className="game">
        <Status
          isBlink={shouldStatusBlink}
          status={current.status}
          handleAnimationEnd={this.handleAnimationEnd}
          players={getPlayers(xIsNext, true)}
        />
        <Board
          squares={current.squares}
          squaresToHighlight={current.squaresToHighlight}
          onClick={this.handleClick}
          onHover={this.handleHover}
          hoveringSquare={hoveringSquare}
        />
        <History history={history} jumpTo={this.jumpTo} />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
