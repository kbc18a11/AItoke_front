import React, { Component } from 'react';
import CreateCommentForm from './CreateCommentForm.tsx';

interface Props {
	aimodel_id: number;
}
interface State {}

export default class CommentList extends Component<Props, State> {
	render() {
		return (
			<div>
				<CreateCommentForm aimodel_id={this.props.aimodel_id} />
			</div>
		);
	}
}
