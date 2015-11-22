import React from 'react';
import ReactDOM from 'react-dom';
import Team from './components/Team.jsx';

let dreamTeam = {
    name: 'The Dream Team',
    players: [
        { number: 15, position: 'PG', firstName: 'Magic', lastName: 'Johnson' },
        { number: 9, position: 'SG', firstName: 'Michael', lastName: 'Jordan' },
        { number: 7, position: 'SF', firstName: 'Larry', lastName: 'Bird' },
        { number: 14, position: 'PF', firstName: 'Charles', lastName: 'Barkley' },
        { number: 5, position: 'C', firstName: 'David', lastName: 'Robinson' },
        { number: 8, position: 'SF', firstName: 'Scottie', lastName: 'Pippen' }
    ]
};

ReactDOM.render(
    <Team team={dreamTeam}/>,
    document.getElementById('application')
);