import React, { useReducer } from "react";

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
                };
            case "LOGOUT":
                localStorage.clear();
                clearAuthToken();
                return {
                    ...state,
                    user: null,
                    token: null,
                };
            default:
                return state;
        }
    };

    const userLocal =  JSON.parse(localStorage.getItem("user"));

    const localState = {
        ...initialState,
        user : userLocal,
    }

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
