import { AxiosError } from 'axios';
import api from "./api";
import Swal from "sweetalert2";
import { Employee, Iso } from "../models/apiModels"
import { DataRegister,DataLogin } from "../models/models";

const apiCalls = {

apiCallsCompany : {

  async _register(dataRegister: DataRegister) {
    try {
      const { data } = await api.post('/company/register', dataRegister);
      await Swal.fire({
        icon: 'success',
        text: "Registro exitoso",
      });
      return data;
    } catch (error) {
      console.error("Error al intentar registrarse:", error);
      const axiosError = error as AxiosError;
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: axiosError.message || `Error al intentar registrarse`,
        confirmButtonText: "Entendido",
      });
    }
  },

  async _login(dataLogin: DataLogin) {
    try {
      const { data } = await api.post('/company/login', dataLogin);
      await Swal.fire({
        icon: 'success',
        text: "Inicio de sesión exitoso",
      })
      return data;
    } catch (error) {
      console.error("Error al intentar registrarse:", error);
      const axiosError = error as AxiosError;
      await Swal.fire({
        icon: 'error',
        title: "Error",
        text: axiosError.message || "Error en el inicio de sesión. Verifique los datos ingresados.",
        confirmButtonText: "Entendido",
      });
    }
  },

  async _logout() {
    try {
      await api.post('/company/logout');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al cerrar sesión`,
        confirmButtonText: "Entendido",
      });
    }
  },

  async _getProfile() {
    try {
      const { data } = await api.get('/company/profile');
      return data;
    } catch (error) {
      console.error("Error al intentar obtener el perfil del usuario:", error);
    }
  },

  async _updateCompanyCountry(companyId:string, countryId:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateCountry`, {
        countryId: countryId,
      });
      return data;
    } catch (error) {
      console.error("Error al intentar actualizar el país de la empresa:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al actualizar el país de la empresa`,
        confirmButtonText: "Entendido",
      });
    }
  },

  async _addAcquisitionIdToCompany(companyId:string, acquisitionId:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/addAcquisition`, {
        acquisitionId,
      });
      return data;
    } catch (error) {
      console.error("Error al agregar la adquisición a la empresa:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al agregar la adquisición a la empresa`,
        confirmButtonText: "Entendido",
      });
    }
  },

  async _updateRuc(companyId:string,ruc:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateRuc`, { ruc: ruc });
      return data;
    } catch (error) {
        console.error('Error al actualizar el ruc de la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar el ruc de la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _updateSocialReason(companyId:string,socialReason:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateSocialReason`, { socialReason: socialReason });
      return data;
    } catch (error) {
        console.error('Error al actualizar la razón social de la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar la razón social de la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _updateProvince(companyId:string,province:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateProvince`, { province: province });
      return data;
    } catch (error) {
        console.error('Error al actualizar la provincia de la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar la provincia de la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _updateCity(companyId:string,city:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateCity`, { city: city });
      return data;
    } catch (error) {
        console.error('Error al actualizar la ciudad de la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar la ciudad de la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _updateAddress(companyId:string,address:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateAddress`, { address: address });
      return data;
    } catch (error) {
        console.error('Error al actualizar la dirección de la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar la dirección de la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _updateEconomicActivity(companyId:string,economicActivity:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateEconomicActivity`, { economicActivity: economicActivity });
      return data;
    } catch (error) {
        console.error('Error al actualizar la actividad económica de la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar la actividad económica de la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _updateEconomicSector(companyId:string,economicSector:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateEconomicSector`, { economicSector: economicSector });
      return data;
    } catch (error) {
        console.error('Error al actualizar el sector económico de la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar el sector económico de la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _updateCompanySize(companyId:string,companySize:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/updateCompanySize`, { companySize: companySize });
      return data;
    } catch (error) {
        console.error('Error al actualizar el tamaño de la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar el tamaño de la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _addSedeIdToCompany(companyId:string,companySiteId:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/addSite`, { companySiteId: companySiteId });
      return data;
    } catch (error) {
        console.error('Error al agregar la sede a la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al agregar la sede a la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _addAreaIdToCompany(companyId:string,companyAreaId:string) {
    try {
      const { data } = await api.put(`/company/${companyId}/addArea`, { companyAreaId: companyAreaId });
      return data;
    } catch (error) {
        console.error('Error al agregar el área a la empresa:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al agregar el área a la empresa',
          confirmButtonText: 'Entendido'
        });
    }
  },

  async _createEmployee(employeeData:Employee){
    try {
        const { _id, ...dataToSend } = employeeData; // quitamos el campo "_id" porque éste se creará automáticamente en la base de datos
        const { data } = await api.post('/company/createEmployee', dataToSend);
        return data;
      } catch (error) {
          console.error('Error al crear el trabajador:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear el trabajador',
            confirmButtonText: 'Entendido'
          });
    }
  },

},

apiCallsCompanyCountry : {
  async _getAllCountries() {
    try {
      const { data } = await api.get("/companyCountry");
      return data;
    } catch (error) {
      console.error("Error al obtener los países:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al obtener los países`,
        confirmButtonText: "Entendido",
      });
    }
  },

  async _getAllCountriesWithIsos() {
    try {
      const { data } = await api.get("/companyCountry/withIsos");
      return data;
    } catch (error) {
      console.error("Error al obtener los países con isos:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al obtener los países con isos`,
        confirmButtonText: "Entendido",
      });
    }
  },
},

apiCallsIso : {
  async _getAllIsos() {
    try {
      const { data } = await api.get("/iso");
      return data;
    } catch (error) {
      console.error("Error al obtener las isos:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al obtener las isos`,
        confirmButtonText: "Entendido",
      });
    }
  },

  async _getIsoByNameStartWith(isoName:string) {
    try {
      const { data } = await api.get(`/iso/byNameStartWith`, { params: { isoName } });
      return data;
    } catch (error) {
      console.error("Error al obtener la iso con dicho nombre comenzando con ...:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al obtener la iso con dicho nombre  comenzando con ...`,
        confirmButtonText: "Entendido",
      });
    }
  },

},

apiCallsCompanyAcquisitionType : {
  async _getCompanyAcquisitionsTypes() {
    try {
      const { data } = await api.get("/companyAcquisitionType");
      return data;
    } catch (error) {
      console.error("Error al obtener los tipos de adquisiciones:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al obtener los tipos de adquisiciones`,
        confirmButtonText: "Entendido",
      });
    }
  },
},

