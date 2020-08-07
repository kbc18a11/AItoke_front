import React, { Component } from 'react'
import AimodelProfile from '../../components/aiModel/AimodelProfile';

export default class AimodelInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //対象のモデル
            aimodel_id: props.match.params.id
        }
    }

    render() {
        return (
            <div>
                <AimodelProfile id={this.state.aimodel_id} />
            </div>
        )
    }
}
