import React, { createContext, useEffect, useState } from "react";
import api from "../settings/api";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const register = async (data, setErrores) => {
    try {
      const response = await api.post('/company/register', data);
      setUser(response.data);
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
      const response = await api.post('/company/login', data);
      setUser(response.data);
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
      await api.post('/company/logout');
      setUser({});
      setIsAuth(false);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  /*este "getuser" es más que nada para que cuando el usuario recargue la página vuelva a agarrar los datos del usuario
   y lo ponga en la variable de estado user si es que no se deslogueo todavía, ya que al recargar la página se pierden 
   los datos entonces este getUser los agarra de nuevo para los demás componentes que usan el "user"*/
  const getUser = async () => {
    try {
      const response = await api.get('/company/profile');
      if (response.status === 200) {
        setUser(response.data);
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Error fetching user:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        register,
        isAuth,
        logout,
        login,
        user,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };