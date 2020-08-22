import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Col } from 'react-bootstrap';

export default class NoLoginCommentFrom extends Component {
	render() {
		return (
			<Container>
				<Col md={{ span: 6 }}>
					<h2>ログインしてコメントしよう</h2>
					<Link to={'/login'}>
						<Button>ログイン</Button>
					</Link>{' '}
					<Link to={'/register'}>
						<Button>ユーザー登録</Button>
					</Link>
				</Col>
			</Container>
		);
	}
}
