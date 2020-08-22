import React, { Component } from 'react';
import { ListGroup, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateCommentForm from './CreateCommentForm.tsx';
import CommentListItem from './CommentListItem.tsx';
import PagenationList from '../pagenations/PagenationList';
import axios from 'axios';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

interface Props {
	aimodel_id: number;
}

interface State {
	commentDatas: object[]; //コメントデータの配列
	currentPage: number; //ページネーションの現在のページ
	fristPage: number; //ページネーションの最初のページ
	lastPage: number; //ページネーションの最後のページ
}

export default class CommentList extends Component<Props, State> {
	state = {
		commentDatas: [],
		currentPage: 1,
		fristPage: 1,
		lastPage: 1,
	};

	constructor(props: Props) {
		super(props);
		this.setCurrentPage = this.setCurrentPage.bind(this);
	}

	/**
	 * 現在見ているページを変更
	 * @param {number} nextPage
	 */
	setCurrentPage(nextPage: number) {
		//ページネーションのDOMのテキストを値にセット
		this.setState({ currentPage: nextPage });

		//ページが変化したため、コメントのデータを取得を実行
		this.requestGetComment(nextPage);
	}

	/**
	 * 現在ページごとのコメントのデータを取得
	 * @param {number} page 現在のページ
	 * @returns {Promise<void>}
	 */
	async requestGetComment(page = this.state.currentPage): Promise<void> {
		//リクエスト先のuri
		const _URI: string = `${_APIURL}/aimodel/${this.props.aimodel_id}/aimodelcomment?page=${page}`;
		//通信開始
		const responseData = (await axios.get(_URI)).data;

		//最後のページナンバーをセット
		this.setState({ lastPage: responseData.last_page });
		//コメントのデータをセット
		this.setState({ commentDatas: responseData.data });
	}

	componentDidMount() {
		this.requestGetComment();
	}

	/**
	 * コメントアイテムのコンポーネンを生成
	 * @returns {JSX.Element}
	 */
	createCommentList() {
		return this.state.commentDatas.map(
			(commentData): JSX.Element => {
				return (
					<CommentListItem
						comment={commentData.comment}
						user_id={commentData.user_id}
						linkTo={`/userl/${commentData.user_id}/aimode`}
					/>
				);
			}
		);
	}

	render() {
		return (
			<div>
				<CreateCommentForm aimodel_id={this.props.aimodel_id} />
				<Container>
					<Col md={{ span: 6 }}>
						<ListGroup as='ul'>{this.createCommentList()}</ListGroup>
					</Col>
					<PagenationList
						currentPage={this.state.currentPage}
						fristPage={this.state.fristPage}
						lastPage={this.state.lastPage}
						setParentValue={this.setCurrentPage}
					/>
				</Container>
			</div>
		);
	}
}
