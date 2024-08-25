import React from 'react'
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi"
import { GiHomeGarage } from "react-icons/gi"
import { MdMeetingRoom } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { AiOutlineEdit } from "react-icons/ai";

function Propertie({ propertie, userPost }) {
    // URL de WhatsApp con el número de teléfono y el mensaje
    const whatsappLink = `https://wa.me/${propertie.phone_number}?text=Hola, estoy interesado en la propiedad que tienes publicada`;

    return (
        <article className='w-full transition-shadow duration-300 hover:shadow-md hover:shadow-green-300 relative max-w-7xl mx-auto bg-white rounded'>
            {!userPost &&
                <button className='p-1 border border-gray-600 rounded absolute top-2 right-2' type='button'>
                    <CiHeart className='text-2xl' />
                </button>
            }
            {userPost &&
                <button className='p-1 border border-gray-600 rounded absolute top-2 right-2' type='button'>
                    <AiOutlineEdit className='text-2xl' />
                </button>
            }
            <Link
                className='grid grid-cols-1 md:grid-cols-3 md:gap-4'
                to={`/item/${propertie.id}`}
            >
                <div className='col-span-1 h-64 md:h-auto'>
                    <img src={`${import.meta.env.VITE_URL_IMG}${propertie.images[0].image}`} alt="Property" className="block w-full h-full rounded object-cover" />
                </div>

                <div className='col-span-2 p-3'>
                    <h3 className='text-sm text-gray-900'>
                        Departamento desde
                    </h3>
                    <p className='font-bold text-xl'>
                        {propertie?.type_currency === 'PEN' ? 'S./' : '$'}{propertie?.price}
                    </p>
                    <address className='flex text-sm font-semibold'>
                        <CiLocationOn className='text-xl md:text-2xl' /><span>{propertie?.adress}, {propertie?.provincia}, {propertie?.distrito}</span>
                    </address>
                    <div className="flex flex-wrap gap-x-2 max-w-xl md:gap-x-5 my-3">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <BiArea className="text-xl md:text-2xl" />
                            <span className=" md:text-lg">{propertie?.area_property} m²</span>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <MdMeetingRoom className="text-xl md:text-2xl" />
                            <span className=" md:text-lg">{propertie?.bedrooms_number} Habitaciones</span>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <FaBath className="text-xl md:text-2xl" />
                            <span className=" md:text-lg">{propertie?.bathrooms_number} Baños</span>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <FaKitchenSet className="text-xl md:text-2xl" />
                            <span className=" md:text-lg">{propertie?.kitchens_number} Cocinas</span>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <GiHomeGarage className="text-xl md:text-2xl" />
                            <span className=" md:text-lg">{propertie?.garages_number} Garages</span>
                        </div>
                    </div>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                        {propertie?.description}
                    </p>
                    {!userPost &&
                        <div className='flex justify-between border-t mt-2 p-2'>
                            <div className='font-bold'>
                                ANUNCIANTE
                            </div>
                            <div className='flex gap-2'>
                                <Link
                                    to={`tel:${propertie?.phone_number}`}
                                    className='py-1 px-2 border border-blue2 rounded text-blue2 transition-colors duration-300 hover:bg-blue2 hover:text-white'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MdOutlinePhone className='text-xl' />
                                </Link>
                                <Link
                                    to={whatsappLink}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='py-1 border border-green-500 px-2 rounded flex justify-center items-center gap-1 text-green-500 transition-colors duration-300 hover:bg-green-500 hover:text-white'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className='hidden md:block'>WhatsApp</span> <FaWhatsapp className='text-xl' />
                                </Link>
                                <button
                                    type='button' className='py-1 border border-blue2 px-2 rounded flex justify-center transition-colors duration-300 items-center gap-1 text-blue2 hover:bg-blue2 hover:text-white'
                                >
                                    <span className='hidden md:block'>Contactar</span> <CiMail className='text-xl' />
                                </button>
                                {/* {user && <h1 className='bg-green-500 text-red-700'>xddd</h1>} */}
                            </div>
                        </div>
                    }
                </div>
            </Link>
        </article>
    )
}

export default Propertie
