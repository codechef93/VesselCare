import React from "react";
import { Link, withRouter } from "react-router-dom";
import brandLogo from "./assets/brand-logo/vesselcare_logo.png";
import assetUser from "./assets/icons/userAccount-img.png";
import { Row, Col, Container, Navbar, Dropdown } from "react-bootstrap";
import NavigationBar from "./components/Navbar";

import "./scss/styles.scss";
import "./scss/header.scss";

import { withLayoutManager } from "./Helper/Layout/layout";

import { withAuthManager } from "./Helper/Auth/auth";

import { withMsal } from "@azure/msal-react";

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const msalInstance = this.props.msalContext.instance;
    return (
      <header>
        <div className="menu-bar">
          <Container fluid>
            <Row>
              <Col xs={7} sm={7}>
                <Row>
                  <Col className="d-xl-none">
                    <div className="hamburger-wrapper">
                      <input id="menuToggler" type="checkbox" />
                      <span className="hamb-line"></span>
                      <span className="hamb-line"></span>
                      <span className="hamb-line"></span>
                      <div className="slide-navbar">
                        <NavigationBar />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="brand-logo">
                      <Link to="/" className="nav-link">
                        <img
                          src={brandLogo}
                          className="d-inline-block align-middle img-fluid"
                          alt="brand logo"
                        />
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col xs={5} sm={5}>
                <img
                  className="img-fluid user-avtar"
                  src={assetUser}
                  alt="User Icon"
                  onClick={() => {
                    msalInstance.logout();
                    localStorage.removeItem("authenticationToken");
                  }}
                />
                {/* <Dropdown>
                  <img className="img-fluid" src={assetUser} alt="User Icon" />
                  <Dropdown.Toggle id="dropdown-logout">
                    Asian Lift
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#"
                      onClick={() => {
                        msalInstance.logout();
                        localStorage.removeItem("authenticationToken");
                        // logout(()=> {
                        //     window.location.href = "/login"
                        // })
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </Col>
            </Row>
          </Container>
        </div>
        <div className="main-nav">
          <NavigationBar />
        </div>
      </header>
    );
  }
}

export default withMsal(withAuthManager(withLayoutManager(withRouter(Header))));
