import React, { Component } from 'react'
import DefaultNavigationbar from '../../../components/navber/DefaultNavigationbar';
import NowLoginNavigationbar from '../../../components/navber/NowLoginNavigationbar';
import userStore from '../UserStore';

export default class NavberState extends Component {

    /**
     * ログインの状態によって、ナビゲーションバーを変更
     * @param {boolean} nowLogin ログインの状態
     */
    isNowLogin(nowLogin) {
        console.log(typeof(nowLogin));
        
        console.log(nowLogin);
        //ログインしているか？
        if (nowLogin) {
            return (<NowLoginNavigationbar />);
        }

        return (<DefaultNavigationbar />);
    }

    render() {
        return (this.isNowLogin(userStore.nowLogin));
    }
}
