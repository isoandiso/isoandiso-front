import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import api from '../../settings/api';
//icons
import { MdOutlineLocationOn } from "react-icons/md"
import { BiArea } from "react-icons/bi"
import { FaRegBuilding } from "react-icons/fa"
import { IoBedOutline } from "react-icons/io5"
import { LuBath } from "react-icons/lu"
import { GiHomeGarage } from "react-icons/gi"
import { FaKitchenSet } from "react-icons/fa6"
import { FaWhatsapp } from "react-icons/fa"
import { GiTap } from "react-icons/gi"
import { FaRegLightbulb } from "react-icons/fa"
import { GiKitchenScale } from "react-icons/gi"
import { MdOutlineLocalOffer } from "react-icons/md"




export function loader({ params }) {
    const idProperty = params.idProperty;
    return idProperty;
}

export const DetailProperties = () => {

    const idProperty = useLoaderData();
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await api.get(`/property/${idProperty}/`);
                setPropertyDetails(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [idProperty]);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const isLastPage = currentPage === 4;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <section class="bg-white w-full">
                <div class="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6 font-ubuntu ">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                        <div class="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
                            <div class="group relative flex flex-col overflow-hidden  px-4 pb-4 pt-40 flex-grow">
                                <img src="/public/img/edf1.jpeg" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                                <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Edificio</h3>
                            </div>
                        </div>
                        <div class="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
                            <div class="group relative flex flex-col overflow-hidden px-4 pb-4 pt-40 mb-4">
                                <img src="/public/img/dep1.jpeg" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                                <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Sala de juego</h3>
                            </div>
                            <div class="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                                <div class="group relative flex flex-col overflow-hidden px-4 pb-4 pt-40">
                                    <img src="/public/img/dep3.jpeg" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                                    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                    <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Dormitorio</h3>
                                </div>
                                <div class="group relative flex flex-col overflow-hidden px-4 pb-4 pt-40">
                                    <img src="/public/img/dep6.webp" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                                    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                    <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Sala</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
                            <button type='button' class="group relative flex flex-col overflow-hidden px-4 pb-4 pt-40 flex-grow">
                                <img src="/public/img/dep8.jpeg" alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                                <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                                <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">Salón</h3>
                            </button>
                        </div>
                    </div>
                </div>
                <div id="details" class="p-6 font-urbanist">
                    <div id="general">
                        <p class="text-lg text-gray-700">{propertyDetails.subtype_property}: {propertyDetails.type_property}</p>
                        <p class="text-2xl mb-7">Venta desde {propertyDetails.type_currency == "PEN" ? "S/." : "$"}{propertyDetails.price}</p>
                        <hr />
                        {/* <p class="text-lg">Urbanización: {propertyDetails.urbanization}</p> */}
                        <div class="py-7">
                            <p class="text-lg">{propertyDetails.departamento}, {propertyDetails.provincia}, {propertyDetails.distrito}, {propertyDetails.urbanization}</p>
                            <p className="flex items-center space-x-2 mt-2">
                                <div className='h-9 w-9 rounded-full bg-gray-400 p-2 text-xl text-white'>
                                    <MdOutlineLocationOn />
                                </div>
                                <strong><span class="text-lg">{propertyDetails.adress}</span></strong>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div id="iconos" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-12">
                        <div className="flex items-center space-x-2">
                            <div className='h-9 w-9 rounded-full bg-gray-400 p-2 text-xl text-white'>
                                <BiArea />
                            </div>
                            <span className="text-lg font-bold">{propertyDetails.area_property} m²</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className='h-9 w-9 rounded-full bg-gray-400 p-2 text-xl text-white'>
                                <LuBath />
                            </div>
                            <span className="text-lg font-bold">Baños: {propertyDetails.bathrooms_number}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className='h-9 w-9 rounded-full bg-gray-400 p-2 text-xl text-white'>
                                <FaRegBuilding />
                            </div>
                            <span className="text-lg font-bold">Pisos: {propertyDetails.floors_number}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className='h-9 w-9 rounded-full bg-gray-400 p-2 text-xl text-white'>
                                <GiHomeGarage />
                            </div>
                            <span className="text-lg font-bold">Garajes: {propertyDetails.garages_number}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className='h-9 w-9 rounded-full bg-gray-400 p-2 text-xl text-white'>
                                <IoBedOutline />
                            </div>
                            <span className="text-lg font-bold">Dormitorios: {propertyDetails.bedrooms_number}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className='h-9 w-9 rounded-full bg-gray-400 p-2 text-xl text-white'>
                                <FaKitchenSet />
                            </div>
                            <span className="text-lg font-bold">Cocinas: {propertyDetails.kitchens_number}</span>
                        </div>
                    </div>
                    <hr />
                    <div id="descripcion" class="py-7">
                        <p class="text-lg font-bold">Descripción</p>
                        <p>{propertyDetails.description}</p>
                    </div>
                    <hr />
                    <div id="ubicacion" class="py-7">
                        <p class="text-lg font-bold">Ubicación del proyecto</p>
                        <p>{propertyDetails.adress}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
