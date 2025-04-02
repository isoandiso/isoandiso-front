import _api from "../_api";
import Swal from "sweetalert2";
import { Iso } from "src/models/apimodels/Iso";

const _api_calls_company_acquisition = {

    async _createAcquisition(isos:Iso[], acquisitionTypeId:string) {
      const acquisitionData = {
        isoIds: isos.map((iso) => iso._id),
        acquisitionTypeId: acquisitionTypeId,
        acquisitionDate: new Date().toISOString(),
        invoiceLink: null, // cambiarlo cuando se decida poner el link de la factura
      };
  
      try {
        const { data } = await _api.post("/companyAcquisition", acquisitionData);
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
}

export default _api_calls_company_acquisition;