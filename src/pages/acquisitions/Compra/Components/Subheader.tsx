import React from "react";

export default function Subheader(){
    
    return <div style={{padding: '30px'}}>
                {/* LOGO */}
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <div>
                    <img src="/img/logoss.png" alt="" width="70" height="20" />
                </div>
                </div>
                {/* TÍTULO Y PARRAFO */}
                <div style={{ fontSize: '35px', width: '100%' }}>
                    <p style={{ marginTop: '30px', marginBottom: '15px' }}><strong>Seleccione su País y Sistema Digital</strong></p>
                    <p style={{ fontSize: '20px' }}>Para comenzar, por favor seleccione su país de origen y las normas ISO que desea adquirir. Esto nos permitirá ofrecerle información y servicios personalizados, adaptados a sus necesidades específicas y al entorno regulatorio de su región.</p>
                </div>
           </div>
}