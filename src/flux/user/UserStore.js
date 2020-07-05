import { userDispatcher } from './userDispatcher';
import { ActionType } from './userActions';


class UserStore {
    constructor() {
        //常用するユーザーの情報
        this.userStatus = {
            userId: Number(localStorage.getItem('userId')),
            name: localStorage.getItem('name'),
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

        //ユーザーの名前
        this.userStatus.name = setData.name;
        this.setLocalStorage('name', this.userStatus.name);

        //ユーザーアイコン
        this.userStatus.icon = setData.icon;
        this.setLocalStorage('icon', this.userStatus.icon);

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

            //userStatus.nowLoginに対するアクション
            case ActionType.CHANGE_LOGIN:
                this.setNowLogin(action.nowLogin);
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
