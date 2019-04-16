import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';

export class RegistrationPage extends React.Component {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div className="home">
                <h2>Get started today</h2>
                <RegistrationForm />
                <Link to="/">Login</Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    availableSubjects: state.main.availableSubjects,
});

export default connect(mapStateToProps)(RegistrationPage);
