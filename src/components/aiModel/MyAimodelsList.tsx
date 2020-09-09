import React, { Component } from 'react';
import userStore from '../../flux/user/UserStore';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PagenationList from '../pagenations/PagenationList';
import MyAimodelsListItem from './MyAimodelsListItem';
import { _S3URL } from '../../apiURL/s3';
import Aimodel from '../../objectInterface/Aimodel';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../objectInterface/Aimodel';

interface Props {
	getaimodelListDataUri: string; //AIモデルを取得するURL
	listItemUrl: string; //リストアイテムのURL
}
interface State {
	nowLogin: boolean; //ログインの状態
	aimodelListData: Aimodel[]; //AIモデル情報
	currentPage: number; //現在のページネーションのページ数
	fristPage: number; //ページネーション最初のページ数
	lastPage: number; //ページネーションの最後のページ数
}

export default class MyAimodelsList extends Component<Props, State> {
	state = {
		nowLogin: userStore.nowLogin,
		aimodelListData: [],
		currentPage: 1,
		fristPage: 1,
		lastPage: 1,
	};

	constructor(props: Props) {
		super(props);

		this.setCurrentPage = this.setCurrentPage.bind(this);
		this.deleteListItem = this.deleteListItem.bind(this);
	}

	/**
	 * 現在見ているページを変更
	 * @param {number} nextPage
	 */
	setCurrentPage(nextPage: number): void {
		//ページネーションのDOMのテキストを値にセット
		this.setState({ currentPage: nextPage });
		//次のページのデータを取得
		this.getMyAimodelData(nextPage);
	}

	/**
	 * リストアイテムの作成
	 * @returns {JSX.Element[]}
	 */
	createListItem(): JSX.Element[] {
		return this.state.aimodelListData.map(
			(aimodelData: { [key: string]: any }): JSX.Element => {
				return (
					<MyAimodelsListItem
						id={aimodelData.id}
						name={aimodelData.name}
						close_mouth_image={_S3URL + aimodelData.close_mouth_image}
						linkTo={this.props.listItemUrl + aimodelData.id}
						deleteButtonEvent={this.deleteListItem}
					/>
				);
			}
		);
	}

	/**
	 * ユーザーのAIモデルの情報を取得
	 * @param {number} page
	 */
	async getMyAimodelData(page: number = this.state.currentPage): Promise<void> {
		//リクエスト先のURL
		const _URI =
			this.props.getaimodelListDataUri +
			page +
			`&user_id=${userStore.userStatus.userId}`;

		//ログインはしているか？
		if (userStore.nowLogin) {
			//ヘッダーを設定
			axios.defaults.headers.common = {
				Authorization: `Bearer ${userStore.token}`,
			};
		}
		try {
			//通信開始
			const responceData = await (await axios.get(_URI)).data;

			//ページの情報をセット
			this.setState({ lastPage: responceData.last_page });
			//AIモデルの情報をセット
			this.setState({ aimodelListData: responceData.data });
		} catch (error) {
			console.log(error.response);
		}
	}

	/**
	 *
	 * @param aimodel_id
	 * @returns {void}
	 */
	deleteListItem(aimodel_id: number): void {
		//AIモデルの配列をコピー
		const aimodelListData = this.state.aimodelListData.slice();

		//AIモデルの配列から引数のidを探す
		aimodelListData.forEach((aimodel: Aimodel, index: number) => {
			//AIモデルのidを引数のidは一緒か？
			if (aimodel.id === aimodel_id) {
				//対象のAiモデルを削除
				aimodelListData.splice(index, 1);
			}
		});

		this.setState({ aimodelListData: aimodelListData });
	}

	componentDidMount() {
		this.getMyAimodelData();
	}

	render() {
		//ユーザーがログインしてないか？
		if (!this.state.nowLogin) {
			return <Redirect to={'/'} />;
		}

		return (
			<div>
				<ListGroup as='ul'>{this.createListItem()}</ListGroup>
				<PagenationList
					currentPage={this.state.currentPage}
					fristPage={this.state.fristPage}
					lastPage={this.state.lastPage}
					setParentValue={this.setCurrentPage}
				/>
			</div>
		);
	}
}
