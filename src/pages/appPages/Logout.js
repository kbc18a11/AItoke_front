import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { actions } from '../../flux/user/userActions';

export default class Logout extends Component {
    constructor(props) {
        super(props);

        console.log('logout');
        //userStoreの状態を空にする
        actions.logout();
    }
    
    render() {
        return (
            <Redirect to="/" />
        );
    }
}
