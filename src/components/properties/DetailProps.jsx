import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import useSWR from 'swr';
import api from '../../settings/api';
import { FaRegHeart } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaKitchenSet } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import ImageGallery from './ImageGallery';
import { FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi"
import { GiHomeGarage } from "react-icons/gi"
import { MdMeetingRoom } from "react-icons/md";
import SendMsg from './SendMsg';
import Map from './Map';


export function loader({ params }) {
    const idProperty = params.idProperty;
    return idProperty;
}

function DetailProps() {

    const idProperty = useLoaderData();

    const fetchPropertyDetails = async () => {
        try {
            const response = await api.get(`/property/${idProperty}/`);
            return response.data

        } catch (err) {
            console.error(err)
        }
    };

    const { data: property, error } = useSWR(`/property/${idProperty}/`, fetchPropertyDetails);


    const whatsappLink = `https://wa.me/${property?.phone_number}?text=Hola, estoy interesado en la propiedad que tienes publicada`;

    return (
        <div className='bg-gray-100 mb-3 '>
            <div className="flex items-center justify-end text-white border-gray-500">
                <form action="" className="flex w-full">
                    <div className="font-normal flex gap-2 w-full flex-col items-center justify-center sm:flex-row sm:justify-center sm:gap-3 rounded-t m-2 font-urbanist">
                        <button className="flex items-center gap-1 border border-gray-400 hover:bg-green-500 hover:text-white text-gray-600  py-2 px-4 ">
                            Favorito
                            <FaRegHeart />
                        </button>
                        <button className="flex items-center gap-1 border border-gray-400 hover:bg-green-500 hover:text-white text-gray-600  py-2 px-4 ml-2">
                            Compartir
                            <IoShareSocialOutline />
                        </button>
                        <button className="flex items-center gap-1 border border-gray-400 hover:bg-green-500 hover:text-white text-gray-600 py-2 px-4 ml-2">
                            Notas personales
                            <CiLocationOn />
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <ImageGallery imageUrls={property?.images} />
            </div>
            <div className='lg:flex w-11/12  max-w-7xl gap-2 mx-auto my-5'>
                <div className='lg:w-3/5 xl:w-4/6'>
                    <h3 className='font-bold text-xl font-ubuntu'>Detalles</h3>

                    <article className='my-3'>
                        <span className='bg-blue2 font-bold text-white p-2 rounded'>Entrega Inmediata</span>
                        <h3 className='text-gray-900 font-bold my-2 text-2xl'>
                            Venta desde {property?.type_currency == 'PEN' ? 'S./' : '$'}{property?.price}
                        </h3>
                        <address className='flex font-semibold'>
                            <CiLocationOn className='text-2xl' /><span>{property?.adress}, {property?.provincia}, {property?.distrito}</span>
                        </address>
                        <div className="border-t border-b p-5 my-2">
                            <div className="flex flex-wrap gap-7">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <BiArea className="text-2xl" />
                                    <span className="text-lg">{property?.area_property} m²</span>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <MdMeetingRoom className="text-2xl" />
                                    <span className="text-lg">{property?.bedrooms_number} Habitaciones</span>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <FaBath className="text-2xl" />
                                    <span className="text-lg">{property?.bathrooms_number} Baños</span>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <FaKitchenSet className="text-2xl" />
                                    <span className="text-lg">{property?.kitchens_number} Cocinas</span>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <GiHomeGarage className="text-2xl" />
                                    <span className="text-lg">{property?.garages_number} Garages</span>
                                </div>
                            </div>
                        </div>
                        <h3 className='font-bold text-xl font-ubuntu my-2'>
                            Descripcción
                        </h3>
                        <p className="overflow-hidden break-words">
                            {property?.description}
                        </p>
                    </article>
                </div>
                <div className="lg:w-2/5 xl:w-2/6">
                    <SendMsg whatsappLink={whatsappLink} />
                </div>

            </div>
            <div>
                <Map />
            </div>
        </div>
    )
}

export default DetailProps