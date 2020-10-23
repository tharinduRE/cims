import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ImportPage from "./pages/ImportPage";
import IssuePage from "./pages/IssuePage";
import SplashScreen from "./layout/SplashScreen";
import Browse from "./pages/BrowsePage";
import WasteStore from "./pages/WasteStore";
import UserPage from "./pages/user/UserPage";
import ReportsPage from "./pages/ReportsPage";
import ItemDetail from "./views/components/ItemDetail";
import OrderPage from "./pages/OrderPage";

export default function BasePage() {
    return (
        <Suspense fallback={<SplashScreen />}>
            <Switch>
                <Redirect exact from="/" to="/home" />

                <Route path="/search" component={SearchPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/waste-store" component={WasteStore} />
                <Route path="/browse" component={Browse} />
                <Route path="/reports" component={ReportsPage} />
                <Route path="/orders" component={OrderPage} />


                <Route path="/addItem" component={ImportPage} />
                <Route path="/issue" component={IssuePage} />

                <Route path="/item/edit/:id" component={ItemDetail}/>
                <Route path="/item/issue/:id" component={IssuePage} />

                <UserPage/>

                <Redirect to="error" />
            </Switch>
        </Suspense>
    );
}
