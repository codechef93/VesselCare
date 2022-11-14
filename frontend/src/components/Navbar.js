import React from "react";
import { Link, useNavigate } from "react-router-dom";
import vesselCareLogo from "../assets/VesselCare-Lite_logo/2x/logo.png";
import contactUsLogo from "../assets/Keppel_ContactUs_Media.png";
import profileLogo from "../assets/Keppel_User_Media.png";
import assetMain from "../assets/icons/assetMaint-icon.png";
import analyIcon from "../assets/icons/analy-icon.png";
import assetMan from "../assets/icons/assetMan-icon.png";
import assetMo from "../assets/icons/EnhMo-icon.png";
import assetOpt from "../assets/icons/OpOptim-icon.png";
import homeIcon from "../assets/icons/homeIcon.png";
import assetUser from "../assets/icons/userAccount-img.png";
import {
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";

const NavigationBar = () => {
  let navData = {
    assetMain: "../assets/icons/assetMaint-icon.png",
    analyIcon: "../assets/icons/analy-icon.png",
    assetMan: "../assets/icons/assetMan-icon.png",
    assetMo: "../assets/icons/EnhMo-icon.png",
    assetOpt: "../assets/icons/OpOptim-icon.png",
    homeIcon: "../assets/icons/homeIcon.png",
  };

  return (
    <Navbar variant="transparent" expand={true}>
      <Container fluid>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Row>
              <Col className="nav-items">
                <div className="nav-module">
                  <div className="nav-content">
                    <div className="nav-content-img">
                      <img
                        className="img-fluid"
                        src={homeIcon}
                        alt="Nav Icons"
                      />
                    </div>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </div>
                </div>
              </Col>
              <Col className="nav-items">
                <div className="nav-module">
                  <div className="nav-content">
                    <div className="nav-content-img">
                      <img
                        className="img-fluid"
                        src={assetMain}
                        alt="Nav Icons"
                      />
                    </div>
                    <Link to="#" className="nav-link disabled" disabled>
                      Asset Maintenance
                    </Link>
                  </div>
                </div>
              </Col>
              <Col className="nav-items">
                <div className="nav-module">
                  <div className="nav-content">
                    <div className="nav-content-img">
                      <img
                        className="img-fluid"
                        src={assetMan}
                        alt="Nav Icons"
                      />
                    </div>
                    <Link to="/assetmanagement" className="nav-link">
                      Asset Management
                    </Link>
                  </div>
                </div>
              </Col>
              <Col className="nav-items">
                <div className="nav-module">
                  <div className="nav-content">
                    <div className="nav-content-img">
                      <img
                        className="img-fluid"
                        src={assetOpt}
                        alt="Nav Icons"
                      />
                    </div>
                    <Link to="#" className="nav-link disabled" disabled>
                      Analytics
                    </Link>
                  </div>
                </div>
              </Col>
              <Col className="nav-items">
                <div className="nav-module">
                  <div className="nav-content">
                    <div className="nav-content-img">
                      <img
                        className="img-fluid"
                        src={assetMo}
                        alt="Nav Icons"
                      />
                    </div>
                    <Link to="/operation" className="nav-link">
                      Operation
                    </Link>
                  </div>
                </div>
              </Col>
              <Col className="nav-items">
                <div className="nav-module">
                  <div className="nav-content">
                    <div className="nav-content-img">
                      <img
                        className="img-fluid"
                        src={analyIcon}
                        alt="Nav Icons"
                      />
                    </div>
                    <Link to="#" className="nav-link disabled" disabled>
                      Enhance Monitoring
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
