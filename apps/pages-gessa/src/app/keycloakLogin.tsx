import React, { useEffect, useState } from 'react';
import keycloakData, { keycloakConfig } from '../keycloak/keycloak';


export function KeycloakLogin({ children }: any) {
  const [initKeycloak, setInitKeycloak] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const newUrl = window.location.href.replace("#", "");
    var url = new URL(newUrl);
    var realm = url.searchParams.get("realm");
    keycloakConfig.realm = realm || keycloakConfig.realm;
    keycloakData.init({ onLoad: 'login-required' }).then((authenticated) => {
      setInitKeycloak(keycloakData);
      setIsAuth(authenticated);
    });
  }, []);

  if (initKeycloak) {
    if (isAuth) return children;
    else return <div>Loading Keycloak...</div>;
  }
  return <div>Initializing Keycloak...</div>;
}

export default KeycloakLogin;