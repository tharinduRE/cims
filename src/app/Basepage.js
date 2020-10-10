import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage"
import ItemList from "./views/ItemList";
import ImportPage from "./pages/ImportPage";
import IssuePage from "./pages/IssuePage";

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
                <Route path="/about" component={AboutPage} />
                <Route path="/addItem" component={ImportPage}/>
                <Route path="/issue" component={IssuePage}/>

                <Route path="/listall" component={ItemList} />
                
                <Redirect to="error" />
            </Switch>
    );
}
