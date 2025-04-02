import _api from "../_api";
import Swal from "sweetalert2";

const _api_calls_iso = {
    async _getAllIsos() {
      try {
        const { data } = await _api.get("/iso");
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
        const { data } = await _api.get(`/iso/byNameStartWith`, { params: { isoName } });
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
  
}

export default _api_calls_iso;