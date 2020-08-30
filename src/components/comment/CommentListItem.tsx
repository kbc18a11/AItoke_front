import React, { Component } from 'react';
import { ListGroup, Media } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/inputImage.css';
import '../../css/linkCharacter.css';
import { Link } from 'react-router-dom';
import { _S3URL } from '../../apiURL/s3';

interface Props {
	user_id: number; //親から送られるユーザーid
	comment: string; //表示するコメント
	linkTo: string; //ユーザー情報のリンク先
	user_name: string; //ユーザーの名前
	user_icon: string; //ユーザーのS3URI
}

export default class CommentListItem extends Component<Props> {
	render() {
		return (
			<ListGroup.Item as='li'>
				<Media>
					<Link to={this.props.linkTo}>
						<img
							className='imageFile'
							src={_S3URL + this.props.user_icon}
							alt='Generic placeholder'
						/>
					</Link>
					<Media.Body className='text-left'>
						<Link to={this.props.linkTo}>
							<h3>{this.props.user_name}</h3>
						</Link>
						<Link className='linkCharacter' to={this.props.linkTo}>
							<p>{this.props.comment}</p>
						</Link>
					</Media.Body>
				</Media>
			</ListGroup.Item>
		);
	}
}
