import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './login-form';


export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div>
            <div className="home">
                <p className='description'>Friday night knowledge will teach 
             teach you good words to know in multiple languages when you are at the bar.
            </p>
                <LoginForm />
                <Link to="/register">Register</Link>
            </div>

            {/* <div><TestDashboard /></div> */}
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
