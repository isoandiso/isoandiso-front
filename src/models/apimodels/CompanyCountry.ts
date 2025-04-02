import { Iso } from "./Iso";

//CompanyCountry

export interface CompanyCountry {
    _id: string;
    name: string;
    isoIds: (Iso|null)[]; 
};