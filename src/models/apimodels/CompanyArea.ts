import { Employee } from "./Employee";
import { Iso } from "./Iso";

//CompanyArea

export interface CompanyArea {
    _id: string;
    name: string;
    charges: string[];
    isoIds:Iso[] | null;
    responsibleEmployeeId: Employee| null;
};