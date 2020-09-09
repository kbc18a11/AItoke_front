import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Aimodel from '../../objectInterface/Aimodel';
import { _S3URL } from '../../apiURL/s3';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import { RouteComponentProps } from 'react-router-dom';
import userStore from '../../flux/user/UserStore';
import { actions } from '../../flux/user/userActions';
import { Redirect } from 'react-router-dom';

interface Props extends RouteComponentProps<{ id: string }> {}
interface State {
	aimodelData?: Aimodel; //AIモデルのデータ
	redirectTo: string; //リダイレクト先の指定
}

export default class UpdateAimodel extends Component<Props, State> {
	state = {
		aimodelData: undefined,
		redirectTo: userStore.nowLogin ? '' : '/',
	};

	async getAimodelData() {
		const uri = `${_APIURL}/aimodel/${this.props.match.params.id}`;

		try {
			const aimodelData = await (await axios.get(uri)).data;

			//AIモデルのユーザーidとログインしているユーザーidは違うか？
			if (aimodelData.user_id !== userStore.userStatus.userId) {
				//リダイレクト先を自分の作ったAIモデルの一覧へ移動
				this.setState({ redirectTo: '/user/my/aimodel' });
				return;
			}

			this.setState({ aimodelData: aimodelData });
		} catch (error) {
			console.log(error.response);

			//情報の習得ができなかったか？
			if (!error.response.data.result) {
				//リダイレクト先を自分の作ったAIモデルの一覧へ移動
				this.setState({ redirectTo: '/user/my/aimodel' });
			}
		}
	}

	componentDidMount() {
		this.getAimodelData();
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={this.state.redirectTo} />;
		}

		return (
			<Container>
				<Col md={{ span: 6, offset: 3 }}>
					<h1>AIモデル編集</h1>
				</Col>
			</Container>
		);
	}
}
