import React from 'react';
import {Row, Col} from 'react-bootstrap';

const Player = React.createClass({

    render() {
        let player = this.props.player;
        return (
            <Row>
                <Col sm={3}>
                    <h2>#{player.number}</h2>
                </Col>
                <Col sm={6}>
                    {player.firstName}
                    <h4>{player.lastName}</h4>
                </Col>
                <Col sm={3}>
                    <h2>#{player.position}</h2>
                </Col>
            </Row>
        )
    }

});

export default Player;
