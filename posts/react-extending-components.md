# React Tutorial - Extending components

Once you get used to creating your own components, you might face a problem quite common for most programming languages - having a need to extend a class. While the way you do this in React is not the most classic, is still can be done rather easily.

### Inheritance vs composition

Being a developer with a solid Java background, I got used to several _best practices_ that are a must in JVM world. One of them is rather simple, yet powerful inheritance model. Whenever you have a class that is a subtype of another one and you just want to add some specific behaviour, all you need do to is type

    class Developer extends Person

and you already have a brand new class that inherits `Person`'s characteristics. This is a typical approach, also called a _is-a_ relationship. Another way to go is to create a class that has an attribute of _superclass_ which can be used to perform any specific actions. This is an example of _has-a_ relationship, and this is generally the way to go using React (and Go Lang as a matter of fact).

### The problem

Recently I've run into an unusual problem developing a webpage using React framework. I've been using [react-bootstrap](https://react-bootstrap.github.io/) library to make use of beloved [Bootstrap](http://getbootstrap.com/) and some ready components. One of the components was `ButtonDropdown`, but it's default version allows only to have a simple list of options below the button. I, on the other hand, needed to create a custom panel, where some elements are clickable, some of them should close the dropdown while other should do something else. The problem was, that there was not an easy way to close the dropdown programatically, as we are actually outside the `DropdownButton` context and those methods that allow to expand/collapse dropdown are not available. The dropdown code looked something like that:

    ...
    let TimeMachineDropdown = React.createClass({

        getInitialState() {
            let state = {
                current: {},
                filters: [
                    {value: '*', label: 'Show all'},
                    {value: 'G', label: 'Show Guards'},
                    {value: 'F', label: 'Show Forwards'},
                    {value: 'C', label: 'Show Centers'}
                ]
            };
            state.current = _.extend({}, state.filters[0]);
            return state;
        },


    ...
        render() {
                const title = <span><Glyphicon glyph="calendar" />{ this.state.current.label }</span>;

                return (
                    <DropdownButton title={title} navItem pullRight noCaret>
                        <li role="presentation"  className="range-list-initial-panel">
                            <div className="ranges-list-header">Filter positions:</div>
                            <div className="range-list">
                                { _.map(this.state.filters, (f) => {
                                    return (<a key={f.label}
                                               className="range-option"
                                               onClick={this.changeFilter.bind(null, f)}>{f.label}</a>);
                                    })}
                            </div>
                            <div className="ranges-list-footer">
                                <a className="range-option" onClick={this.showCustomFilter}>Custom Filter</a>
                            </div>
                        </li>
                    </DropdownButton>
                );

            }
    ...


 As you can see, I needed to close the dropdown manually whenever a user clicks on one of the range options. But how?

### Refs to the rescue

The correct way to approach this problem is to have a reference to the _superclass_, as our component is actually extending the `DropdownButton` class (it is used as a root component in `render()` method). Once you add a reference (`ref`) to that component,

    <DropdownButton ref="dropdown" title={title} navItem pullRight noCaret>

you can call its specific methods:

    this.refs.dropdown.setOpenState(false);

Now whenever I need to perform a `DropdownButton`-specific action, I can do that via a reference.

**Note** This problem occurred in a project where we were using slightly older React version (we froze it at 0.13.3), and now `react-bootstrap` changed their classes structure so this solution is not available any more. Still you can use it in your own classes, so this solution should be still valid in many cases.
