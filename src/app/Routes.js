import React from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { Route } from 'react-router-dom'
import BasePage from './Basepage'
import Layout from './layout/Layout'
import { ErrorPage } from './pages/errors/ErrorPage'
/*
    This one handle routes based on authentication
*/

export default function Routes() {

    return (
        <Switch>

            <Route path="/error" component={ErrorPage}/>

            <Layout>
                <BasePage/>
            </Layout>
        </Switch>
    )
}
