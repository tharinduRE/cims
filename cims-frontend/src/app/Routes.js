import React from "react";
import {
  BsArchive,
  BsBoxArrowInLeft,
  BsCollection,
  BsFileText,
  BsHouse,
  BsSearch,
} from "react-icons/bs";
import { Redirect, Route, Switch } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Browse from "./pages/BrowsePage";
import HomePage from "./pages/HomePage";
import IssuePage from "./pages/IssuePage";
import OrderPage from "./pages/OrderPage";
import ReportsPage from "./pages/ReportsPage";
import SearchPage from "./pages/SearchPage";
import WasteStore from "./pages/WasteStore";
import ItemUpdate from "./views/item/ItemUpdate";
import UserPage from "./views/user/UserPage";
import ItemLowPage from './pages/ItemLowPage';

export const routes = [
  {
    path: "/search",
    component: SearchPage,
    sideMenu: {
      icon: BsSearch,
      index: 0,
    },
  },
  {
    path: "/home",
    component: HomePage,
    sideMenu: {
      icon: BsHouse,
      index: 10,
    },
  },
  {
    path: "/reports",
    component: ReportsPage,
    sideMenu: {
      icon: BsFileText,
      index: 50,
    },
  },
  {
    path: "/orders",
    component: OrderPage,
    sideMenu: {
      icon: BsBoxArrowInLeft,
      index: 60,
    },
  },
  {
    path: "/waste",
    component: WasteStore,
    sideMenu: {
      icon: BsArchive,
      index: 40,
    },
  },
  {
    path: "/items/all",
    component: Browse,
    sideMenu: {
      icon: BsCollection,
      index: 30,
    }
  },
  {
    path: "/user",
    component: UserPage,
  },
  {
    path: "/issues",
    component: IssuePage,
  },
  {
    path: "/items/edit/:id",
    component: ItemUpdate,
  },
  {
    path: "/items/issue/:id",
    component: IssuePage,
  },
  {
    path: "/items/:id/order",
    component: ItemUpdate,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/items/low",
    component: ItemLowPage,
  },
];

function NavRoute(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export default function NavRoutes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      {routes.map((route, i) => (
        <NavRoute key={i} {...route} />
      ))}
      <Redirect to="error" />
    </Switch>
  );
}
