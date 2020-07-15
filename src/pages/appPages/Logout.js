import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { actions } from '../../flux/user/userActions';

export default class Logout extends Component {
    constructor(props) {
        super(props);

        console.log('logout');
        //userStoreの状態を空にする
        actions.logout();

        //リダイレクト先が指定されているか？
        //指定されてなければ、"/"にリダイレクトを設定する
        const to = this.props.to ? this.props.to : '/'
        this.state = {
            //リダイレクト先
            to: to
        }
    }

    render() {
        return (
            <Redirect to={this.state.to} />
        );
    }
}
