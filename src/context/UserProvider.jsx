import React, { createContext, useEffect, useState } from "react";
import api from "../settings/api";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const register = async (data, setErrores) => {
    try {
      const response = await api.post('/empresa/register', data);
      const { data: user } = response;
      setUser(user);
      setIsAuth(true);
      return true;
    } catch (error) {
      if (error.response) {
        setErrores(Object.values(error.response.data));
      }
      return false;
    }
  };

  const login = async (data, setError) => {
    try {
      const response = await api.post('/empresa/login', data);
      const { data: user } = response;
      setUser(user);
      setIsAuth(true);
      return true;
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      }
    }
  };

  const logout = async () => {
    try {
      await api.post('/empresa/logout');
      setIsAuth(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await api.get('/empresa/profile');
      if (response.status === 200) {
        const data = response.data;
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        register,
        isAuth,
        logout,
        login,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };