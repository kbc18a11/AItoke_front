import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import userStore from '../../flux/user/UserStore';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import { actions } from '../../flux/user/userActions';
import { Redirect } from 'react-router-dom';

interface Props {
	ai_model_id: number; //Aiモデルのid
	clickParentEvent: Function; //親のクリックイベント
}
interface State {
	redirectTo: string; //リダイレクト先の指定
}

export default class DeleteAimodelButton extends Component<Props, State> {
	state = {
		redirectTo: '',
	};

	constructor(props: Props) {
		super(props);

		this.requestDeleteAimodel = this.requestDeleteAimodel.bind(this);
	}

	async requestDeleteAimodel() {
		//ヘッダーを設定
		axios.defaults.headers.common = {
			Authorization: `Bearer ${userStore.token}`,
		};

		try {
			//通信開始
			await (await axios.delete(`${_APIURL}/aimodel/${this.props.ai_model_id}`))
				.data;

			//親に削除を知らせる
			this.props.clickParentEvent();
		} catch (error) {
			console.log(error.response);

			//エラーステータスは401か？(未ログイン,トークンの期限切れ)
			if (error.response.status === 401) {
				//ログアウト処理を実行
				actions.logout();
				this.setState({ redirectTo: '/login' });
				return false;
			}
		}
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={this.state.redirectTo} />;
		}

		return <Button onClick={this.requestDeleteAimodel}>削除</Button>;
	}
}
