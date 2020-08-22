import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Textarea from '../fromItem/Textarea';
import userStore from '../../flux/user/UserStore';
import { actions } from '../../flux/user/userActions';
import NoLoginCommentFrom from './NoLoginCommentFrom.tsx';
import ValidationManager from '../../modules/class/ValidationManager';
import axios from 'axios';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

interface Props {
	aimodel_id: number;
	uploadCreatedComment: Method; //作成したコメントを親コンポーネントに送信
}

interface State {
	comment: string; //コメント本体
	nowLogin: boolean; //ユーザーのログイン状態
	rule: { [key: string]: string }; //バリエーションのルール
	ruleTypeErrorMessages: { [key: string]: string }; //バリエーションルールごとのエラーメッセージ
	errorMessages: string[]; //表示させるエラーメッセージ
}
export default class CreateCommentForm extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			comment: '',
			nowLogin: userStore.nowLogin,
			rule: {
				comment: 'max:255|required',
			},
			ruleTypeErrorMessages: {
				max: '255文字以下入力してください',
				required: 'コメントを入力してください',
			},
			errorMessages: [],
		};

		this.setComment = this.setComment.bind(this);
		this.doSubmit = this.doSubmit.bind(this);
	}

	cheackLogin() {}

	/**
	 * コメントのセッター
	 * @param {React.FormEvent<HTMLInputElement>} e
	 * @returns {void}
	 */
	setComment(e: React.FormEvent<HTMLInputElement>): void {
		this.setState({ comment: e.currentTarget.value });
	}

	/**
	 * バリエーションの実行やエラーメッセージの格納
	 * @returns {boolean}
	 */
	doValidation(): boolean {
		const validationManager = new ValidationManager();
		//バリエーションの検証を実行
		const resultMessages = validationManager.checkValidation(
			{ comment: this.state.comment },
			this.state.rule,
			this.state.ruleTypeErrorMessages
		);

		//エラーメッセージまたは空白文字のセット
		this.setState({ errorMessages: resultMessages.comment });

		//エラーメッセージは存在したか？
		return validationManager.isError;
	}

	async requestCreateComment(): Promise<boolean> {
		//リクエスト用のデータ
		const requestData: { [key: string]: string } = {
			comment: this.state.comment,
		};

		//ヘッダーを設定
		axios.defaults.headers.common = {
			Authorization: `Bearer ${userStore.token}`,
		};

		try {
			//通信開始
			const resultData = await (
				await axios.post(
					_APIURL + `/aimodel/${this.props.aimodel_id}/aimodelcomment`,
					requestData
				)
			).data;

			//作成したコメントを親コンポーネントにアップロード
			this.props.uploadCreatedComment(resultData.createdComment);
			return true;
		} catch (error) {
			console.log(error.response);

			//エラーステータスは401か？(未ログイン,トークンの期限切れ)
			if (error.response.status === 401) {
				//ログアウトを実行
				actions.logout();
				//未ログインに変更
				this.setState({ nowLogin: false });
			}
			return false;
		}
	}

	async doSubmit(): Promise<void> {
		//バリエーションエラーはあったか？
		if (this.doValidation()) {
			return;
		}
		//コメント作成のリクエストが成功したか？
		if (await this.requestCreateComment()) {
			return;
		}
	}

	render() {
		//ログインしてないか？
		if (!this.state.nowLogin) {
			//ログインしてないときのフォームの代わりを返す
			return <NoLoginCommentFrom />;
		}

		return (
			<Container>
				<Col md={{ span: 6 }}>
					<Form>
						<Textarea
							setValue={this.setComment}
							outPutErrotMeaagages={this.state.errorMessages}
							placeholder='コメントを入力'
						/>
						<Button variant='primary' onClick={this.doSubmit}>
							コメントをする
						</Button>
					</Form>
				</Col>
			</Container>
		);
	}
}
