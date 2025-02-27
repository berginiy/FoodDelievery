import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signIn = (tokenData) => {
        setUser({ token: tokenData.token });
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    const value = {
        user,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};