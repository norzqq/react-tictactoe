import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

const mapStateToProps = state => ({
  currentHistory: state.history[state.stepNumber],
  // players: state.players,
});

const actionCreators = {
  clickSquare: actions.clickSquare,
};

class Square extends React.Component {
  state = {
    isHover: false,
  };

  handleHover = index => e => {
    const {
      currentHistory: { squares, status },
    } = this.props;
    if (index >= 0 && status === 'next' && !squares[index]) {
      this.setState({ isHover: true });
    } else if (this.state.isHover) {
      this.setState({ isHover: false });
    }
  };

  handleClick = index => e => {
    this.setState({ isHover: false });
    this.props.clickSquare({ index });
  };

  render() {
    const {
      index,
      currentHistory: { squares, squaresToHighlight, players },
    } = this.props;
    const value = this.state.isHover ? _.head(players) : squares[index];
    const isHighlight = squaresToHighlight && squaresToHighlight.some(s => s === index);
    const btnClass = cn({
      square: true,
      hover: this.state.isHover,
      highlight: isHighlight,
    });

    return (
      <button
        className={btnClass}
        onClick={this.handleClick(index)}
        onMouseEnter={this.handleHover(index)}
        onMouseLeave={this.handleHover(-1)}
      >
        {value}
      </button>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Square);
