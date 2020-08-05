import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Image, Jumbotron, Media } from 'react-bootstrap';
import axios from 'axios';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import { _S3URL } from '../../apiURL/s3';
import '../../css/inputImage.css';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.user_id,
            user_name: '',
            user_icon: null
        }
    }

    /**
     * ユーザー情報をセット
     */
    async setUserInfo() {
        //ユーザー情報を取得
        const userData = await (await axios(_APIURL + `/user/${this.state.user_id}`)).data;

        //ユーザーの名前をセット
        this.setState({ user_name: userData.name });
        //ユーザーアイコンのURLをセット
        this.setState({ user_icon: userData.icon });

    }

    componentDidMount() {
        //ユーザー情報を取得
        this.setUserInfo();
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Media>
                        <img
                            width={64} height={64}
                            className="imageFile"
                            src={_S3URL + this.state.user_icon}
                            alt="Generic placeholder" />
                        <Media.Body className="text-left">
                            <h3>{this.state.user_name}さんのAIモデル一覧</h3>
                        </Media.Body>
                    </Media>
                </Jumbotron>
            </div>
        )
    }
}
