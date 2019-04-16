import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    if (!this.props.loggedIn) {
      return (<header role='banner' className="header-bar">
        <h1 className='title'>Friday Night Knowledge</h1>
      </header>
      );
    }
    if (this.props.currentSubject) {

      if (this.props.currentSubject.subject === 'german') {
        return (
          <header role='banner' className="header-bar">
            <h1 className='title'>German for Friday Night</h1>
          </header>
        );
      }

      if (this.props.currentSubject.subject === 'czech') {
        return (
          <header role='banner' className="header-bar">
            <h1 className='czech-title'>Czech for Friday Night</h1>
          </header>
        );
      }
    }
    else{
      return <h1>hi</h1>
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  currentSubject: state.main.currentSubject,
  loading: state.main.loading
});

export default connect(mapStateToProps)(HeaderBar);

