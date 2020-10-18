import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ManageUsers from './ManageUsers'
import UserProfile from './UserProfile'
import UserSettings from './UserSettings'

export default function UserPage() {
    return (
        <Switch>
            <Route path="/user/profile" component={UserProfile}/>
            <Route path="/user/settings" component={UserSettings}/>
            <Route path="/user/manage" component={ManageUsers}/>

            <Redirect from="/user" exact={true} to="/user/profile"/>
            <Redirect to="/error" />

        </Switch>
    )
}
