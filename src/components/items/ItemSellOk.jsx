import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function ItemSellOk() {
    const products = [
        {
            id: 1,
            locate: 'Lima, Lima, Miraflores',
            href: '/item',
            imageSrc: '/public/img/dep9.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: 'S/. 360,000.00 ',
            ruc: 'Culminado',
            postedAgo: 'Publicado hace 3 semanas en Tacna, TA',
            type: 'HOTEL EN VENTA',
            area: '5,642.00 m²',
            offer: '15',
            nextTo: 'Colindante con un parque',
        },
        // {
        //     id: 2,
        //     locate: 'Lima, Lima, Miraflores',
        //     href: '/item',
        //     imageSrc: './src/assets/dep4.webp',
        //     imageAlt: "Front of men's Basic Tee in black.",
        //     price: 'S/. 360,000.00 ',
        //     ruc: 'En construcción',
        //     society: 'Junio 2025',
        //     type: 'HOTEL EN VENTA',
        //     area: '5,642.00 m²',
        // },
        // {
        //     id: 3,
        //     locate: 'Lima, Lima, Miraflores',
        //     href: '/item',
        //     imageSrc: './src/assets/dep1.jpg',
        //     imageAlt: "Front of men's Basic Tee in black.",
        //     price: 'S/. 360,000.00 ',
        //     ruc: 'En construcción',
        //     society: 'Junio 2025',
        //     type: 'HOTEL EN VENTA',
        //     area: '5,642.00 m²',
        // },
        // {
        //     id: 4,
        //     locate: 'Lima, Lima, Miraflores',
        //     href: '/item',
        //     imageSrc: './src/assets/img6.webp',
        //     imageAlt: "Front of men's Basic Tee in black.",
        //     price: 'S/. 360,000.00 ',
        //     ruc: 'En construcción',
        //     society: 'Junio 2025',
        //     type: 'HOTEL EN VENTA',
        //     area: '5,642.00 m²',
        // },

    ]
    return (
        <div>
            <div className='m-4'>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className=''>
                                <div className="w-full overflow-hidden bg-gray-200 lg:h-80">
                                    <a href={product.href}>
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full  inset-0 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                        />
                                    </a>
                                    {/* <FaRegHeart className="bg-white absolute top-5 right-2 py-1 px-3 rounded-full text-black text-[40px]" /> */}
                                    {/* <span className="bg-[#DC3545] absolute top-5 right-2 py-1 px-3 rounded-full text-white text-[10px]" >ID: {product.id}</span>
                                            <span className="bg-blue-800 absolute text-end bottom-36 right-2 py-1 px-3 rounded-full text-white text-[10px]" >{product.type}</span> */}
                                </div>
                            </div>
                            <div className='bg-white p-2 font-urbanist'>
                                <div className="mt-4 flex">
                                    <div className='ml-3'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex'>
                                                <p className="text-xs font-medium text-gray-700 mb-2">{product.price}</p>
                                            </div>
                                        </div>
                                        <div className=' flex'>
                                            <MdOutlineLocalOffer />
                                            <p className='text-[11px]'>Propuestas: {product.offer}</p>
                                        </div>
                                        <h3 className="text-xs text-gray-600 flex">
                                            <span aria-hidden="true" className=" inset-0 flex-initial" />
                                            <FaLocationDot className="mr-1 mt-1" />{product.locate}
                                        </h3>
                                        <div className='text-xs text-gray-600 mb-2 flex'>
                                            <FaRegArrowAltCircleRight className="mr-1 mt-1" />
                                            <p className="text-[11px]">{product.nextTo}</p>
                                        </div>
                                        {/* <p className="text-[10px] text-gray-400">{product.ruc}</p> */}
                                        <p className="text-[11px] text-gray-400">{product.postedAgo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ItemSellOk