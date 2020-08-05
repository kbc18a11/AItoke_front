import React, { Component } from 'react'
import AimodelList from '../../components/aiModel/AimodelList';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

export default class Index extends Component {
    render() {
        return (
            <AimodelList getaimodelListDataUri={_APIURL + '/aimodel?page='}
                listItemUrl="/aimode/" />
        )
    }
}
