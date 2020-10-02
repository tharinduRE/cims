import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
            <Switch>
                {
                    <Redirect exact from="/" to="/search"/>
                }
                <Route path="/search" component={SearchPage}/>
                <Route path="/home" component={HomePage}/>
                <Redirect to="error/error-v1"/>
            </Switch>
    );
}
