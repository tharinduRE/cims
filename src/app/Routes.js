import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BasePage from "./Basepage";
import Layout from "./layout/Layout";
import { ErrorPage } from "./pages/errors/ErrorPage";
import AuthPage from "./pages/auth/AuthPage";
import Logout from "./pages/auth/Logout";
import { AuthContext } from "./pages/auth/AuthProvider";

/*
    This one handle routes based on authentication
*/

export default function Routes() {
    const { state: authState } = React.useContext(AuthContext);

    const isAuth = authState.user != null;
    
    return (
        <Switch>
            
            {!isAuth ? (
                /*Render auth page when user at `/auth` and not authorized.*/
                <Route>
                    <AuthPage />
                </Route>
            ) : (
                /*Otherwise redirect to root page (`/`)*/
                <Redirect from="/auth" to="/" />
            )}


            <Route path="/error" component={ErrorPage} />
            <Route path="/logout" component={Logout} />

            {!isAuth ? (
                /*Redirect to `/auth` when user is not authorized*/
                <Redirect to="/auth/login" />
            ) : (
                <Layout>
                    <BasePage />
                </Layout>
            )}
        </Switch>
    );
}
