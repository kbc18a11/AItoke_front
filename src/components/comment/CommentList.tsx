import React, { Component } from 'react';
import CreateCommentForm from './CreateCommentForm.tsx';

interface Props {
	id: number;
}
interface State {}

export default class CommentList extends Component<Props, State> {
	render() {
		return (
			<div>
				<CreateCommentForm />
			</div>
		);
	}
}
