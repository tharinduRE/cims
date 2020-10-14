import React, { useReducer } from "react";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const initialState = {
        user: null,
        token: null,
    };

    const authReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", JSON.stringify(action.payload.token));
                return {
                    ...state,
                    user: action.payload.user,
                    token: action.payload.token,
                };
            case "LOGOUT":
                localStorage.clear();
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

export default AuthProvider;
