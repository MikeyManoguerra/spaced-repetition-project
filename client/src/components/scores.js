import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getScores } from '../actions/index'
export class ScorePage extends React.Component {

  componentDidMount() {
    this.props.dispatch(getScores())
  }

  render() {
    let list = this.props.scores.map((score) => {
      return <li className='score-item'>{score.germanWord} <span>{score.mValue}</span> </li>
    })

    return (
      <div className="dashboard">
        <div className="dashboard-username">
          <h2 className='dashboard-welcome'>
            Welcome {this.props.username}!
          </h2>
          <h3>Word Score</h3>
        </div>
        <ul className='score-list'>{list}</ul>
        <Link to='/dashboard'>
          <button>Back to dashboard</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    main: state.main,
    username: state.auth.currentUser.username,
    scores: state.main.scores
  };
};

export default connect(mapStateToProps)(ScorePage);