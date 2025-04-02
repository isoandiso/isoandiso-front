import _api from "../_api";
import Swal from "sweetalert2";

const _api_calls_company_acquisition_type = {
  async _getCompanyAcquisitionsTypes() {
    try {
      const { data } = await _api.get("/companyAcquisitionType");
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
}

export default _api_calls_company_acquisition_type;