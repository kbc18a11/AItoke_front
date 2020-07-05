import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { actions } from '../../flux/user/userActions';
import userStore from '../../flux/user/UserStore';

export default class Wada extends Component {
    constructor(props) {
        super(props);

        console.log(userStore.userStatus);
        
        this.state = {
            param: userStore.userStatus.name,
            text: 'ã€€',
        }

        this.setParam = this.setParam.bind(this);
        this.setText = this.setText.bind(this);
        this.setText = this.setText.bind(this);
        this.clear = this.clear.bind(this);
    }

    setText(e) {
        this.setState({ text: e.target.value });
    }

    setParam() {
        actions.setName(this.state.text);

        this.setState({ param : userStore.userStatus.name});
    }

    clear() {
        userStore.clearLocalStorage();
    }

    login() {
        actions.changeLogin(true);
    }

    logout() {
        actions.changeLogin(false);
    }

    render() {
        
        return (
            <div>
                <h1>{this.state.param}</h1>
                <textarea onChange={this.setText} />
                <button onClick={this.setParam}>押す</button>
                <button onClick={this.clear}>clear</button>
                <button onClick={this.login}>ログイン</button>
                <button onClick={this.logout}>ログアウト</button>
            </div>
        )
    }
}
