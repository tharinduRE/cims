import React from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import BasePage from './Basepage'
import Layout from './layout/Layout'
/*
    This one handle routes based on authentication
*/

export default function Routes() {

    return (
        <Switch>
            <Layout>
                <BasePage/>
            </Layout>
        </Switch>
    )
}
