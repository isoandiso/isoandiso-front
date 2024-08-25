import React, { useState } from "react"
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

function SendMsg({ whatsappLink }) {
    const [isChecked, setIsChecked] = useState(false);
    const [inputValues, setInputValues] = useState({
        campo1: "",
        campo2: "",
        campo3: ""
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Verificar si algún campo está vacío
        const isEmpty = Object.values(inputValues).some(value => value.trim() === "");
        if (isEmpty) {
            setShowAlert(true);
        } else {
            // Aquí puedes hacer cualquier cosa que necesites con los valores de los campos de entrada cuando no están vacíos
            setShowAlert(false);
        }
    };
    return (
        <div className="mx-auto ">
            <div className="border rounded border-gray-400 p-4 pb-12">
                <h2 className="text-base font-semibold my-2 text-gray-900">Enviar mensaje</h2>
                <form className="space-y-3">
                    <div className="col-span-full">
                        <label
                            htmlFor="email"
                            className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="email"
                                id="email"
                                className="p-1 rounded peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="G-mail"
                                required
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-100 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                G-mail
                            </span>
                        </label>
                    </div>
                    <div className="col-span-full">
                        <label
                            htmlFor="firstName"
                            className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="text"
                                id="firstName"
                                className="peer p-1  rounded border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="Nombres"
                                required
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-100 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Nombres
                            </span>
                        </label>
                    </div>
                    <div className="col-span-full">
                        <label
                            htmlFor="lastName"
                            className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="text"
                                id="lastName"
                                className="p-1 peer rounded border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="Apellidos"
                                required
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-100 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Apellidos
                            </span>
                        </label>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="phone"
                            className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <input
                                type="tel"
                                id="phone"
                                className="p-1 peer rounded border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="Celular"
                                required
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-100 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Celular
                            </span>
                        </label>
                    </div>
                    <div className="col-span-full">
                        <label
                            htmlFor="message"
                            className="relative border border-gray-200 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 block text-sm font-medium leading-6 text-gray-900"
                        >
                            <textarea
                                id="message"
                                className="p-1 peer rounded border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                                placeholder="Mensaje"
                                rows="4"
                                required
                            ></textarea>
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-100 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Mensaje
                            </span>
                        </label>
                    </div>
                    <div className="col-span-full flex items-center mt-3">
                        <input type="checkbox" className="m-1 p-3 rounded form-checkbox h-5 w-5 text-green-500" required />
                        <span className="text-[12px]">Acepto los Términos y Condiciones de Uso y las políticas de privacidad.</span>
                    </div>
                    <div className="col-span-full flex items-center mt-3">
                        <input
                            type="checkbox"
                            id="additionalInfo"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            className="m-1 p-3 rounded form-checkbox h-5 w-5 text-green-500"
                        />
                        <span className="text-[12px]">Autorizo el uso de mi información para fines adicionales.</span>
                    </div>

                    <button type="submit" className="bg-green-500 flex items-center justify-center gap-2 rounded w-full p-2  text-white hover:bg-gray-300 hover:text-black">
                        Contactar <CiMail className="text-xl" />
                    </button>

                    <Link to={whatsappLink} target="_blank" className="bg-green-500 text-center text-white p-2 rounded w-full my-3 transition-colors duration-300 flex items-center gap-2 justify-center hover:bg-green-700">
                        Contactar por Whattsap <FaWhatsapp className="text-xl" />
                    </Link>
                </form>
            </div>
        </div>

    )
}

export default SendMsg