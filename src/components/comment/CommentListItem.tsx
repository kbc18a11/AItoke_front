import React, { Component } from 'react';
import { ListGroup, Media, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/inputImage.css';
import '../../css/linkCharacter.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { _S3URL } from '../../apiURL/s3';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

interface Props {
	user_id: number; //親から送られるユーザーid
	comment: string; //表示するコメント
	linkTo: string; //ユーザー情報のリンク先
}
interface State {
	user_name: string; //ユーザーの名前
	user_icon: string; //ユーザーのS3URI
}

export default class CommentListItem extends Component<Props, State> {
	state = {
		user_id: this.props.user_id,
		user_name: '',
		user_icon: '',
	};

	/**
	 * ユーザー情報の取得
	 * @returns {void}
	 */
	async requestGetUserData(): Promise<void> {
		//ユーザー情報の取得開始
		const userData = await (
			await axios.get(`${_APIURL}/user/${this.props.user_id}`)
		).data;

		this.setState({ user_name: userData.name });
		this.setState({ user_icon: _S3URL + userData.icon });
	}

	componentDidMount() {
		console.log(this.props);

		//ユーザー情報の取得
		this.requestGetUserData();
	}

	render() {
		return (
			<ListGroup.Item as='li'>
				<Media>
					<Link to={this.props.linkTo}>
						<img
							className='imageFile'
							src={this.state.user_icon}
							alt='Generic placeholder'
						/>
					</Link>
					<Media.Body className='text-left'>
						<Link to={this.props.linkTo}>
							<h3>{this.state.user_name}</h3>
						</Link>
						<h3>{this.props.user_id}</h3>
						<Link className='linkCharacter' to={this.props.linkTo}>
							<p>{this.props.comment}</p>
						</Link>
					</Media.Body>
				</Media>
			</ListGroup.Item>
		);
	}
}
