import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCompany } from "../../main";

interface FormInputs {
  email: string;
  password: string;
}

function LogIn() {
  const navigate = useNavigate();
  const { login } = useCompany();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const inicioDeSesionExitoso = await login({
      email: data.email,
      password: data.password,
    });

    if (inicioDeSesionExitoso) {
      navigate("/company/acquisitions");
    }
  };

  return (
    <div className="min-h-full flex justify-center items-center mx-auto md:px-6 py-5 md:py-12 lg:px-8">
      <div className="bg-white bg-opacity-100 ml-4 mr-4 mb-10 p-6 w-full rounded max-w-3xl font-urbanist flex flex-row justify-center space-x-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 text-black font-ubuntu">
            Iniciar sesión
          </h2>

          <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
            {/* Campo Email */}
            <div className="col-span-full">
              <label
                htmlFor="loginEmail"
                className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
              >
                <input
                  id="loginEmail"
                  type="email"
                  {...register("email", {
                    required: "El correo electrónico es requerido",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Formato de correo electrónico no válido",
                    },
                  })}
                  className="p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  placeholder="Correo Electrónico"
                />
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                  Correo Electrónico
                </span>
              </label>
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            {/* Campo Contraseña */}
            <div className="col-span-full">
              <label
                htmlFor="loginPassword"
                className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
              >
                <input
                  id="loginPassword"
                  type="password"
                  {...register("password", { required: "Ingresa tu contraseña" })}
                  className="p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  placeholder="Contraseña"
                />
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                  Contraseña
                </span>
              </label>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            {/* Botón de envío */}
            <div>
              <button
                type="submit"
                className="w-full justify-center bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
              >
                Ingresar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-black">
            ¿No es un miembro?{" "}
            <Link to="/signin" className="font-semibold leading-6 text-green-500 hover:text-sky-800">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;