import _api from "../_api";

const _api_calls_rol = {

    async _getRols(){
      try {
          const { data } = await _api.get('/rol');
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

export default _api_calls_rol;