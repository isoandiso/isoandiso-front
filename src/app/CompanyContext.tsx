import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import _api_calls_company from 'src/api/apicalls/_api_calls_company';
import { Company } from 'src/models/apimodels/Company';
import { CompanyDataLogin,CompanyDataRegister } from 'src/models/models';

interface CompanyContextType {
  isLoading: boolean;
  company: Company;
  isAuth: boolean;
  register: (dataRegister: CompanyDataRegister) => Promise<boolean>;
  login: (dataLogin: CompanyDataLogin) => Promise<boolean>;
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

  const register = async (dataRegister: CompanyDataRegister): Promise<boolean> => {
    const data = await _api_calls_company._register(dataRegister);
    if (data) {
      setCompany(data);
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const login = async (dataLogin: CompanyDataLogin): Promise<boolean> => {
    const data = await _api_calls_company._login(dataLogin);
    if (data) {
      setCompany(data);
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    await _api_calls_company._logout();
    setCompany({} as Company);
    setIsAuth(false);
    window.location.href = "/";
  };

  const getCompany = async (): Promise<void> => {
    const data = await _api_calls_company._getProfile();
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

const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyContext");
  }
  return context;
};

export { CompanyProvider, useCompany };