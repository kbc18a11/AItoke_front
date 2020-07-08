import React, { Component } from 'react'
import { NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { actions } from '../../flux/user/userActions';
import history from 'history/createBrowserHistory';

export default class UserNavMenu extends Component {
    /**
     * ログアウト
     */
    doLogout() {
        console.log('logout');
        actions.logout();
        //"/"へ遷移
        history().push('/');
    }

    render() {

        return (
            <NavDropdown title="" id="basic-nav-dropdown" >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.doLogout}>ログアウト</NavDropdown.Item>
            </NavDropdown>
        )
    }
}
