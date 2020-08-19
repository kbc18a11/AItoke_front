import React, { Component } from 'react'
import UserProfile from '../../components/userProfile/UserProfile';
import AimodelList from '../../components/aiModel/AimodelList';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';

export default class UserCreatedAimodels extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //URLで指定したユーザーid
            targetUser_id: props.match.params.id
        }
    }

    render() {
        return (
            <div>
                <UserProfile user_id={this.state.targetUser_id} />
                <AimodelList getaimodelListDataUri={_APIURL + '/aimodel?page='}
                    user_id={this.state.targetUser_id} listItemUrl="/aimode/" />
            </div>
        )
    }
}
