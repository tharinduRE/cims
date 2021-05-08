import React, { useReducer } from "react";
import { toast } from 'react-toastify';

export const AuthContext = React.createContext();

const AUTH_TOKEN_KEY = "authToken";

const AuthProvider = ({ children }) => {
  const initialState = {
    user: null,
    token: null,
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          message:{
            type:"success",
            message:"Login success"
          }
        };
      case "LOGOUT":
        localStorage.clear();
        clearAuthToken();
        return {
          ...state,
          user: null,
          token: null,
          message:{
            type:"success",
            message:"Logout success"
          }
        };
      case "UPDATE":
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        return {
          ...state,
          user: action.payload.user,
          message:{
            type:"success",
            message:"User Updated"
          }
        };
      case "ERROR":
        toast.error(action.payload.errorMessage);
        return {
          ...state,
          message:{
            type:"error",
            message:action.payload.errorMessage
          }
        };

      default:
        return state;
    }
  };

  const userLocal = JSON.parse(localStorage.getItem("user"));

  const localState = {
    ...initialState,
    user: userLocal,
  };

  const [state, dispatch] = useReducer(authReducer, localState || initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export const clearAuthToken = () => {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
  if (sessionStorage.getItem(AUTH_TOKEN_KEY)) {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export default AuthProvider;
