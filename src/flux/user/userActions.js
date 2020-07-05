import { userDispatcher } from './userDispatcher';
import userStore from './UserStore';

export const ActionType = {
    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN'
};

export const actions = {
    /**
     * ログアウト
     */
    logout: () => {
        userDispatcher.dispatch({ type: ActionType.CHANGE_LOGIN, nowlogin: true });
    },

    /**
     * @param {object} setData //ユーザー情報や認証トークンなど
     */
    register: (setData) => {
        userDispatcher.dispatch({ type: ActionType.REGISTER, setData: setData });
    },
};

