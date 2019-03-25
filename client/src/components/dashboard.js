import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import Card from './wordCard';
import { Link } from 'react-router-dom';

export class Dashboard extends React.Component {
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
        return (
            <main role='main'>
                <div className="dashboard">
                    <div className="dashboard-username-main">
                        <h2 className='dashboard-welcome'>Welcome {this.props.username}!</h2>
                        <h3>Streak : {this.props.streak}</h3>
                    </div>
                    <Card bgc='#fcd000' />
                    {logOutButton}
                    <Link to='/scores'>
                        <button>View Scores</button>
                    </Link>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        streak: state.main.streak,
        username: state.auth.currentUser.username,
        name: `${currentUser.fullname}`,
        loggedIn: state.auth.currentUser !== null,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
