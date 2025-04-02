import _api from "../_api";
import Swal from "sweetalert2";

const _api_calls_company_country = {

    async _getAllCountries() {
      try {
        const { data } = await _api.get("/companyCountry");
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
        const { data } = await _api.get("/companyCountry/withIsos");
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
}

export default _api_calls_company_country;