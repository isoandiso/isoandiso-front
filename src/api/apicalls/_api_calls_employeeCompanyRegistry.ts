import Swal from "sweetalert2";
import { AxiosError } from 'axios';
import _api from "../_api";
import { Company } from "../../models/apimodels/Company";

const _api_calls_employeeCompanyRegistry = {

    async getCompaniesOfEmployee(employeeEmail:string): Promise<Company[] | null> {
      try {
        const { data } = await _api.get(`/employeeCompanyRegistry/getCompaniesOfEmployee/${encodeURIComponent(employeeEmail)}`);
        return data;
      } 
      catch (error) {
        console.error((((error as AxiosError).response?.data as object) as any).message || (error as AxiosError).message);
        return null;
      }
    },

}

export default _api_calls_employeeCompanyRegistry;