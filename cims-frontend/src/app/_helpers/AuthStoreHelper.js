import React from "react";
import { AuthContext } from "../pages/auth/AuthProvider";

const AuthStores = () => {
  const { state: authState } = React.useContext(AuthContext);
  return authState.user.authStores;
};

export const authStores = (stores = AuthStores()) => {
  let searchStores = stores.map((store) => store.id);
  if (searchStores.length > 0 && searchStores.length != null) {
    return `&stockStore.in=${searchStores.join(`&stockStore.in=`)}`;
  }
};

export const authStoresEquals = (stores = AuthStores()) => {
  let searchStores = stores.map((store) => store.id);
  if (searchStores.length > 0 && searchStores.length != null) {
    return `&storeId=${searchStores.join(`&storeId=`)}`;
  }
};

export const authStoreList = () => {
  return AuthStores();
};
