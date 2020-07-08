import { userDispatcher } from './userDispatcher';

export const ActionType = {
    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN',
    LOGOUT:'LOGOUT'
};

export const actions = {
    /**
     * ログアウト
     */
    logout: () => {
        userDispatcher.dispatch({ type: ActionType.LOGOUT});
    },

    /**
     * @param {object} setData //ユーザー情報や認証トークンなど
     */
    register: (setData) => {
        userDispatcher.dispatch({ type: ActionType.REGISTER, setData: setData });
    },
};

