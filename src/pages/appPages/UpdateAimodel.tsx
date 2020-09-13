import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Aimodel from '../../objectInterface/Aimodel';
import { _S3URL } from '../../apiURL/s3';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import ValidationManager from '../../modules/class/ValidationManager';
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
	open_mouth_imageFile?: File; //口を開けた画像
	close_mouth_imageFile?: File; //口を閉じた画像
	redirectTo: string; //リダイレクト先の指定
	rules: { [key: string]: string }; //バリエーションのルール
	errorMessages: { [key: string]: string[] }; //バリエーションのエラーメッセージ
	ruleTypeErrorMessages: { [key: string]: string }; //バリデーションルールごとのエラーメッセージ
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
		open_mouth_imageFile: undefined,
		close_mouth_imageFile: undefined,
		redirectTo: userStore.nowLogin ? '' : '/',
		rules: {
			name: 'required|max:255',
			self_introduction: 'max:255',
		},
		errorMessages: {
			name: [],
			self_introduction: [],
			open_mouth_imageFile: [],
			close_mouth_imageFile: [],
		},
		ruleTypeErrorMessages: {
			required: '必須項目です',
			max: '255文字以下入力してください',
		},
	};

	constructor(props: Props) {
		super(props);
		this.setName = this.setName.bind(this);
		this.setSelf_introduction = this.setSelf_introduction.bind(this);
		this.setOpen_mouth_image = this.setOpen_mouth_image.bind(this);
		this.setClose_mouth_image = this.setClose_mouth_image.bind(this);
		this.doSubmit = this.doSubmit.bind(this);
	}

	/**
	 * aimodelData.nameの変更をセット
	 * @param {React.FormEvent<HTMLInputElement>} e
	 */
	setName(e: React.FormEvent<HTMLInputElement>) {
		//AIモデルデータをコピー
		const aimodelData = this.copyAimodeData();

		//名前の変更を代入
		aimodelData.name = e.currentTarget.value;
		this.setState({ aimodelData: aimodelData });
	}

	/**
	 * aimodelData.Self_introductionの変更をセット
	 * @param {React.FormEvent<HTMLInputElement>} e
	 */
	setSelf_introduction(e: React.FormEvent<HTMLInputElement>) {
		//AIモデルデータをコピー
		const aimodelData = this.copyAimodeData();

		//自己紹介文は空じゃないか?
		if (e.currentTarget.value) {
			aimodelData.self_introduction = e.currentTarget.value;
		} else {
			//空だった場合
			aimodelData.self_introduction = '';
		}

		this.setState({ aimodelData: aimodelData });
	}

	/**
	 * 口が開いた画像のセッター
	 * @param {FileList} file
	 */
	setOpen_mouth_image(file: FileList) {
		this.setState({ open_mouth_imageFile: file[0] });
	}

	/**
	 * 口が開いた画像のセッター
	 * @param {FileList} file
	 */
	setClose_mouth_image(file: FileList) {
		this.setState({ close_mouth_imageFile: file[0] });
	}

	/**
	 * stateのAIモデルのプロパティに変更をするためにAIモデルのデータをコピーする
	 * @returns {Aimodel}
	 */
	copyAimodeData(): Aimodel {
		return Object.assign(this.state.aimodelData);
	}

	async getAimodelData() {
		const uri = `${_APIURL}/aimodel/${this.props.match.params.id}`;

		try {
			const aimodelData: Aimodel = await (await axios.get(uri)).data;

			//AIモデルのユーザーidとログインしているユーザーidは違うか？
			if (aimodelData.user_id !== userStore.userStatus.userId) {
				//リダイレクト先を自分の作ったAIモデルの一覧へ移動
				this.setState({ redirectTo: '/user/my/aimodel' });
				return;
			}

			//自己紹介文がnullであるか？
			if (!aimodelData.self_introduction) {
				aimodelData.self_introduction = '';
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

	/**
	 * バリエーションの実行
	 * @returns {boolean} バリデーションエラーの存在
	 */
	doValidation(): boolean {
		//バリデーション対象のデータ
		const validationData: { [key: string]: string } = {
			name: this.state.aimodelData.name,
			self_introduction: this.state.aimodelData.self_introduction,
		};

		const validationManager = new ValidationManager();
		//新しいエラーを返す
		const errorMessages = validationManager.checkValidation(
			validationData,
			this.state.rules,
			this.state.ruleTypeErrorMessages
		);

		//新しいエラーメッセージをセット
		this.setState({ errorMessages: errorMessages });

		//最終的にエラーがあったか？
		return validationManager.isError;
	}

	async requestUpdate(): Promise<boolean> {
		//リクエストボディの構築
		const formData = new FormData();
		formData.append('name', this.state.aimodelData.name);
		formData.append(
			'self_introduction',
			this.state.aimodelData.self_introduction
		);

		//口を開けた画像は存在しているか？
		if (this.state.open_mouth_imageFile) {
			formData.append(
				'open_mouth_image',
				(this.state.open_mouth_imageFile as unknown) as Blob
			);
		}

		//口を閉じた画像は存在しているか？
		if (this.state.close_mouth_imageFile) {
			formData.append(
				'close_mouth_image',
				(this.state.close_mouth_imageFile as unknown) as Blob
			);
		}

		//ヘッダーを設定
		axios.defaults.headers.common = {
			'X-HTTP-Method-Override': 'PUT',
			Authorization: `Bearer ${userStore.token}`,
		};
		try {
			//通信開始
			await axios.post(
				_APIURL + `/aimodel/${this.state.aimodelData.id}`,
				formData
			);
		} catch (error) {
			console.log(error.response);

			//エラーステータスは422か？(バリデーションエラー)
			if (error.response.status === 422) {
				//エラーメッセージを格納
				this.setState({ errorMessages: error.response.data.error });
				return false;
			}

			//エラーステータスは401か？(トークンの期限切れ)
			if (error.response.status === 401) {
				//ログアウトの処理
				actions.logout();
				this.setState({ redirectTo: '/login' });
				return false;
			}
		}
		return true;
	}

	async doSubmit() {
		//バリデーションエラーは存在したか？
		if (this.doValidation()) {
			return;
		}

		//更新はできたか?
		if (await this.requestUpdate()) {
			this.setState({ redirectTo: '/user/my/aimodel' });
			return;
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
							setValue={this.setName}
							value={this.state.aimodelData.name}
						/>
						<Textarea
							className='self_introduction'
							label='自己紹介文'
							type='text'
							placeholder='自己紹介を入力'
							outPutErrotMeaagages={this.state.errorMessages.self_introduction}
							setValue={this.setSelf_introduction}
							value={this.state.aimodelData.self_introduction}
						/>
						<InputImage
							className='open_mouth_image'
							label='口を開けた画像'
							outPutErrotMeaagages={
								this.state.errorMessages.open_mouth_imageFile
							}
							image={_S3URL + this.state.aimodelData.open_mouth_image}
							setValue={this.setOpen_mouth_image}
						/>
						<InputImage
							className='close_mouth_image'
							label='口を閉じた画像'
							outPutErrotMeaagages={
								this.state.errorMessages.close_mouth_imageFile
							}
							image={_S3URL + this.state.aimodelData.close_mouth_image}
							setValue={this.setClose_mouth_image}
						/>
						<Button variant='primary' onClick={this.doSubmit}>
							更新
						</Button>
					</Form>
				</Col>
			</Container>
		);
	}
}
