import React from "react";
import { Button, Dropdown, Image } from "react-bootstrap";
import { BsBell, BsBoxArrowInRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../pages/auth/AuthProvider";

export default function TopBar() {
    const { state: authState } = React.useContext(AuthContext);

    const user = authState.user;

    return (
        <div className="topbar">
            <div className="topbar-item mr-3">
                <Dropdown size="xl">
                    <Dropdown.Toggle as="a" className="btn w-auto d-flex align-items-center px-2">
                        <div className="d-flex flex-column text-right pr-3">
                            <span className="text-dark-75 font-weight-bolder font-size-base d-none d-md-inline">
                                {`${user.firstName} ${user.lastName.charAt(0)}.`}
                            </span>

                            <span className="text-muted font-weight-bold font-size-base d-none d-md-inline">
                                {user.postTitle}
                            </span>
                        </div>
                        <Image src={process.env.PUBLIC_URL + "/images/avatar.svg"} roundedCircle />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/user/profile" eventKey={1}>Profile</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/user/settings" eventKey={2}>Settings</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="topbar-item mr-3" size="md">
                <Button variant="link">
                    <BsBell size="1.5rem" />
                </Button>
            </div>
            <div className="topbar-item mr-3">
                <Dropdown>
                    <Dropdown.Toggle bsPrefix=" " as="a">
                        <BsBoxArrowInRight size="1.5rem" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/logout" eventKey={1}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}
