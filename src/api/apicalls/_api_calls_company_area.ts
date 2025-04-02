import _api from "../_api";
import Swal from "sweetalert2";

const _api_calls_company_area = {

    async _createCompanyArea(name:string,charges:string[]){
      const areaData = {
        name: name,
        charges: charges
      };
      try {
          const { data } = await _api.post('/companyArea', areaData);
          return data;
        } catch (error) {
            console.error('Error al crear el área:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al crear el área',
              confirmButtonText: 'Entendido'
            });
      }
  },
  
  async _deleteCompanyArea(areaId:string) {
    try {
        await _api.delete(`/companyArea/${areaId}`);
        await Swal.fire({
            icon: 'success',
            text: 'Área eliminada correctamente',
            confirmButtonText: 'Entendido'
        });
      } catch (error) {
          console.error('Error al intentar eliminar el área:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al intentar eliminar el área',
            confirmButtonText: 'Entendido'
          });
    }
  },
  
  async _deleteIsosOfArea(areaId:string) {
    try {
        await _api.delete(`/companyArea/${areaId}/deleteIsos`);
        await Swal.fire({
            icon: 'success',
            text: 'Isos eliminadas del área correctamente',
            confirmButtonText: 'Entendido'
        });
      } catch (error) {
          console.error('Error al intentar eliminar las isos del área:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al intentar eliminar las isos del área',
            confirmButtonText: 'Entendido'
          });
    }
  },
  
  async _deleteEmployeeOfArea(areaId:string) {
    try {
        await _api.delete(`/companyArea/${areaId}/deleteEmployee`);
        await Swal.fire({
            icon: 'success',
            text: 'Trabajador eliminado del área correctamente',
            confirmButtonText: 'Entendido'
        });
      } catch (error) {
          console.error('Error al intentar eliminar el trabajador del área:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al intentar eliminar el trabajador del área',
            confirmButtonText: 'Entendido'
          });
    }
  },
  
  async _addIso(areaId:string,isoId:string) {
    try {
      const { data } = await _api.put(`/companyArea/${areaId}/addIso`, { isoId: isoId });
      return data;
    } catch (error) {
        console.error('Error al agregar la isos al área:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al agregar la isos al área',
          confirmButtonText: 'Entendido'
        });
    }
  },
  
  async _updateResponsibleEmployee(areaId:string,responsibleEmployeeId:string) {
    try {
      const { data } = await _api.put(`/companyArea/${areaId}/updateResponsibleEmployee`, { responsibleEmployeeId: responsibleEmployeeId });
      return data;
    } catch (error) {
      console.error("Error al actualizar el trabajador responsable del área:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al actualizar el trabajador responsable del área`,
        confirmButtonText: "Entendido",
      });
    }
  }
  
}

export default _api_calls_company_area;