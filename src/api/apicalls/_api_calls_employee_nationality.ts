import _api from "../_api";
import Swal from "sweetalert2";

const _api_calls_employee_nationality = {

  async _getNationalities(){
    try {
        const { data } = await _api.get('/employeeNationality');
        return data;
      } catch (error) {
          console.error('Error al obtener las nacionalidades:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al obtener las nacionalidades',
            confirmButtonText: 'Entendido'
          });
    }
  },

}

export default _api_calls_employee_nationality;