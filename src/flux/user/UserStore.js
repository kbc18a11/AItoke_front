import { userDispatcher } from './userDispatcher';
import { ActionType } from './userActions';
import { EventEmitter } from 'events';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import axios from 'axios';

class UserStore extends EventEmitter {
    constructor() {
        super();

        //常用するユーザーの情報
        this.userStatus = {
            userId: Number(localStorage.getItem('userId')),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            icon: localStorage.getItem('icon'),
        };

        //現在ログイン中なのか？の判定
        this.nowLogin = Boolean(localStorage.getItem('nowLogin') && localStorage.getItem('nowLogin').toLocaleLowerCase() === 'true');
        //Jwt認証用のトークン
        this.token = localStorage.getItem('token');
    }

    /**
     * ユーザー後のステータス管理
     * @param {*} nowLogin 
     */
    registerAfterSetState(setData) {
        //ログインの状態
        this.nowLogin = setData.nowLogin;
        this.setLocalStorage('nowLogin', this.nowLogin);

        //認証トークン
        this.token = setData.token;
        this.setLocalStorage('token', this.token);

        //ユーザーid
        this.userStatus.userId = setData.userId;
        this.setLocalStorage('userId', this.userStatus.userId);

        this.userStatus.email = setData.email
        this.setLocalStorage('email', this.userStatus.email);

        //ユーザーの名前
        this.userStatus.name = setData.name;
        this.setLocalStorage('name', this.userStatus.name);

        //ユーザーアイコン
        this.userStatus.icon = setData.icon;
        this.setLocalStorage('icon', this.userStatus.icon);

        //ナビゲーションバーの状態を変更する
        this.emit('change');
    }

    /**
     * ログアウト
     */
    async logout() {
        //APIにログアウトをリクエスト
        try {
            //ヘッダーを設定
            axios.defaults.headers.common = {
                Authorization: `Bearer ${this.token}`
            };
            await axios.post(_APIURL + '/logout');
        } catch (error) {
            console.log(error.response);
        }

        //ログインの状態を変更
        this.nowLogin = false;
        //ローカルストレージを全てクリア
        this.clearLocalStorage();
        //ナビゲーションバーの状態を変更する
        this.emit('change');
    }

    /**
     * データをローカルストレージに保存
     * @param {string} key 
     * @param {any} value 
     */
    setLocalStorage(key, value) {
        //console.log(key, value);
        //keyにvalueを保存
        localStorage.setItem(key, value);
    }

    /**
     * ローカルストレージの内容をすべて削除する
     */
    clearLocalStorage() {
        localStorage.clear();
    }

    /**
     * userActionから呼び出される
     * @param {object} action {type,それぞれ応じたセットした値の名前}
     */
    handleActions(action) {
        console.log(action);

        //アクションタイプから分岐
        switch (action.type) {
            case ActionType.REGISTER:
                this.registerAfterSetState(action.setData);
                return;
            case ActionType.LOGOUT:
                this.logout();
                return;
            default:
                return;
        }
    }
}
const userStore = new UserStore();

userDispatcher.register(userStore.handleActions.bind(userStore));
window.userDispatcher = userDispatcher;

export default userStore;
