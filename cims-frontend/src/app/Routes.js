import React from "react";
import {
  BsArchive,
  BsBoxArrowInLeft,
  BsCollection,
  BsFileText,
  BsHouse,
  BsSearch,
} from "react-icons/bs";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
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
import ItemIssue from "./views/item/ItemIssue";
import OrderForm from "./views/order/OrderForm";
import ItemView from "./views/item/ItemView";
import VendorForm from "./views/waste/VendorForm";

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
      index: 90,
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
    path: "/items/add",
    component: ItemUpdate,
    modal:true,
  },
  {
    path: "/items/view/:id",
    component: ItemView,
    modal:true,
  },
  {
    path: "/items/edit/:id",
    component: ItemUpdate,
    modal:true,
  },
  
  {
    path: "/items/:id/issue",
    component: ItemIssue,
    modal:true,
  },
  {
    path: "/items/:id/order",
    component: OrderForm,
    modal:true,
  },
  {
    path: "/items/:id/order/new",
    component: OrderForm,
    modal:true,
  },
  {
    path: "/waste/vendor/new",
    component: VendorForm,
    modal:true,
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
      children={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

function ModalRoute(route,background) {
  return (
    background && <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}


export default function NavRoutes() {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Redirect exact from="/" to="/home" />
        {routes
          .filter((route) => !route.modal)
          .map((route, i) => (
            <NavRoute key={i} {...route} />
          ))}
          <Route path="*">
            <Redirect to="/error" />
          </Route>
      </Switch>
      {routes.map((route, i) => {
        if (route.modal) return <ModalRoute key={i} {...route} background={background} />;
        return null;
      })}
    </>
  );
}
