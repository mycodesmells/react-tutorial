# React Tutorial - Creating Your First Component

Java Script community is always open for a new, promising front-end framework. For a long time there were two main competitors on the market: Angular and Backbone. Then, in 2013, Facebook announced their own tool, called React. In this post we look at its basics, so that we can create some simple page using virtual DOM components.

### React Background

If you take a look at some React code for the first time, you might feel a bit surprised and even overwhelmed, as it sometimes does not look like a good old JS. And you are absolutely right, as it is not - its JSX.

Example from [facebook.github.io](https://facebook.github.io/react/docs/getting-started.html)

    var React = require('react');
    var ReactDOM = require('react-dom');
    
    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('example')
    );

What is JSX? It's described as [XML-like extension to ecmascript](https://facebook.github.io/jsx/). The idea behind is pretty simple: you combine plain JS code with XML (so HTML as well) so that you can create a whole page element it the same place. That's right: you can now have component's logic and view in the very same file. It is really awesome, as you don't have to keep two separate files in sync any more.

When creating a virtual DOM with React components you need to understand one important concept, which might save you some debugging time in the future. You can use regular HTML tags in your views, and they are **always** in lower case. And this is crucial here, because the lower/upper case is used by React to distinguish _your_ components from HTML's. You cannot create `<mycomponent />`, but you can call it `<MyComponent />`.

Using JSX in your code brings a pretty cool, implicit advantage. You might wonder how can this JSX be interpreted by your browser? In fact, it can't! You need to use so called _transpiler_, which is a tool that takes JSX code and can interpret, so that it can be used just like plain JS. So what is the advantage? Folks at Facebook realized, that if you need to transpile your code from JSX to JS, you might as well use the latest ES6 features! It's all compiled to JS anyway, so you may as well use other stuff not available in ES5 by default.

### Creating your first component

I our example we will create two components: Team and Player. We would like to list members of a team, wich each player displayed with some basic information about them. We would like it ot be consistent, and we want to make changes as easily as possible. This is why we will have one view definition for Player, and any time we want to tweak it, we'd just need to do it only in one place. We will also make use of `react-booststrap`, so that our list is not too ugly.

    // Player.jsx
    const Player = React.createClass({
        render() {
            var id = this.props.player;
            return (
                <Row>
                    <Col sm={3}>
                        {id}
                    </Col>
                    <Col sm={9}>
                        <h4>Player {id}</h4>
                    </Col>
                </Row>
            )
        }
    });

And our Team component will show a header and a few players:

    // Team.jsx
    const Team = React.createClass({
        render() {
            let team = this.props.team;
            return (
                <Col sm={6} smOffset={3}>
                    <div>
                        <PageHeader>
                            {team.name}
                            <small>&nbsp;Players list</small>
                        </PageHeader>
                    </div>
                    <div>
                        <Player player={team.players[0]}></Player>
                        <Player player={team.players[1]}></Player>
                        <Player player={team.players[2]}></Player>
                        <Player player={team.players[3]}></Player>
                        <Player player={team.players[4]}></Player>
                    </div>
                </Col>
            )
        }
    });
 
And finally we will create a team instance and pass it into Team component in `index.jsx` which is our Webpack entry file. To do this, we need to use React DOM package. This package provides a method that takes your JSX template (that uses our Player and Team components) and an HTML element on our `index.html` where our React code should be rendered. It is not recommended to render on `document.body`. In our case, we have a div with id _application_ which is the only element on the page.

    // index.jsx

    let dreamTeam = {
        name: 'The Dream Team',
        players: [1,2,3,4,5]
    };
    
    ReactDOM.render(
        <Team team={dreamTeam}/>,
        document.getElementById('application')
    );

And if we run our build, we can se semi-pretty list:

<img src="https://raw.githubusercontent.com/mycodesmells/react-tutorial/master/posts/images/1-first-list.png" />
    
### Making changes

Now that is hardly impressive, mostly because of the way we need to provide data into the components. First of all, we would like to read a list of players and then dispay all of them on the screen. We should not rely on the players list to have five members. We can change our Team code to make it more dynamic:

    // Team.jsx
    ...
    let players = [];
    team.players.forEach((p)=> {
        players.push(<Player key={p} id={p}></Player>);
    });
    ...
    <div>
        { players }
    </div>
    
The second thing we would like to have is more information about each individual player. This we can improve Player component in just in one place to have it reflected for all team members:

    // Player.jsx
    ...
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

And now we can have much richer input data:

    // index.jsx
    ...
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
    ...
    
The end result is much more satisfying:

<img src="https://raw.githubusercontent.com/mycodesmells/react-tutorial/master/posts/images/2-final-list.png" />
    
The code for this little project is available [on GitHub](https://github.com/mycodesmells/react-tutorial).