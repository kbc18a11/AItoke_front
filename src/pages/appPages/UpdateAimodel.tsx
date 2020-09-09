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
import InputText from '../../components/fromItem/InputText';
import InputImage from '../../components/fromItem/InputImage';
import Textarea from '../../components/fromItem/Textarea';

interface Props extends RouteComponentProps<{ id: string }> {}
interface State {
	aimodelData?: Aimodel; //AIモデルのデータ
	redirectTo: string; //リダイレクト先の指定
	errorMessages: { [key: string]: string }; //バリエーションのエラーメッセージ;
}

export default class UpdateAimodel extends Component<Props, State> {
	state = {
		aimodelData: {
			id: 0,
			user_id: 0,
			name: '',
			self_introduction: '',
			open_mouth_image: '',
			close_mouth_image: '',
			created_at: '',
			updated_at: '',
		},
		redirectTo: userStore.nowLogin ? '' : '/',
		errorMessages: {
			name: '',
			self_introduction: '',
			open_mouth_image: '',
			close_mouth_image: '',
		},
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
					<Form>
						<InputText
							className='name'
							label='キャラクターネーム'
							type='text'
							placeholder='名前を入力'
							outPutErrotMeaagages={this.state.errorMessages.name}
							//setValue={this.setName}
							value={this.state.aimodelData.name}
						/>
						<Textarea
							className='self_introduction'
							label='自己紹介文'
							type='text'
							placeholder='自己紹介を入力'
							outPutErrotMeaagages={this.state.errorMessages.self_introduction}
							//setValue={this.setSelf_introduction}
							value={this.state.aimodelData.self_introduction}
						/>
						<InputImage
							className='open_mouth_image'
							label='口を開けた画像'
							outPutErrotMeaagages={this.state.errorMessages.open_mouth_image}
							image={_S3URL + this.state.aimodelData.open_mouth_image}
							//setValue={this.aimodelData.setopen_mouth_image}
						/>
						<InputImage
							className='close_mouth_image'
							label='口を閉じた画像'
							outPutErrotMeaagages={this.state.errorMessages.close_mouth_image}
							image={_S3URL + this.state.aimodelData.close_mouth_image}
							//setValue={this.aimodelData.setClose_mouth_image}
						/>
						<Button variant='primary'>登録</Button>
					</Form>
				</Col>
			</Container>
		);
	}
}
