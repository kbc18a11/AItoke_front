import React, { Component } from 'react';
import AimodelList from '../../components/aiModel/AimodelList';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

interface Props {}
interface State {
	serchWord: string;
}

export default class SearchAimodel extends Component<Props, State> {
	constructor(props: any) {
		super(props);
		console.log(props.match.params.serchWord);

		this.state = {
			serchWord: props.match.params.serchWord,
		};
	}

	render() {
		return (
			<AimodelList
				getaimodelListDataUri={
					_APIURL + `/aimodel?serchWord=${this.state.serchWord}&page=`
				}
				listItemUrl='/aimode/'
			/>
		);
	}
}
