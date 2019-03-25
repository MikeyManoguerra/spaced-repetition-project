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
                <p className='description'>German for friday night will teach you *just* enough German to get your drink on
                    through the power of spaced repetition.
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
