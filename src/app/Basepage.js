import React, { Suspense } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage"
import ItemList from "./views/ItemList";
import ImportPage from "./pages/ImportPage";
import IssuePage from "./pages/IssuePage";
import SplashScreen from "./layout/SplashScreen"

export default function BasePage() {

    return (
        <Suspense fallback={<SplashScreen/>}>
            <Switch>
                {
                    <Redirect exact from="/" to="/search"/>
                }
                <Route path="/search" component={SearchPage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/about" component={AboutPage} />
                <Route path="/addItem" component={ImportPage}/>
                <Route path="/issue" component={IssuePage}/>

                <Route path="/browse" component={ItemList} />
                
                <Redirect to="error" />
            </Switch>
            </Suspense>
    );
}
