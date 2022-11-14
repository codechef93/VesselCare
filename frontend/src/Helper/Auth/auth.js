import React, { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import Model from "../../model/Model";
const AuthContext = React.createContext();
const useAuth = () => React.useContext(AuthContext);
const api = new Model();
function AuthProvider(props) {
  const [user, setUser] = useState({ authKey: null, projects: [] });
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: ["User.Read"],
          account: account,
        })
        .then((response) => {
          if (response) {
            localStorage.setItem("authenticationToken", response.idToken);
            setUser({ authKey: response.idToken, projects: [] });
            getUserData();
          }
        });
    }
  }, [account, instance]);
  const getUserData = () => {
    api.postReq("/getuserdata", {}, (data, err) => {
      if (data != null && data.value) {
        if (data.success) {
          setUser((prevUser) => ({
            ...prevUser,
            projects: data.value.projects,
          }));
        }
      }
    });
  };
  return (
    <AuthContext.Provider value={{ user, setUser }} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
}

function authenticate(username, isPublic, callback) {
  console.log("username--", username);
}

function logout(callback) {
  localStorage.removeItem("authenticationToken");
  callback(true);
}
function withAuthManager(Component) {
  const C = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
      <AuthContext.Consumer>
        {(context) => {
          return (
            <Component
              {...remainingProps}
              {...context}
              user={context.user}
              ref={wrappedComponentRef}
            />
          );
        }}
      </AuthContext.Consumer>
    );
  };
  C.WrappedComponent = Component;
  return C;
}

export {
  AuthProvider,
  useAuth,
  AuthContext,
  authenticate,
  logout,
  withAuthManager,
};
