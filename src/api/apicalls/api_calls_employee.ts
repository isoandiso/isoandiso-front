import { AxiosError } from 'axios';
import _api from "../_api";

const _api_calls_employee = {

    async _getEmployeeByEmail(email:string) {
        try {
          const { data } = await _api.get(`/employee/getCompanyEmployeeByEmail/${encodeURIComponent(email)}`);
          return data;
        } 
        catch (error) {
          console.error((((error as AxiosError).response?.data as object) as any).message || `Error al intentar obtener el empleado con dicho email`);
          return null;
        }
      },

}

export default _api_calls_employee;