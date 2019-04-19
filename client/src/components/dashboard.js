import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import Card from './wordCard';
import LanguageSelector from './languageSelector';
import { Link } from 'react-router-dom';
import {  getAvailableSubjects,  getUserSubjects } from '../actions/index'

export class Dashboard extends React.Component {


  componentDidMount() {
    this.props.dispatch(getAvailableSubjects())
    if (!this.props.userSubjects.length) {
      return this.props.dispatch(getUserSubjects())
    }
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  render() {

    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button type='button' onClick={() => this.logOut()}>Log out</button>
      );
    }
    let subjectSelector;
    if (this.props.currentSubject && this.props.availableSubjects) {
      subjectSelector = <LanguageSelector />
    }

    let information;
    if (this.props.error) {
      information = <div>
        <h3>{this.props.error.message}</h3>
      </div>
    }
    else{
      information = <h3>Streak : {this.props.streak}</h3>
  
    }
    return (
      <div className='dashboard'>
        <div className="dashboard-username-main">
          <h2 className='dashboard-welcome'>Welcome {this.props.currentUser.username}!</h2>
         {information}
        </div>
        <Card bgc='#fcd000' />
        {logOutButton}
        <Link to='/scores'>
          <button type='button'>View Scores</button>
        </Link>
        {subjectSelector}
      </div>

    );
  }

}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    error: state.main.error,
    loading: state.main.loading,
    streak: state.main.streak,
    currentUser: state.auth.currentUser,
    name: `${currentUser.fullname}`,
    loggedIn: state.auth.currentUser !== null,
    currentSubject: state.main.currentSubject,
    availableSubjects: state.main.availableSubjects,
    userSubjects: state.main.userSubjects
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
