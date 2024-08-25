import React, { useState, useEffect } from 'react'
import ItemSell from '../../components/items/ItemSell';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import PrestenText from '../../components/iaIntegrated/PrestenText';
import bg from '/public/video/intro.mp4'
import Flyer2 from '../../components/home/flyers/Flyer2';

const images = [
    {
        original: "/public/img/7.webp",
        thumbnail: "/public/img/5.jpeg",
    },
    {
        original: "/public/img/1.webp",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "/public/img/12.webp",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];

function HomeAI() {

    const [classText, setClassText] = useState('');
    const [showText, setShowText] = useState(true);
    const [textIndex, setTextIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    function efect() {
        if (showText) {
            setClassText('translate-y-0 opacity-1');
        } else {
            setClassText("translate-y-[-100px] opacity-0");
        }
    }

    useEffect(() => {
        efect();
    }, [textIndex]);
    const textContent = [
        'Nuestra página web está impulsada por la última tecnología en inteligencia artificial.',
        'IA integrada para una experiencia mejorada.',
        'Descubre la magia de la IA en nuestro sitio.',
        'Experimenta la diferencia con nuestra página web, potenciada por inteligencia artificial.',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeOut(true);
            setTimeout(() => {
                setShowText(!showText);
                setTextIndex((prevIndex) => (prevIndex + 1) % textContent.length);
                setFadeOut(false);
                efect();
            }, 1000); // Retraso de 1 segundo antes de mostrar el nuevo texto
        }, 2000); // Cambia cada 3 segundos

        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <div className='relative w-full h-120 overflow-hidden bg-cover bg-center '>
                {/* <div className='absolute w-full h-120'>
                    <ImageGallery items={images}
                        showThumbnails={false}
                        showNav={false}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        autoPlay={true}
                    />
                </div> */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={bg}
                    autoPlay
                    loop
                    muted
                />

                <div className='relative h-120 w-full  bg-black bg-opacity-50 '>
                    <PrestenText />
                </div>
                {/* <div
                    className={` absolute top-5 text-center py-1 px-3 rounded-full font-bold text-white transition-all duration-1000 font-ubuntu  text-4xl ${classText} `}
                >
                    {textContent[textIndex]}
                </div> */}
            </div>
            <div className='mt-4'>
                <Flyer2 />
            </div>
            <div className=''>
                <h4 className="text-[45px] font-bold  text-gray-700 text-center p-4 font-ubuntu ">Galería de imágenes</h4>
            </div>
            <div className='overflow-hidden bg-cover bg-center w-full h-120 mt-6'>
                <ImageGallery items={images}
                    showThumbnails={false}
                    showNav={false}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    autoPlay={true}
                />
            </div>

            <div className=''>
                <ItemSell />
            </div>
        </div>
    )
}

export default HomeAI