import { userDispatcher } from './userDispatcher';
import { ActionType } from './userActions';
import { EventEmitter } from "events";


class UserStore extends EventEmitter {
    constructor() {
        super();

        //常用するユーザーの情報
        this.userStatus = {
            userID: Number(localStorage.getItem('userId')),
            name: localStorage.getItem('name'),
            icon: localStorage.getItem('icon'),
        }

        //現在ログイン中なのか？の判定
        this.nowLogin = Boolean(localStorage.getItem('nowLogin').toLocaleLowerCase() === 'true');
        //Jwt認証用のトークン
        this.token = localStorage.getItem('token');
    }

    /**
     * データをローカルストレージに保存
     * @param {string} key 
     * @param {any} value 
     */
    setLocalStorage(key, value) {
        console.log(key, value);

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

        //アクションタイプから分岐
        switch (action.type) {
            case ActionType.SET_USERID:
                this.userStatus.userID = action.userID;
                this.setLocalStorage('userId', action.userID);
                break;

            //userStatus.nameに対するアクション
            case ActionType.SET_NAME:
                this.userStatus.name = action.name;
                this.setLocalStorage('name', action.name);
                break;

            //userStatus.iconに対するアクション
            case ActionType.SET_ICON:
                this.userStatus.icon = action.icon;
                this.setLocalStorage('icon', action.icon);
                break;

            //userStatus.tokenに対するアクション
            case ActionType.SET_JWTTOKEN:
                this.token = action.token;
                this.setLocalStorage('icon', action.token);
                break;

            //userStatus.nowLoginに対するアクション
            case ActionType.CHANGE_LOGIN:
                this.nowLogin = action.nowLogin;
                this.setLocalStorage('nowLogin', action.nowlogin);
                break;
            default:
                return;
        }
    }
}
const userStore = new UserStore();

userDispatcher.register(userStore.handleActions.bind(userStore));
window.userDispatcher = userDispatcher;
export default userStore;