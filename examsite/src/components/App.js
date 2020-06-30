import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Guide from './Guide';
import flipCard from "./flipCard";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import createQuestion from "./createQuestion";
import homepage from "./homepage";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={homepage}/>
                        <Route path="/guide" exact component={Guide}/>
                        <Route path="/practice" exact component={flipCard}/>
                        <Route path="/create" exact component={createQuestion}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
