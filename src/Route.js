import React from 'react'
import ReactDOM from 'react-dom'
import login from './Component/login'
import Home from './Component/home'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={login} />
            {localStorage.getItem('name') ? <Route path="/home" component={Home} /> : <Redirect to="/" />}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
)
