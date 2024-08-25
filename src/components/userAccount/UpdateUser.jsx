import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import api from '../../settings/api';
import Swal from 'sweetalert2';

const UpdateUser = ({ user, setShowUpdateUser, mutate }) => {
    const navigate = useNavigate();
    const { register } = useUser();
    const [errores, setErrores] = useState([]);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await api.patch(`/auth/${user.id}/`, data);
            Swal.fire('Éxito', 'Datos cambiados con éxito', 'success');
            setShowUpdateUser('none'); // Cambiar estado para cerrar formulario
            mutate();
        } catch (error) {
            console.error(error);
            setErrores(Object.values(error.response.data));
            setTimeout(() => {
                setErrores([]);
            }, 2000);
        }
    };

    return (
        <div className='py-4'>
            <h3 className='text-center lg:text-[25px] md:text-[20px]'>Editar datos personales</h3>
            {errores.length > 0 && errores.map((error, index) => (
                <p key={index} className='text-red-500 mb-2 text-center'>{error}</p>
            ))}
            <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                <div className="col-span-full">
                    <label
                        htmlFor="first_name"
                        className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                    >
                        <Controller
                            name="first_name"
                            control={control}
                            rules={{ required: 'El nombre es obligatorio' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="first_name"
                                    autoComplete="given-name"
                                    className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.first_name ? 'ring-red-500' : ''}`}
                                    placeholder="Nombres"
                                />
                            )}
                        />
                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                            Nombres
                        </span>
                        {errors.first_name && <span className="text-red-500 text-xs">{errors.first_name.message}</span>}
                    </label>
                </div>
                <div className="col-span-full">
                    <label
                        htmlFor="last_name"
                        className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900 bg-gray-200"
                    >
                        <Controller
                            name="last_name"
                            control={control}
                            rules={{ required: 'Los apellidos son obligatorios' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="last_name"
                                    autoComplete="family-name"
                                    className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.last_name ? 'ring-red-500' : ''}`}
                                    placeholder="Apellidos"
                                />
                            )}
                        />
                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                            Apellidos
                        </span>
                        {errors.last_name && <span className="text-red-500 text-xs">{errors.last_name.message}</span>}
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
                            rules={{
                                required: 'El número es obligatorio',
                                maxLength: {
                                    value: 9,
                                    message: 'El número debe tener un máximo de 9 dígitos'
                                },
                                pattern: {
                                    value: /^\d*$/,
                                    message: 'Solo se permiten números'
                                }
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="phone"
                                    autoComplete="phone"
                                    maxLength="9"
                                    className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.phone ? 'ring-red-500' : ''}`}
                                    placeholder="Número celular"
                                />
                            )}
                        />
                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                            Número celular
                        </span>
                        {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                    </label>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full justify-center bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
