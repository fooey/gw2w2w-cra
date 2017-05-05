import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <p className="App-intro">
                                    To get started, edit
                                    <code>src/App.js</code>
                                    and save to reload.
                                </p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <p className="App-intro">
                                    To get started, edit
                                    <code>src/App.js</code>
                                    and save to reload.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
