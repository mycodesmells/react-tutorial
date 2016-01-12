import React from 'react';
import Reflux from 'reflux';

import TeamActions from '../actions/TeamActions';

let TeamStore = Reflux.createStore({

    team: {},

    init() {
        this.listenTo(TeamActions.loadTeam, this.onLoadTeam);
    },

    onLoadTeam() {
        let dreamTeam = {
            name: 'The Dream Team',
            players: [
                {number: 15, position: 'PG', firstName: 'Magic', lastName: 'Johnson'},
                {number: 9, position: 'SG', firstName: 'Michael', lastName: 'Jordan'},
                {number: 7, position: 'SF', firstName: 'Larry', lastName: 'Bird'},
                {number: 14, position: 'PF', firstName: 'Charles', lastName: 'Barkley'},
                {number: 5, position: 'C', firstName: 'David', lastName: 'Robinson'},
                {number: 8, position: 'SF', firstName: 'Scottie', lastName: 'Pippen'}
            ]
        };

        this.trigger(dreamTeam);
    }

});

export default TeamStore;