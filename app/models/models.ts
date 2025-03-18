import { ReactNode } from "react";
import { Company } from "../models/apiModels"

export interface DataRegister {
    email:string,
    phone:string,
    password:string,
}
  
export interface DataLogin {
    email:string,
    password:string,
}

export interface AuthContextProps {
isLoading: boolean;
company: Company | null;
isAuth: boolean;
register: (data: DataRegister, setError: (error: string) => void) => Promise<boolean>;
login: (data: DataLogin, setError: (error: string) => void) => Promise<boolean>;
logout: () => Promise<void>;
getCompany: () => Promise<void>;
}

export interface CompanyProviderProps {
children: ReactNode;
}