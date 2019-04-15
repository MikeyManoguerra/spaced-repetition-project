import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import Card from './wordCard';
import LanguageSelector from './languageSelector';
import { Link } from 'react-router-dom';
import { getQuestion, getAvailableSubjects, setCurrentSubject, updateUserSubjects } from '../actions/index'

export class Dashboard extends React.Component {


  componentDidMount() {
    // TODO, request most recently modified list instead of first in subjects array.
    // current subject set in auth action success
    this.props.dispatch(getAvailableSubjects())
    return this.props.dispatch(updateUserSubjects())
      .then(() =>{
        this.props.dispatch(setCurrentSubject(this.props.userSubjects[0]))
        return this.props.dispatch(getQuestion(this.props.currentSubject.id))
       })
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  render() {

    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button onClick={() => this.logOut()}>Log out</button>
      );
    }
    if (!this.props.currentSubject) {
      return <p> loading...</p>
    }
    else {
      return (
        <main role='main'>
          <div className='dashboard'>
            <div className="dashboard-username-main">
              <h2 className='dashboard-welcome'>Welcome {this.props.currentUser.username}!</h2>
              <h3>Streak : {this.props.streak}</h3>
            </div>
            <Card bgc='#fcd000' />
            {logOutButton}
            <Link to='/scores'>
              <button>View Scores</button>
            </Link>
            <LanguageSelector />
          </div>
        </main>
      );
    }
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    streak: state.main.streak,
    currentUser: state.auth.currentUser,
    name: `${currentUser.fullname}`,
    loggedIn: state.auth.currentUser !== null,
    currentSubject: state.main.currentSubject,
    userSubjects: state.main.userSubjects
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
