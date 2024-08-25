import React, { createContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import api from "../settings/api";
import useSWR from "swr";
import Swal from "sweetalert2";

const UserContext = createContext();

const UserProvider = ({ children }) => {


    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem('AUTH_TOKEN_PROPIA') ? true : false
    );

    // funciones de authenticación
    const register = async (data, setErrores) => {
        try {
            const response = await api.post('/auth/register/', data);
            const { data: user } = response
            if (user && user.token) {
                localStorage.setItem('AUTH_TOKEN_PROPIA', user.token);
                setUser(user);
                setIsAuth(true);
                return true;
            }
        } catch (error) {
            if (error.response) {
                setErrores(Object.values(error.response.data))
            }

            return false
        };
    }
    const login = async (data, setError) => {
        try {
            const response = await api.post('/auth/login/', data)
            const { data: user } = response

            if (user && user.token) {
                localStorage.setItem('AUTH_TOKEN_PROPIA', user.token);
                setUser(user);
                setIsAuth(true);
                return true;
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error)

            }
        }
    }

    const logout = async () => {
        const token = localStorage.getItem('AUTH_TOKEN_PROPIA');
        try {
            const response = await api.post('/auth/logout/', {}, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (response.status == 200) {
                localStorage.removeItem("AUTH_TOKEN_PROPIA");
                setIsAuth(false)

            }
        } catch (error) {
            console.error(error)
        };
    }

    // funcion para obtener al usurio authenticado
    const getUser = async () => {
        const token = localStorage.getItem('AUTH_TOKEN_PROPIA');
        try {
            const response = await api.get('/auth/profile/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (response.status === 200) {
                const data = response.data;
                setUser(data);
            } else {
                console.error(`Error al obtener el usuario: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }
    };

    useEffect(() => {
        getUser()
    }, [])

    return (
        <UserContext.Provider
            value={{
                register,
                isAuth,
                logout,
                login,
                user
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
