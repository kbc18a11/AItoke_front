import React, { Component } from 'react'
import DefaultNavigationbar from '../../../components/navber/DefaultNavigationbar';
import NowLoginNavigationbar from '../../../components/navber/NowLoginNavigationbar';
import userStore from '../UserStore';

export default class NavberState extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nowLogin: userStore.nowLogin
        }
    }


    /**
     * ログインの状態によって、ナビゲーションバーを変更
     * @returns {JSX} ログインの状態の状態に応じたコンポーネントを返す
     */
    isNowLogin() {
        //ログインしているか？
        if (this.state.nowLogin) {
            return (<NowLoginNavigationbar />);
        }

        return (<DefaultNavigationbar />);
    }

    componentWillMount() {
        console.log(userStore.nowLogin);

        //registerAfterSetStateが実行されたら、this.nowLoginをuserStore.nowLoginの変更に応じたものにする
        userStore.on('change', () => {
            this.setState({ nowLogin: userStore.nowLogin });
        });
    }

    render() {
        return (this.isNowLogin(userStore.nowLogin));
    }
}
