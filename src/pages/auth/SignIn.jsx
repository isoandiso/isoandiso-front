import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
function SignIn() {

    const navigate = useNavigate()

    const { register } = useUser()

    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch('password');
    const [terminos, setTerminos] = useState(false)
    const [errores, setErrores] = useState([])

    const onSubmit = async (user) => {
        if (!terminos) {
            await Swal.fire({
                icon: "error",
                text: "Necesitas aceptar nuestros terminos y condiciones",
            });
            return
        }

        const registroExitoso = await register(
            {
                email: user.email,
                phone: user.phone,
                password: user.password,
            },
            setErrores
        );

        if (registroExitoso) {
            await Swal.fire({
                icon: 'success',
                text: "Registro exitoso",
            });
            navigate('/usuario/acquisitions');  // Redirige después de un registro exitoso
        } else {
            await Swal.fire({
                icon: 'error',
                text: "Error en el registro. Verifique los datos ingresados.",
            });
        }

    };

    const passwordMatchValidator = (value) => {
        return value === password || 'Las contraseñas no coinciden';
    };

    return (
        <div className="flex justify-center items-center mx-auto md:px-6 py-5 md:py-12 lg:px-8" style={{ backgroundImage: "url('public/img/dep1.jpeg')" }}>
            <div className='bg-white items-center rounded bg-opacity-100 ml-4 mr-4 mb-8 p-6 font-urbanist flex flex-row justify-center space-x-8 w-full max-w-4xl'>
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* <img
                            className="mx-auto h-10 w-auto"
                            src="/public/img/logo.png"
                            alt="my Company"
                        /> */}
                        <h2 className="mt-6 mb-5 text-center text-2xl font-bold leading-9  text-black font-ubuntu ">
                            Nuevo registro
                        </h2>
                    </div>
                    {
                        errores.length > 0 ? (
                            errores.map((error,index) => (
                                <p key={index} className='bg-red-500 border border-red-900 rounded p-1 text-white text-center font-black my-3'>{error}</p>
                            ))
                        ) : null
                    }
                    <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="col-span-full">
                            <label
                                htmlFor="email"
                                className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                            >
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'El correo electrónico es obligatorio',
                                        maxLength: {
                                            value: 100,
                                            message: 'Longitud máxima 100',
                                        },
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Ingrese un correo electrónico válido'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="email"
                                            id="email"
                                            autoComplete="email"
                                            className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : ''}`}
                                            placeholder="Correo electrónico"
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
                                htmlFor="phone"
                                className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                            >
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'El número es obligatorio',
                                        minLength: {
                                            value: 9,
                                            message: 'El número debe tener al menos 9 dígitos',
                                          },
                                          maxLength: {
                                            value: 15,
                                            message: 'El número no puede tener más de 20 dígitos',
                                          },
                                    }}
                                    render={({ field }) => (
                                        <input
                                        {...field}
                                        type="text" // Cambiamos de type="number" a type="text"
                                        id="phone"
                                        autoComplete="phone"
                                        inputMode="numeric" // Asegura que se muestre el teclado numérico en móviles
                                        className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.phone ? 'ring-red-500' : ''}`}
                                        placeholder="Número celular"
                                        
                                        // Evento onInput para filtrar solo números
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Reemplaza todo lo que no sea número
                                            field.onChange(e); // Actualiza el valor en react-hook-form
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
                                htmlFor="password"
                                className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                            >
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{ 
                                        required: 'La contraseña es obligatoria',
                                        maxLength: {
                                            value: 20,
                                            message: 'El número debe tener un máximo de 20 dígitos'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'El número debe tener al menos 8 dígitos'
                                        },
                                     }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.password ? 'ring-red-500' : ''}`}
                                            placeholder="Contraseña"
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
                                htmlFor="confirm_password"
                                className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                            >
                                <Controller
                                    name="confirm_password"
                                    control={control}
                                    defaultValue=""
                                    rules={{ 
                                        required: 'Por favor confirme su contraseña',
                                        maxLength: {
                                            value: 20,
                                            message: 'El número debe tener un máximo de 20 dígitos'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'El número debe tener al menos 8 dígitos'
                                        },
                                        validate: passwordMatchValidator }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="password"
                                            id="confirm_password"
                                            autoComplete="current-password"
                                            className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.confirm_password ? 'ring-red-500' : ''}`}
                                            placeholder="Confirmar contraseña"
                                        />
                                    )}
                                />
                                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                                    Confirmar Contraseña
                                </span>
                                {errors.confirm_password && <span className="text-red-500 text-xs">{errors.confirm_password.message}</span>}
                            </label>
                        </div>
                        <div className='flex items-center mt-4'>
                            <input
                                onChange={(e) => setTerminos(e.target.checked)}
                                type="checkbox"
                                name='terminos'
                                className='form-checkbox h-4 w-4 text-green-500 rounded-full'
                            />
                            <span className='ml-2 text-[12px] text-black'>
                                Acepto los Términos y Condiciones de Uso y las políticas de privacidad.
                            </span>
                        </div>
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
}

export default SignIn;
