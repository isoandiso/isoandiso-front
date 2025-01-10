import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css'

function SistemasAdquiridos(props) {

  const user = props.user;

  return (
        <>
            <h1 style={{
                  paddingLeft: '60px',
                  fontSize: '30px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  backgroundColor:'#2c3792',
                  color:'white',
                  textAlign:'center'
              }}>
                  <strong>SISTEMAS ADQUIRIDOS</strong>
            </h1>
            <div className={Styles.sistemasadquiridosContainer}>
                    {/* NOMBRE DEL SEG */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>NOMBRE DEL SEG</strong>
                    </div>
                    {/* TIPO DE ADQUISICIÓN */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>TIPO DE ADQUISICIÓN</strong>
                    </div>
                    {/* FECHA ADQUIRIDA */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>FECHA ADQUIRIDA</strong>
                    </div>
                    {/* FECHA DE VENCIMIENTO */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>FECHA DE VENCIMIENTO</strong>
                    </div>
                    {/* FACTURA */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>FACTURA</strong>
                    </div>
            </div>

            {
                user.acquisitionIds.map((acquisition,index)=>
                    
                    <div key={index} className={Styles.sistemasadquiridosContainer}>
                          {/* ISOS */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                  acquisition.isoIds.map((iso,index)=>
                                    <p key={index}>{iso.name}</p>
                                  )
                              }
                          </div>
                              
                          {/* TIPO DE ADQUISICIÓN */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                <p>
                                    {acquisition.acquisitionTypeId.name}
                                </p>                                  
                              }
                          </div>
                          
                          {/* FECHA ADQUIRIDA */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                <p>
                                    {new Date(acquisition.acquisitionDate).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </p>                                  
                              }
                          </div>
              
                          {/* FECHA DE VENCIMIENTO */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                <p>
                                  {acquisition.expirationDate 
                                    ? new Date(acquisition.expirationDate).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) 
                                    : "-"}
                                </p>                     
                              }
                          </div>
              
                          {/* FACTURA */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                  <p>{acquisition.invoiceLink ? acquisition.invoiceLink : "-"}</p>
                              }
                          </div>
                    </div>
                )
            }

        </>
      
  );
}

export default SistemasAdquiridos;