import React from "react";
import { Card, Col, Nav, Row, Tab, TabContainer } from "react-bootstrap";
import { BsGearFill, BsLockFill, BsPersonFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import AccountInfo from "./profile/AccountInfo";
import ChangeLogin from "./profile/ChangeLogin";
import ProfilePane from "./profile/ProfilePane";
import UserSettings from './UserSettings';
import { AuthContext } from "../../pages/auth/AuthProvider";

export default function UserProfile() {

  const { state: AuthState } = React.useContext(AuthContext);
  const authUser = AuthState.user;

  const location = useLocation();
  
  const editUser = location.state !== undefined ? location.state.user : false;

  return (
    <TabContainer defaultActiveKey="account" transition={false}>
      <Row className="justify-content-center">
        <Col lg={3}>
          <Card className="card-custom card-stretch">
            <Card.Body>
              <ProfilePane user={editUser ? editUser :authUser}/>
              <Nav
                variant="pills"
                className="navi-bold navi-hover navi-active navi-link-rounded"
                bsPrefix="navi"
              >
                <NaviItem icon={<BsPersonFill />} text="Account Infomation" link="account" />
                <NaviItem icon={<BsLockFill />} text="Login Infomation" link="login" hide={editUser}/>
                <NaviItem icon={<BsGearFill />} text="Settings" link="settings" hide={editUser}/>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Tab.Content>
            <Tab.Pane eventKey="account">
              <AccountInfo editUser={editUser}/>
            </Tab.Pane>
            <Tab.Pane eventKey="login" hidden={editUser}>
              <ChangeLogin />
            </Tab.Pane>
            <Tab.Pane eventKey="settings" hidden={editUser}>
              <UserSettings />
            </Tab.Pane>            
          </Tab.Content>
        </Col>
      </Row>
    </TabContainer>
  );
}

export function NaviItem({ icon, link, text ,hide}) {
  return (
    <Nav.Item bsPrefix="navi-item" className="mb-3" hidden={hide}>
      <Nav.Link bsPrefix="navi-link" className="py-4" eventKey={link}>
        <span className="navi-icon mr-3 font-size-h4"> {icon}</span>{" "}
        <span className="navi-text">{text}</span>
      </Nav.Link>
    </Nav.Item>
  );
}

