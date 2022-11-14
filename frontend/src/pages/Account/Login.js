import React from "react";
import { Container, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { MessageContext } from "../../Helper/Message/MessageRenderer";
import { loginRequest } from "../Account/authConfig";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import sidebarItemsCLMS from "../../assets/brand-logo/vesselcare_logo_brand.png";

import "../../scss/login.scss";

const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const handleADLogin = (setUser) => {
    instance.loginRedirect(loginRequest);
  };

  const handleADLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <div className="login-home login-wrapper">
      <Container>
        <div className="login-brand">
          <img src={sidebarItemsCLMS} alt="Brand" />
        </div>
        <div className="login-btn-wrapper">
          <Button onClick={() => handleADLogin()} variant="danger">
            Sign In
          </Button>
        </div>
      </Container>
    </div>
  );
};

class LoginPageWrapper extends React.Component {
  render() {
    return (
      <MessageContext.Consumer>
        {({ messages, setMessages }) => {
          return <Login setMessages={setMessages} {...this.props}></Login>;
        }}
      </MessageContext.Consumer>
    );
  }
}

// export default withRouter(LoginPageWrapper);
export default Login;
