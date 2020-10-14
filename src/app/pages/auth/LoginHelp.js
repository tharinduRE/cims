import React from "react";
import { Card } from "react-bootstrap";
import { BsBoxArrowRight, BsExclamationCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LoginHelp() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    <h2 className="text-weight-bold">
                        <BsExclamationCircle size="2rem" /> Login Help
                    </h2>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Link to="/auth/login" className="btn btn-info">
                    {" "}
                    <BsBoxArrowRight /> Login
                </Link>
            </Card.Body>
        </Card>
    );
}
