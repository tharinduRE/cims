import React from "react";
import { Image } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import LoginHelp from "./LoginHelp";

export default function Auth() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <div className="d-flex flex-row-fluid">
                    <div className="d-flex flex-center flex-row-fluid">
                        <div
                            className="text-center p-7 position-relative overflow-hidden"
                            style={{ width: "450px" }}
                        >
                            <div className="d-flex flex-center mb-5">
                                <Image
                                    src={process.env.PUBLIC_URL + "/logo-512w.png"}
                                    width="85px"
                                    alt=""
                                />
                            </div>

                            <Switch>
                                <Route path="/auth/login" component={Login} />
                                <Route path="/auth/register" component={SignUp}/>
                                <Route path="/auth/login-help" component={LoginHelp}/>

                                <Redirect from="/auth" exact={true} to="/auth/login" />
                                <Redirect to="/auth/login" />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
