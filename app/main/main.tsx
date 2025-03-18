import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './style.css';

// Rutas
import LayoutMain from './layoutmain/LayoutMain';
import Home from './layoutmain/home/Home';
import Us from './layoutmain/us/Us';
import Blog from './layoutmain/blog/Blog';
import Contact from './layoutmain/contact/Contact';
//import DetailProps, { loader as loaderProperty2 } from './layoutmain/detailprops/DetailProps';
import LogIn from './layoutmain/login/LogIn';
import SignIn from './layoutmain/signin/SignIn';
import ProtectedRoutes from './protectedroutes/ProtectedRoutes';
import LayoutCompany from './protectedroutes/layoutcompany/LayoutCompany';
import { CompanyAccount } from './protectedroutes/layoutcompany/companyaccount/CompanyAccount';
import Post from './protectedroutes/layoutcompany/post/Post';
import CompanyActivity from './protectedroutes/layoutcompany/companyactivity/CompanyActivity';
import Acquisitions from './protectedroutes/layoutcompany/acquisitions/Acquisitions';
//import SearchProp from './searchprop/SearchProp';
import LayoutAI from './ia/layoutai/LayoutAI';
import HomeAI from './ia/layoutai/homeai/HomeAI';
import apiCalls from '../api/apiCalls';
import { Company } from '../models/apiModels';
import { DataLogin,DataRegister } from '../models/models';

//CONTEXTO

interface CompanyContextType {
  isLoading: boolean;
  company: Company | null;
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
  const [company, setCompany] = useState<Company | null>(null);
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
    setCompany(null);
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
    element: <LayoutMain />,
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
      <ProtectedRoutes>
        <LayoutCompany />
      </ProtectedRoutes>
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