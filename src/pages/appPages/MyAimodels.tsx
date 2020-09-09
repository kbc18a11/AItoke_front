import React, { Component } from 'react';
import MyAimodelsList from '../../components/aiModel/MyAimodelsList';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

interface Props {}
interface State {}

export default class MyAimodels extends Component<Props, State> {
	state = {};

	render() {
		return (
			<MyAimodelsList
				getaimodelListDataUri={_APIURL + '/aimodel?page='}
				listItemUrl={'/aimode/'}
			/>
		);
	}
}
