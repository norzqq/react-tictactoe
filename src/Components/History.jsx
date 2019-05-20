import React, { Component } from 'react';
import cn from 'classnames';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpened: false,
    };
  }
  handleMenu = () => {
    this.setState({
      menuOpened: !this.state.menuOpened,
    });
  };

  render() {
    const { history, jumpTo } = this.props;
    const moves = history.map((step, move) => {
      const desc = move ? `${move} move, coords: [${step.currentClick}]` : 'Start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <div className="history">
        <div className="history-nav">
          <button className="but side" onClick={() => jumpTo(0)}>
            R
          </button>
          <button
            className="but main"
            onClick={history.length > 1 && (() => jumpTo(history.length - 2))}
          >
            Undo last move
          </button>
          <button className="but side" onClick={this.handleMenu}>
            {this.state.menuOpened ? '∨' : '∧'}
          </button>
        </div>
        <ul style={{ visibility: this.state.menuOpened ? 'visible' : 'hidden' }}>{moves}</ul>
      </div>
    );
  }
}
