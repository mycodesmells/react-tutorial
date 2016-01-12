import React from 'react';
import Reflux from 'reflux';
import {Col, PageHeader} from 'react-bootstrap'

import TeamActions from '../actions/TeamActions'
import TeamStore from '../stores/TeamStore'
import Player from './Player.jsx';

const Team = React.createClass({

    mixins: [Reflux.ListenerMixin],

    getInitialState() {
        return {team:{players:[]}};
    },

    componentDidMount() {
        console.info("Requeting team information via Actions");
        TeamActions.loadTeam();

        this.listenTo(TeamStore, (team) => {
            console.info("Received team information from Store");
            this.setState({team});
        });
    },

    render() {
        let team = this.state.team;

        let players = [];
        team.players.forEach((p)=> {
            players.push(<Player key={p.number} player={p}/>);
        });

        return (
            <Col sm={6} smOffset={3}>
                <div>
                    <PageHeader>
                        {team.name}
                        <small>&nbsp;Players list</small>
                    </PageHeader>
                </div>
                <div>
                    { players }
                </div>
            </Col>
        )
    }

});

export default Team;