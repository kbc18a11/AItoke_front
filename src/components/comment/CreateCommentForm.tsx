import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Textarea from '../fromItem/Textarea';
import userStore from '../../flux/user/UserStore';
import NoLoginCommentFrom from './NoLoginCommentFrom.tsx';
import ValidationManager from '../../modules/class/ValidationManager';

interface Props {
	id: number;
}

interface State {
	comment: string; //コメント本体
	nowLogin: boolean; //ユーザーのログイン状態
	rule: { [key: string]: string }; //バリエーションのルール
	ruleTypeErrorMessages: { [key: string]: string }; //バリエーションルールごとのエラーメッセージ
	errorMessage: string; //表示させるエラーメッセージ
}
export default class CreateCommentForm extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			comment: '',
			nowLogin: userStore.nowLogin,
			rule: {
				comment: 'max:255',
			},
			ruleTypeErrorMessages: {
				max: '255文字以下入力してください',
			},
			errorMessage: '',
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

	doValidation(): boolean {
		const validationManager = new ValidationManager();
		//バリエーションの検証を実行
		const resultMessages = validationManager.checkValidation(
			{ comment: this.state.comment },
			this.state.rule,
			this.state.ruleTypeErrorMessages
		);

		//エラーメッセージまたは空白文字のセット
		this.setState({ errorMessage: resultMessages.comment });

		//エラーメッセージは存在したか？
		return validationManager.isError;
	}

	doSubmit() {
		this.doValidation();
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
							outPutErrotMeaagages={this.state.errorMessage}
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
