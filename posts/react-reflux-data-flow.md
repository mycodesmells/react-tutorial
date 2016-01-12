# React Tutorial - Reflux Data Flow

React Tutorial: [Post 1](http://mycodesmells.com/post/react-tutorial-creating-your-first-component)

In one of the previous posts we took a look on building some basic React components. Even though we've seen the data being displayed on the screen, it was hard coded into the component. Obviously this it not how it works in real life scenarios. This is why this post explains the basics of Reflux - one of the ways you can populate your components with data fetched eg. from your backend.

### Reflux's One Direction Flow

The idea behind Reflux workflow is fairly easy: we are dealing with so-called one-direction data flow. Instead of having the two-way binding between view and controller (as for example in Angular JS), Reflux forces view refreshes via three-element structure: actions, stores and components. First there are actions, which are triggers for data refreshes. Then the actual data refresh is happening in the stores (which are responsible for AJAX calls and any extra data manipulations). Finally, all components that are registered to be listening to a given store receive appropriate information about the change and can refresh their view. It might seem complicated, but it really is not, as you will see in the example below.

### Reflux In Action

In our example we are building on top of what we have left from the previous React post: we are dealing with a team consisting of players. We would like to have the team details fetched from some kind of backend endpoint. 

We start introducing Reflux by adding two files: `TeamActions.js` and `TeamStore.js`. In our Actions file we will have defined all the triggers for workflow events, in our case - for downloading team information. 

    // TeamActions.js
    let TeamActions = Reflux.createActions([
        'loadTeam'
    ]);

As you can see, the file defines only the actions' names that are later used in the store file. For now we just need to know that.

The second step in building the workflow is having the store ask the backend for some data. There are actually three things happening in our store: first it waits for the trigger to perform some operation (and the trigger is an action from `TeamAction.js`), then the operation is performed. Lastly, the result (of store's state) is pushed into all listening components. As we don't have any backend in our little project, we will just return the team details to the components, but you can imagine having some kind of AJAX request here.

    // TeamStore.js
    let TeamStore = Reflux.createStore({
        team: {},
        init() {
            // register listeners to actions
            this.listenTo(TeamActions.loadTeam, this.onLoadTeam);
        },
        onLoadTeam() {
            // here you should ask your backend for some data
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
            // push the data to components
            this.trigger(dreamTeam);
        }
    });
    
Finally, we will redefine our Team component to fetch the data from the store and refresh itself on changes. As we are no longer using parameters, we need to use component's state. First, we need to inform React, that our component will be a listener for some store:

    // Team.jsx
    ...
    const Team = React.createClass({
        mixins: [Reflux.ListenerMixin],
    ...
        });
    ...
    
Then, as we are using the state now, we should define the initial state (for when we don't have any store data yet). We will have the players array initialized as empty instead of being null, for cleaner code in the render method (we iterate over empty array and just don't print any player details):

    ...
         getInitialState() {
                return {team:{players:[]}};
            },
    ...
    
Then there is the most important part: registration for listening to the store changes and reacting on those changes. First we trigger data download by calling the action (from `TeamActions`), then we register that every time the `TeamStore` triggers some data, we will intercept it and refresh our state (remember that `this.setState({team});` is ES6 version of `this.setState({team:team});`).

    ...
    componentDidMount() {
            console.info("Requeting team information via Actions");
            TeamActions.loadTeam();
    
            this.listenTo(TeamStore, (team) => {
                console.info("Received team information from Store");
                this.setState({team});
            });
        },
    ...
    
As you can see, we have some `console.log` calls for demo purposes, to make sure that we actually are getting this data from our store.

From now on, we don't have to provide team information as component's parameter in index.jsx, as well:

    //index.jsx
    ...
    ReactDOM.render(
        <Team/>,
        document.getElementById('application')
    );
    
### Result

<img src="https://raw.githubusercontent.com/mycodesmells/react-tutorial/master/posts/images/3-reflux-list.png" />
    
The code for this little project is available [on GitHub](https://github.com/mycodesmells/react-tutorial).
