import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import apiCalls from '../api/apiCalls';
import { Company } from '../models/apiModels';
import { DataLogin,DataRegister } from '../models/models';
import './style.css';

// RUTAS PÚLICAS
import PublicRoutes from './publicroutes/PublicRoutes';
import Home from './publicroutes/home/Home';
import Us from './publicroutes/us/Us';
import Blog from './publicroutes/blog/Blog';
import Contact from './publicroutes/contact/Contact';
import LogIn from './publicroutes/login/LogIn';
import SignIn from './publicroutes/signin/SignIn';
//import DetailProps, { loader as loaderProperty2 } from './layoutmain/detailprops/DetailProps';

// RUTAS PRIVADAS
import PrivateRoutes from './privateroutes/PrivateRoutes';
import CompanyRoutes from './privateroutes/companyroutes/CompanyRoutes';
import { CompanyAccount } from './privateroutes/companyroutes/companyaccount/CompanyAccount';
import Post from './privateroutes/companyroutes/post/Post';
import CompanyActivity from './privateroutes/companyroutes/companyactivity/CompanyActivity';
import Acquisitions from './privateroutes/companyroutes/acquisitions/Acquisitions';
//import SearchProp from './searchprop/SearchProp';
import LayoutAI from './ia/layoutai/LayoutAI';
import HomeAI from './ia/layoutai/homeai/HomeAI';

//CONTEXTO

interface CompanyContextType {
  isLoading: boolean;
  company: Company;
  isAuth: boolean;
  register: (dataRegister: DataRegister) => Promise<boolean>;
  login: (dataLogin: DataLogin) => Promise<boolean>;
  logout: () => Promise<void>;
  getCompany: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | null>(null);

interface CompanyProviderProps {
  children: ReactNode;
}

const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [company, setCompany] = useState<Company>({} as Company);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const register = async (dataRegister: DataRegister): Promise<boolean> => {
    const data = await apiCalls.apiCallsCompany._register(dataRegister);
    if (data) {
      setCompany(data);
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const login = async (dataLogin: DataLogin): Promise<boolean> => {
    const data = await apiCalls.apiCallsCompany._login(dataLogin);
    if (data) {
      setCompany(data);
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    await apiCalls.apiCallsCompany._logout();
    setCompany({} as Company);
    setIsAuth(false);
    window.location.href = "/";
  };

  const getCompany = async (): Promise<void> => {
    const data = await apiCalls.apiCallsCompany._getProfile();
    if (data) {
      setCompany(data);
      setIsAuth(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <CompanyContext.Provider value={{ isLoading, company, isAuth, register, login, logout, getCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

//HOOK USECOMPANY

const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyContext");
  }
  return context;
};

//RUTAS

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoutes />,
    children: [
      { index: true, element: <Home />, path: '/' },
      { element: <Us />, path: '/nosotros' },
      { element: <Blog />, path: '/blog' },
      { element: <Contact />, path: '/contacto' },
      //{ element: <DetailProps />, path: '/item/:idProperty', loader: loaderProperty2 },
      { element: <LogIn />, path: '/login' },
      { element: <SignIn />, path: '/signin' },
    ],
  },
  {
    path: '/company',
    element: (
      <PrivateRoutes>
        <CompanyRoutes />
      </PrivateRoutes>
    ),
    children: [
      { element: <CompanyAccount />, path: 'account', index: true },
      { element: <Post />, path: 'post' },
      { element: <CompanyActivity />, path: 'activity' },
      { element: <Acquisitions />, path: 'acquisitions' },
      { path: '*', element: <Navigate to="/company/account" replace /> },
    ],
  },
  /*
  {
    path: '/ia',
    element: <LayoutAI />,
    children: [
      { index: true, element: <HomeAI />, path: 'inicioia' },
      // { element: <MyActivity />, path: 'actividad' },
    ],
  },
  */
]);

//PROYECTO PRINCIPAL

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CompanyProvider>
      <RouterProvider router={router} />
    </CompanyProvider>
  </React.StrictMode>
);

export { useCompany };