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
      let subject = this.props.currentSubject.subject.charAt(0).toUpperCase() + this.props.currentSubject.subject.slice(1)
        return (
          <header role='banner' className="header-bar">
            <h1 className='title'>{subject} for Friday Night</h1>
          </header>
        );
      }
    else {
      return <h1 className='title'>Loading</h1>
    }

  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  currentSubject: state.main.currentSubject,
  loading: state.main.loading
});

export default connect(mapStateToProps)(HeaderBar);

