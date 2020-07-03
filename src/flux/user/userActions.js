import { userDispatcher } from './userDispatcher';

export const ActionType = {
    //user_id
    SET_USERID: 'SET_USERID',
    //user_name
    SET_NAME: 'SET_NAME',
    //user_icon
    SET_ICON: 'SET_ICON',
    //jwt_token
    SET_JWTTOKEN: 'SET_JWTTOKEN',
    //ログインの判定
    CHANGE_LOGIN: 'CHANGE_LOGIN'
};

export const actions = {
    /**
     * @param {number}ユーザーid
     */
    setUserId: (userId) => {
        if (!userId) return;
        userDispatcher.dispatch({ type: ActionType.SET_NAME, value: userId });
    },
    /**
     * @param {string} ユーザーネーム
     */
    setName: (name) => {
        if (!name) return;
        userDispatcher.dispatch({ type: ActionType.SET_NAME, name: name });
    },

    /**
     * @param {string} icon 
     */
    setIcon(icon) {
        if (icon) return;
        userDispatcher.dispatch({ type: ActionType.SET_NAME, icon: icon });
    },

    /**
     * @param {string} token 
     */
    setJwtToken(token) {
        if (token) return;
        userDispatcher.dispatch({ type: ActionType.SET_NAME, token: token });
    },

    changeLogin(nowlogin) {
        userDispatcher.dispatch({ type: ActionType.SET_NAME, nowlogin: nowlogin });
    }
};