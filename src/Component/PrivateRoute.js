import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute(props) {
    const isLogin = localStorage.getItem('name') ? true : false
    return isLogin ? (
        <Route path={props.path} render={() => <props.component></props.component>}></Route>
    ) : (
        <Redirect to="/" />
    )
}

export default PrivateRoute
