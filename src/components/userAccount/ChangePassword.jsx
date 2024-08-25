import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import api from '../../settings/api';

const ChangePassword = ({ setShowChangePassword }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const newPassword = watch('new_password');
    const [errores, setErrores] = useState([]);

    const onSubmit = async (data) => {
        try {
            const response = await api.patch(`/auth/changePass/${user.id}/`, {
                password: data.new_password
            });
            Swal.fire('Éxito', 'Contraseña cambiada con éxito', 'success');
            setShowChangePassword('none'); // Actualizar estado para cerrar el formulario
        } catch (error) {
            console.error(error);
            setErrores(Object.values(error.response.data));
            setTimeout(() => {
                setErrores([]);
            }, 5000);
        }
    };

    const passwordMatchValidator = (value) => value === newPassword || 'Las contraseñas no coinciden';

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto bg-white p-5 shadow-lg rounded-lg">
                <h3 className="text-center text-2xl font-semibold mb-5">Cambiar contraseña</h3>

                <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-span-full">
                        <label htmlFor="current_password" className="relative block text-sm font-medium leading-6 text-gray-900 bg-gray-200 border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                            <Controller
                                name="current_password"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'La contraseña actual es obligatoria' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        id="current_password"
                                        autoComplete="current-password"
                                        className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.current_password ? 'ring-red-500' : ''}`}
                                        placeholder="Contraseña actual"
                                    />
                                )}
                            />
                            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                                Contraseña actual
                            </span>
                            {errors.current_password && <span className="text-red-500 text-xs">{errors.current_password.message}</span>}
                        </label>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="new_password" className="relative block text-sm font-medium leading-6 text-gray-900 bg-gray-200 border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                            <Controller
                                name="new_password"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'La nueva contraseña es obligatoria' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        id="new_password"
                                        autoComplete="new-password"
                                        className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.new_password ? 'ring-red-500' : ''}`}
                                        placeholder="Nueva contraseña"
                                    />
                                )}
                            />
                            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                                Nueva contraseña
                            </span>
                            {errors.new_password && <span className="text-red-500 text-xs">{errors.new_password.message}</span>}
                        </label>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="confirm_password" className="relative block text-sm font-medium leading-6 text-gray-900 bg-gray-200 border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                            <Controller
                                name="confirm_password"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Por favor confirme su contraseña', validate: passwordMatchValidator }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        id="confirm_password"
                                        autoComplete="new-password"
                                        className={`p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 ${errors.confirm_password ? 'ring-red-500' : ''}`}
                                        placeholder="Confirmar contraseña"
                                    />
                                )}
                            />
                            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs rounded-sm">
                                Confirmar contraseña
                            </span>
                            {errors.confirm_password && <span className="text-red-500 text-xs">{errors.confirm_password.message}</span>}
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full justify-center bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 rounded"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>

                {errores.length > 0 && (
                    <div className="mt-4">
                        {errores.map((error, index) => (
                            <div key={index} className="text-red-500 text-xs">
                                {error}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
