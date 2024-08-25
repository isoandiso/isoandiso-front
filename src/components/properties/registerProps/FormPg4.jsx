import React from 'react';
import { useFormContext } from 'react-hook-form';

function FormPg4({ currentPage }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className={`${currentPage != 4 ? "hidden" : ""} w-full`}>
            <h2 className="text-xl font-semibold leading-7 text-gray-900">Características principales</h2>
            <div className="mt-2 font-urbanist">
                <div className='flex flex-col sm:flex-row gap-2 my-3'>
                    <div className="w-full">
                        <label
                            htmlFor="area_property"
                            className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="number"
                                id="area_property"
                                {...register('area_property', { required: 'Área es requerida' })}
                                className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="area"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Área del propiedad
                            </span>
                        </label>
                        {errors.area_property && <p className="text-red-600">{errors.area_property.message}</p>}
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="bedrooms_number"
                            className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="number"
                                id="bedrooms_number"
                                {...register('bedrooms_number', {
                                    required: 'Dormitorios es requerido',
                                    maxLength: {
                                        value: 2,
                                        message: 'Máximo 2 dígitos'
                                    }
                                })}
                                className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="bedrooms_number"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Dormitorios
                            </span>
                        </label>
                        {errors.bedrooms_number && <p className="text-red-600">{errors.bedrooms_number.message}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-2 my-3'>
                    <div className="w-full">
                        <label
                            htmlFor="garages_number"
                            className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="number"
                                id="garages_number"
                                {...register('garages_number', {
                                    required: 'Cocheras es requerido',
                                    maxLength: {
                                        value: 2,
                                        message: 'Máximo 2 dígitos'
                                    }
                                })}
                                className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="garages_number"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Cocheras
                            </span>
                        </label>
                        {errors.garages_number && <p className="text-red-600">{errors.garages_number.message}</p>}
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="bathrooms_number"
                            className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="number"
                                id="bathrooms_number"
                                {...register('bathrooms_number', {
                                    required: 'Baños es requerido',
                                    maxLength: {
                                        value: 2,
                                        message: 'Máximo 2 dígitos'
                                    }
                                })}
                                className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="bathrooms_number"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Baños
                            </span>
                        </label>
                        {errors.bathrooms_number && <p className="text-red-600">{errors.bathrooms_number.message}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-2 my-3'>
                    <div className="w-full">
                        <label
                            htmlFor="kitchens_number"
                            className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="number"
                                id="kitchens_number"
                                {...register('kitchens_number', {
                                    required: 'Cocinas es requerido',
                                    maxLength: {
                                        value: 2,
                                        message: 'Máximo 2 dígitos'
                                    }
                                })}
                                className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="kitchens_number"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Cocinas
                            </span>
                        </label>
                        {errors.kitchens_number && <p className="text-red-600">{errors.kitchens_number.message}</p>}
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="floors_number"
                            className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="number"
                                id="floors_number"
                                {...register('floors_number', {
                                    required: 'Pisos es requerido',
                                    maxLength: {
                                        value: 2,
                                        message: 'Máximo 2 dígitos'
                                    }
                                })}
                                className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="floors_number"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Pisos
                            </span>
                        </label>
                        {errors.floors_number && <p className="text-red-600">{errors.floors_number.message}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-2 my-3'>
                    <div className="w-full font-urbanist">
                        <div className="w-full">
                            <label htmlFor="type_currency" className="block text-sm uppercase font-black text-gray-700">
                                Precio en:
                            </label>
                            <div className="mt-1">
                                <select
                                    id="type_currency"
                                    {...register('type_currency', { required: 'Precio en es requerido' })}
                                    autoComplete="type_currency-name"
                                    className="block w-full outline-none rounded-sm p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                >
                                    <option value="">Selecciona opción</option>
                                    <option value="PEN">Soles</option>
                                    <option value="USD">Dólares</option>
                                </select>
                                {errors.type_currency && <p className="text-red-600">{errors.type_currency.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-[22px]">
                        <label
                            htmlFor="price"
                            className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="number"
                                id="price"
                                {...register('price', { required: 'Precio es requerido' })}
                                className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="price"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Precio
                            </span>
                        </label>
                        {errors.price && <p className="text-red-600">{errors.price.message}</p>}
                    </div>
                </div>
                <div className="col-span-full my-3">
                    <label
                        htmlFor="title"
                        className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                    >
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: 'Título es requerido' })}
                            className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                            placeholder="title"
                        />
                        <span
                            className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                            Título
                        </span>
                    </label>
                    {errors.title && <p className="text-red-600">{errors.title.message}</p>}
                </div>
                <div className="col-span-full">
                    <label
                        htmlFor="description"
                        className="relative rounded-sm border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                    >
                        <input
                            type="text"
                            id="description"
                            {...register('description', { required: 'Descripción es requerida' })}
                            className=" p-1 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                            placeholder="description"
                        />
                        <span
                            className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                            Descripción
                        </span>
                    </label>
                    {errors.description && <p className="text-red-600">{errors.description.message}</p>}
                </div>
            </div>
        </div>
    );
}

export default FormPg4;
