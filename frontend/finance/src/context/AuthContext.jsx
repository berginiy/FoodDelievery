import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст
const AuthContext = createContext();

// Хук для использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};

// Поставщик контекста для аутентификации
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Состояние пользователя

    // Проверка наличия токена в localStorage при загрузке страницы
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Если токен есть, обновляем состояние пользователя
            setUser({ token });
        }
    }, []);

    const signIn = (userData) => {
        setUser(userData); // Обновляем пользователя после входа
    };

    const signOut = () => {
        setUser(null); // Очищаем пользователя при выходе
        localStorage.removeItem("token"); // Удаляем токен
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
