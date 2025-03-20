import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useCompany } from "src/app/CompanyContext";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

function SignIn() {
  const navigate = useNavigate();
  const { register } = useCompany();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const password = watch("password");
  const [terminos, setTerminos] = useState(false);

  const onSubmit = async (data: FormInputs) => {
    if (!terminos) {
      await Swal.fire({
        icon: "error",
        text: "Necesitas aceptar nuestros términos y condiciones",
      });
      return;
    }

    const registroExitoso = await register({
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    if (registroExitoso) {
      navigate("/company/acquisitions");
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto md:px-6 py-5 md:py-12 lg:px-8" style={{ backgroundImage: "url('/img/dep1.jpeg')" }}>
      <div className="bg-white items-center rounded bg-opacity-100 ml-4 mr-4 mb-8 p-6 font-urbanist flex flex-row justify-center space-x-8 w-full max-w-4xl">
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-6 mb-5 text-center text-2xl font-bold leading-9  text-black font-ubuntu ">
                  Nuevo registro
              </h2>
          </div>

          <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="col-span-full">
                <label
                    htmlFor="signInEmail"
                    className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                >
                    {/* Email */}
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "El correo electrónico es obligatorio",
                        maxLength: { value: 100, message: "Máximo 100 caracteres" },
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Formato de correo no válido",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="signInEmail"
                          type="email"
                          placeholder="Correo electrónico"
                          className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : ''}`}
                        />
                      )}
                    />
                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                        Ingrese su email
                    </span>
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </label>
            </div>
            <div id="celular" className="col-span-full">
                <label
                    htmlFor="signInPhone"
                    className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                >
                    {/* Teléfono */}
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "El número es obligatorio",
                        minLength: { value: 9, message: "Debe tener al menos 9 dígitos" },
                        maxLength: { value: 15, message: "Máximo 15 dígitos" },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="signInPhone"
                          type="text"
                          placeholder="Número celular"
                          inputMode="numeric"
                          className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.phone ? 'ring-red-500' : ''}`}
                          onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, "");
                            field.onChange(input.value);
                          }}
                        />
                      )}
                    />
                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                        Número celular
                    </span>
                    {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </label>
            </div>
            <div className="col-span-full">
                <label
                    htmlFor="signInPassword"
                    className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                >
                    {/* Contraseña */}
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{ required: "La contraseña es obligatoria", minLength: { value: 8, message: "Mínimo 8 caracteres" }, maxLength: { value: 20, message: "Máximo 20 caracteres" } }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="signInPassword"
                          type="password"
                          placeholder="Contraseña"
                          className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.password ? 'ring-red-500' : ''}`}
                        />
                      )}
                    />
                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                        Contraseña
                    </span>
                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </label>
            </div>
            <div className="col-span-full">
                <label
                    htmlFor="signInConfirmPassword"
                    className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                >
                    {/* Confirmar Contraseña */}
                    <Controller
                      name="confirm_password"
                      control={control}
                      defaultValue=""
                      rules={{ required: "La contraseña es obligatoria", minLength: { value: 8, message: "Mínimo 8 caracteres" }, maxLength: { value: 20, message: "Máximo 20 caracteres" }, validate: (value) => value === password || "Las contraseñas no coinciden" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="signInConfirmPassword"
                          type="password"
                          placeholder="Confirmar contraseña"
                          className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.confirm_password ? 'ring-red-500' : ''}`}
                        />
                      )}
                    />
                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                        Confirmar Contraseña
                    </span>
                    {errors.confirm_password && <span className="text-red-500 text-xs">{errors.confirm_password.message}</span>}
                </label>
            </div>
            {/* Checkbox de términos y condiciones */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                className='form-checkbox h-4 w-4 text-green-500 rounded-full'
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
              />
              <span className='ml-2 text-[12px] text-black'>
                  Acepto los Términos y Condiciones de Uso y las políticas de privacidad.
              </span>
            </div>

            {/* Botón de Registro */}
            <div>
              <button
                type="submit"
                className="w-full justify-center bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;