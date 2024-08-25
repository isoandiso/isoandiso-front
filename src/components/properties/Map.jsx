import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// const Map = (props) => {
//     const position = [-18.0070, -70.2539]; // Coordenadas de Tacna, Perú

//     return (
//         <div className="w-full h-[500px] rounded-lg shadow-lg mt-8 mb-8 mx-auto">
//             <MapContainer center={position} zoom={14} className="w-full h-full rounded-lg">
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker position={position}>
//                     <Popup>
//                         Tacna, Perú
//                     </Popup>
//                 </Marker>
//             </MapContainer>
//         </div>
//     );
// };

// export default Map;

const Map = () => {
    const [polygonCoords] = useState([
        [-18.0070, -70.2525], [-18.0079, -70.2535], [-18.0085, -70.2539], [-18.0070, -70.2539]
    ]);


    return (
        <MapContainer center={[-18.0070, -70.2539]} zoom={15} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Polygon
                positions={polygonCoords}
                pathOptions={{ color: 'blue' }}
            >
                <Popup>
                    <p>Gal Ciudad de Tacna</p>
                </Popup>
            </Polygon>
        </MapContainer>
    );
};

export default Map;