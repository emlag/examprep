import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Guide from './Guide';
import flipCard from "./flipCard";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import createQuestion from "./createQuestion";
import homepage from "./homepage";
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBBYjAy2nWmAyUzN54cS3wa9BwbuLHQoQI",
    authDomain: "examprep-a775e.firebaseapp.com",
    databaseURL: "https://examprep-a775e.firebaseio.com",
    projectId: "examprep-a775e",
    storageBucket: "examprep-a775e.appspot.com",
    messagingSenderId: "1031338941170",
    appId: "1:1031338941170:web:73f7f6a818f9eb8265ce6b",
    measurementId: "G-3G98EFVWNB"
  };

firebase.initializeApp(firebaseConfig);

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
