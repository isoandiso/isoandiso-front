import _api from "../_api";
import Swal from "sweetalert2";

const _api_calls_company_site = {

    async _createCompanySite(name:string,address:string,city:string,province:string) {
      const sedeData = {
          name: name,
          address: address,
          city: city,
          province: province
      };
      try {
          const { data } = await _api.post(`/companySite`, sedeData);
          return data;
        } catch (error) {
            console.error('Error al crear la sede:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al crear la sede',
              confirmButtonText: 'Entendido'
            });
      }
    },
  
    async _deleteCompanySite(siteId:string) {
        try {
            await _api.delete(`/companySite/${siteId}`);
            await Swal.fire({
                icon: 'success',
                text: 'Sede eliminada correctamente',
                confirmButtonText: 'Entendido'
            });
          } catch (error) {
              console.error('Error al intentar eliminar la sede:', error);
              await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al intentar eliminar la sede',
                confirmButtonText: 'Entendido'
              });
        }
    },
}

export default _api_calls_company_site;