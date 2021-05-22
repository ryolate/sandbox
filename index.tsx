import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Demo } from './sandbox'


import {
    HashRouter as Router,
    Link, Route, Switch
} from 'react-router-dom'

function run(canvas: HTMLCanvasElement) {
    return
}

const Game = () => {
    return <div></div>
}

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/sandbox">Sandbox</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/sandbox">
                        <Demo />
                    </Route>
                    <Route path="/">
                        <h2>Home</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
)
