import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import api from '../../settings/api';

function ItemSell() {

    const properties = [
        {
            id: 1,
            href: '/item',
            imageSrc: '/public/img/1.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: 'ISO 9001:2015.',
            buttonColor: 'bg-red-500'
        },
        {
            id: 2,
            href: '/item',
            imageSrc: '/public/img/2.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '45001 - 2018',
            buttonColor: 'bg-purple1'
        },
        {
            id: 3,
            href: '/item',
            imageSrc: '/public/img/3.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '14001 - 2018',
            buttonColor: 'bg-green-500'
        },
        {
            id: 4,
            href: '/item',
            imageSrc: '/public/img/4.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '27001 - 2022',
            buttonColor: 'bg-gray-500'
        },
        {
            id: 5,
            href: '/item',
            imageSrc: '/public/img/5.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '19601 - 2017',
            buttonColor: 'bg-purple1'
        },
        {
            id: 6,
            href: '/item',
            imageSrc: '/public/img/6.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '20121 - 2024',
            buttonColor: 'bg-purple-700'
        },
        {
            id: 7,
            href: '/item',
            imageSrc: '/public/img/7.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '30301 - 2019',
            buttonColor: 'bg-gray-500'
        },
        {
            id: 8,
            href: '/item',
            imageSrc: '/public/img/8.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '39001 - 2018',
            buttonColor: 'bg-sky-500'
        },
        {
            id: 9,
            href: '/item',
            imageSrc: '/public/img/9.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '13485 - 2018',
            buttonColor: 'bg-red-500'
        },
        {
            id: 10,
            href: '/item',
            imageSrc: '/public/img/10.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '22001 - 2018',
            buttonColor: 'bg-purple1'
        },
        {
            id: 11,
            href: '/item',
            imageSrc: '/public/img/11.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '50001 - 2018',
            buttonColor: 'bg-green-500'
        },
        {
            id: 12,
            href: '/item',
            imageSrc: '/public/img/12.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '21001 - 2018',
            buttonColor: 'bg-gray-500'
        },
        {
            id: 13,
            href: '/item',
            imageSrc: '/public/img/13.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '28001 - 2018',
            buttonColor: 'bg-purple1'
        },
        {
            id: 14,
            href: '/item',
            imageSrc: '/public/img/14.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '37001 - 2018',
            buttonColor: 'bg-purple-700'
        },
        {
            id: 15,
            href: '/item',
            imageSrc: '/public/img/15.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '17020 - 2018 EMA',
            buttonColor: 'bg-gray-500'
        },
        {
            id: 16,
            href: '/item',
            imageSrc: '/public/img/16.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '29001 - 2020',
            buttonColor: 'bg-sky-500'
        },
        {
            id: 17,
            href: '/item',
            imageSrc: '/public/img/17.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '26001 - 2019',
            buttonColor: 'bg-red-500'
        },
        {
            id: 18,
            href: '/item',
            imageSrc: '/public/img/18.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '15189 - 2023',
            buttonColor: 'bg-purple1'
        },
        {
            id: 19,
            href: '/item',
            imageSrc: '/public/img/19.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '27701 - 2019',
            buttonColor: 'bg-green-500'
        },
        {
            id: 20,
            href: '/item',
            imageSrc: '/public/img/20.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '16949 - 2016',
            buttonColor: 'bg-gray-500'
        },
        {
            id: 21,
            href: '/item',
            imageSrc: '/public/img/21.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '17025 - 2017',
            buttonColor: 'bg-purple1'
        },
        {
            id: 22,
            href: '/item',
            imageSrc: '/public/img/22.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '22716 - 2008',
            buttonColor: 'bg-purple-700'
        },
        {
            id: 23,
            href: '/item',
            imageSrc: '/public/img/23.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '22301 - 2019',
            buttonColor: 'bg-gray-500'
        },
        {
            id: 24,
            href: '/item',
            imageSrc: '/public/img/24.jpeg',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '24001 - 2015',
            buttonColor: 'bg-sky-500'
        },
        {
            id: 25,
            href: '/item',
            imageSrc: '/public/img/25.webp',
            imageAlt: "Front of men's Basic Tee in black.",
            title: 'Sistema de Gestión basada en la norma ',
            iso: '17021 - 2015',
            buttonColor: 'bg-sky-500'
        },
    ]
    return (
        <div>
            <div className='m-4'>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 rounded-md ">
                    {properties.map((product) => (
                        <div key={product.id} className="group relative shadow-lg">
                            <div className=''>
                                <div className="w-full overflow-hidden  bg-gray-200 lg:h-80 sm:h-60 ">
                                    <a href={product.href}>
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center md:h-auto md:w-full lg:h-full lg:w-full  inset-0 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                        />

                                    </a>
                                    {/* <FaRegHeart className="bg-white absolute top-5 right-2 py-1 px-3 rounded-full text-black text-[40px]" /> */}
                                    {/* <span className="bg-[#DC3545] absolute top-5 right-2 py-1 px-3 rounded-full text-white text-[10px]" >ID: {product.id}</span>
                                            <span className="bg-blue-800 absolute text-end bottom-36 right-2 py-1 px-3 rounded-full text-white text-[10px]" >{product.type}</span> */}
                                </div>
                            </div>
                            <div className='bg-white p-2 font-urbanist'>
                                <div className="mt-3 flex justify-between">
                                    <div className='ml-3 text-center'>
                                        <div>
                                            <p className="text-sm justify-center font-medium text-gray-700 mb-2 ">{product.title}</p>
                                        </div>
                                        <div className=' flex justify-center'>
                                            <p className='text-[20px] text- text-center font-bold'> {product.iso}</p>
                                        </div>
                                        <h3 className="text-sm text-gray-600 flex">
                                            {product.locate}
                                        </h3>
                                        <button className={`${product.buttonColor} text-white p-2 rounded-md`}>Conocer más</button>
                                    </div>
                                </div>
                                {/* <span className="bg-[#DC3545] absolute top-5 right-2 py-1 px-3 rounded-full text-white text-[10px]" >ID: {product.id}</span>
                                            <span className="bg-blue-800 absolute text-end bottom-36 right-2 py-1 px-3 rounded-full text-white text-[10px]" >{product.type}</span> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ItemSell