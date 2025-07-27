import { Employee } from "./Employee";
import { Iso } from "./Iso";
import { Company } from "./Company";

//CompanyArea

export interface CompanyArea {
    _id: string;
    name: string;
    charges: string[];
    isoIds:Iso[] | null;
    employeeId: Employee| null;
    companyId: Company| null;
};