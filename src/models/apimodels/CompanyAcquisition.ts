import { CompanyAcquisitionType } from "./CompanyAcquisitionType";

//CompanyAcquisition

export interface CompanyAcquisition {
    _id: string;
    isoIds:Iso[];
    acquisitionTypeId:CompanyAcquisitionType;
    acquisitionDate:Date;
    expirationDate:Date | null;
    invoiceLink: string | null; 
};