apiCallsCompanyAcquisition : {
  async _createAcquisition(isos:Iso[], acquisitionTypeId:string) {
    const acquisitionData = {
      isoIds: isos.map((iso) => iso._id),
      acquisitionTypeId: acquisitionTypeId,
      acquisitionDate: new Date().toISOString(),
      invoiceLink: null, // cambiarlo cuando se decida poner el link de la factura
    };

    try {
      const { data } = await api.post("/companyAcquisition", acquisitionData);
      return data;
    } catch (error) {
      console.error("Error al crear la adquisición:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al crear la adquisición`,
        confirmButtonText: "Entendido",
      });
    }
  },
},

apiCallsCompanySite : {
  async _createCompanySite(name:string,address:string,city:string,province:string) {
    const sedeData = {
        name: name,
        address: address,
        city: city,
        province: province
    };
    try {
        const { data } = await api.post('/companySite', sedeData);
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
          await api.delete(`/companySite/${siteId}`);
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
},

apiCallsCompanyArea : {

  async _createCompanyArea(name:string,charges:string[]){
    const areaData = {
      name: name,
      charges: charges
    };
    try {
        const { data } = await api.post('/companyArea', areaData);
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
      await api.delete(`/companyArea/${areaId}`);
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
      await api.delete(`/companyArea/${areaId}/deleteIsos`);
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
      await api.delete(`/companyArea/${areaId}/deleteEmployee`);
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
    const { data } = await api.put(`/companyArea/${areaId}/addIso`, { isoId: isoId });
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
    const { data } = await api.put(`/companyArea/${areaId}/updateResponsibleEmployee`, { responsibleEmployeeId: responsibleEmployeeId });
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

},

apiCallsEmployeeNationality : {
  async _getNationalities(){
    try {
        const { data } = await api.get('/employeeNationality');
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

},

apiCallsRol : {
  async _getRols(){
    try {
        const { data } = await api.get('/rol');
        return data;
      } catch (error) {
          console.error('Error al obtener los roles:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al obtener los roles',
            confirmButtonText: 'Entendido'
          });
    }
  },
}

}

export default apiCalls;