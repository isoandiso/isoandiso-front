import React from 'react';
import { useFormContext } from 'react-hook-form';
import Map from '../Map';

function FormPg2({ currentPage }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className={`${currentPage != 2 ? "hidden" : ""} w-full`}>
            <div className='font-urbanist sm:80'>
                <h2 className="text-base font-semibold my-5 text-gray-900">¿Dónde está ubicado tu inmueble?</h2>
                <div>
                    <label
                        htmlFor="adress"
                        className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                    >
                        <input
                            type="text"
                            id="adress"
                            {...register('adress', { required: 'Dirección es requerida' })}
                            className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                            placeholder="adress"
                        />
                        <span
                            className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                            Dirección:
                        </span>
                    </label>
                    {errors.adress && <p className="text-red-600">{errors.adress.message}</p>}
                </div>

                <div className='flex-1 gap-x-6 gap-y-8'>
                    <div className='flex flex-col sm:flex-row gap-2 my-3'>
                        <div className="w-full">
                            <label htmlFor="departamento" className="block text-sm font-medium leading-6 text-gray-900">
                                Departamento
                            </label>
                            <div className="mt-1">
                                <select
                                    id="departamento"
                                    {...register('departamento', { required: 'Departamento es requerido' })}
                                    className="block w-full rounded-sm p-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500  sm:text-sm sm:leading-6"
                                >
                                    <option value="">Selecciona Departamento</option>
                                    <option value="Lima">Lima</option>
                                    <option value="Arequipa">Arequipa</option>
                                    <option value="Huancayo">Huancayo</option>
                                </select>
                                {errors.departamento && <p className="text-red-600">{errors.departamento.message}</p>}
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="provincia" className="block text-sm font-medium leading-6 text-gray-900">
                                Provincia
                            </label>
                            <div className="mt-1">
                                <select
                                    id="provincia"
                                    {...register('provincia', { required: 'Provincia es requerida' })}
                                    autoComplete="provincia-name"
                                    className="block w-full rounded-sm p-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500  sm:text-sm sm:leading-6"
                                >
                                    <option value="">Selecciona Provincia</option>
                                    <option value="Lima">Lima</option>
                                    <option value="Barranca">Barranca</option>
                                    <option value="Cajatambo">Cajatambo</option>
                                </select>
                                {errors.provincia && <p className="text-red-600">{errors.provincia.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2 my-3'>
                        <div className="w-full">
                            <label htmlFor="distrito" className="block text-sm font-medium leading-6 text-gray-900">
                                Distrito
                            </label>
                            <div className="mt-1">
                                <select
                                    id="distrito"
                                    {...register('distrito', { required: 'Distrito es requerido' })}
                                    autoComplete="distrito-name"
                                    className="w-full rounded-sm p-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500  sm:text-sm sm:leading-6"
                                >
                                    <option value="">Selecciona Distrito</option>
                                    <option value="Lima">Lima</option>
                                    <option value="Arequipa">Arequipa</option>
                                    <option value="Huancayo">Huancayo</option>
                                </select>
                                {errors.distrito && <p className="text-red-600">{errors.distrito.message}</p>}
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="urbanization" className="block text-sm font-medium leading-6 text-gray-900">
                                Urbanización
                            </label>
                            <div className="mt-1">
                                <select
                                    id="urbanization"
                                    {...register('urbanization', { required: 'Urbanización es requerida' })}
                                    autoComplete="urbanization-name"
                                    className="w-full rounded-sm p-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500  sm:text-sm sm:leading-6"
                                >
                                    <option value="">Selecciona Urbanización</option>
                                    <option value="Lima">Lima</option>
                                    <option value="Barranca">Barranca</option>
                                    <option value="Cajatambo">Cajatambo</option>
                                </select>
                                {errors.urbanization && <p className="text-red-600">{errors.urbanization.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">¿Cómo deseas mostrar tu ubicación?</h2>
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default FormPg2;
