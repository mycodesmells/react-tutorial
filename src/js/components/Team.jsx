import React from 'react';
import {Col, PageHeader} from 'react-bootstrap'

import Player from './Player.jsx';

const Team = React.createClass({

    render() {
        let team = this.props.team;

        let players = [];
        team.players.forEach((p)=> {
            players.push(<Player key={p.number} player={p}></Player>);
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