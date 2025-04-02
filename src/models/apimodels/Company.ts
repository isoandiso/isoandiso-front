import { CompanyCountry } from "./CompanyCountry";
import { CompanyAcquisition } from "./CompanyAcquisition";
import { CompanySite } from "./CompanySite";
import { CompanyArea } from "./CompanyArea";

//Company

export interface Company {
    _id: string;
    email: string;
    phone: string;
    password?: string;
    ruc: string | null;
    socialReason: string | null;
    countryId: CompanyCountry | null;
    province: string | null;
    city: string | null;
    address: string | null;
    economicActivity: string | null;
    economicSector: string | null;
    companySize: 'Micro' | 'Pequeña' | 'Mediana' | 'Grande' | null;
    acquisitionIds: CompanyAcquisition[];
    siteIds: CompanySite[] | null;
    areaIds: CompanyArea[] | null;
    createdAt?: string;
    updatedAt?: string;
}