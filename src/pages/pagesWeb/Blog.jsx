import React from 'react'
import { FaWhatsappSquare } from "react-icons/fa";
import { ImMail } from "react-icons/im";
import { BiSolidPhoneCall } from "react-icons/bi";

const people = [
    {
        name: 'Leslie Alexander',
        role: 'Coordinadora',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Glenda Yael Davila Arrieta',
        role: 'Encargada',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Mirta Chinchay Benites',
        role: 'Guía',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Mirta Chinchay Benites',
        role: 'Asesora',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

function Blog() {
    return (
        <div className="bg-gray-100 py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold  text-gray-900 sm:text-4xl text-center font-ubuntu ">Nuestro Blog</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 font-ubuntu ">
                        Resultados : del uso de nuestros sistemas.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 border-gray-300 font-urbanist">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6 border border-gray-100 shadow-md rounded-md">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7  text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                    <div className="">
                                        <button className=" text-green-500 py-1 px-2">
                                            <FaWhatsappSquare />
                                        </button>
                                        <button className=" text-blue-500 py-1 px-2">
                                            <ImMail />
                                        </button>
                                        <button className=" text-white bg-red-600 border-radios ">
                                            <BiSolidPhoneCall />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Blog