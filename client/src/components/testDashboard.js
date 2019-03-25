import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import Card from './wordCard';

export class TestDashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: hey Tyler
                    <p>hi from dashboard user!</p>
                </div>
                <div className="dashboard-name">Name: Tyler</div>
                <div className="dashboard-protected-data">
                    Protected data: you dont have any
                    <Card title="German Word #" bgc='#fcd000' content='Prost!'/>
                </div>
            </div>
        );
    }
}


