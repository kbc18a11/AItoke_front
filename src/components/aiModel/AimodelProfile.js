import React, { Component } from 'react'
import { Jumbotron, Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import { _S3URL } from '../../apiURL/s3';
import '../../css/inputImage.css';
import AimodelGoodButton from '../goodButton/AimodelGoodButton';

export default class AimodelProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: '',
            close_mouth_image: '',
            self_introduction: ''
        }
    }

    async setAimodelData() {
        //ユーザー情報を取得
        const aimodelData = await (await axios(_APIURL + `/aimodel/${this.state.id}`)).data;

        //Aiモデルの名前をセット
        this.setState({ name: aimodelData.name });
        //アイコンのURLをセット
        this.setState({ close_mouth_image: aimodelData.close_mouth_image });
        //自己紹介文は存在するか？
        if (aimodelData.self_introduction) {
            //自己紹介文をセット
            this.setState({ self_introduction: aimodelData.self_introduction });
        }
    }

    componentDidMount() {
        this.setAimodelData();
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Media>
                        <img
                            width={64} height={64}
                            className="imageFile"
                            src={_S3URL + this.state.close_mouth_image}
                            alt="Generic placeholder" />
                        <Media.Body className="text-left">
                            <h3>{this.state.name}</h3>
                            <p style={{ whiteSpace: 'pre-line' }}>{this.state.self_introduction}</p>
                            <AimodelGoodButton />{' '}
                            <Link to={`/aimode/${this.state.id}/taking`}><Button>会話してみる</Button></Link>
                        </Media.Body>
                    </Media>
                </Jumbotron>
            </div>
        )
    }
}
