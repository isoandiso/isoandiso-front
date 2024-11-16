import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css'

function SistemasAdquiridos() {

  //(representación de la tabla "ISOS" la cual traeremos desde la base de datos)
  type Iso={
    id: number,
    name: string
  }
  const [isos,setIsos] = useState<Iso[]>([])

  //(representación de la tabla "ADQUISICIONES" la cual traeremos desde la base de datos)
  type Acquisition={
    id: number,
    acquisitionTypeId: number,
    companyId: number,
    acquisitionDate:Date,
    expirationDate:Date | null,
    isos:number[],
    facturaPDF:string,
  }
  const [acquisitions,setAcquisitions] = useState<Acquisition[]>([])

  useEffect(() => {

    //(se traen desde backend los isos)
    //fetch..
    setIsos([{id:1,name:'ISO 9001-2015'},{id:2,name:'ISO 45001-2018'},{id:3,name:'ISO 14001-2018'},{id:4,name:'ISO 27001-2022'},{id:5,name:'ISO 19601-2017'},{id:6,name:'ISO 20121-2024'},{id:7,name:'ISO 30301-2019'},{id:8,name:'ISO 39001-2018'},{id:9,name:'ISO 13485-2018'},{id:10,name:'ISO 22001-2018'},{id:11,name:'ISO 50001-2018'},{id:12,name:'ISO 21001-2018'},{id:13,name:'ISO 28001-2018'},{id:14,name:'ISO 37001-2018'},{id:15,name:'ISO 17020-2018 EMA'},{id:16,name:'ISO 29001-2020'},{id:17,name:'ISO 26001-2019'},{id:18,name:'ISO 15189-2023'},{id:19,name:'ISO 27701-2019'},{id:20,name:'ISO 16949-2016'},{id:21,name:'ISO 17025-2017'},{id:22,name:'ISO 22716-2008'},{id:23,name:'ISO 22301-2019'},{id:24,name:'ISO 24001-2015'},{id:25,name:'ISO 17021-2015'},{id:26,name:'SGRRHH'}])

    //(se traen desde backend la adquisición que se generó luego de concluida la adquisición en el apartado COMPRA)
    //fetch..

    setAcquisitions([
        {
            id: 1,
            acquisitionTypeId: 3,
            companyId: 1,
            acquisitionDate:new Date(),
            expirationDate:null,
            isos:[1,2,3],
            facturaPDF:"http://..."
        },
        {
            id: 2,
            acquisitionTypeId: 2,
            companyId: 1,
            acquisitionDate:new Date(),
            expirationDate:new Date(),
            isos:[4],
            facturaPDF:"http://..."
        },
        {
            id: 3,
            acquisitionTypeId: 2,
            companyId: 1,
            acquisitionDate:new Date(),
            expirationDate:new Date(),
            isos:[5,6],
            facturaPDF:"http://..."
        }
    ])
    
  },[])

  return (
        <>
            <div className={Styles.sistemasadquiridosContainer}>
                    {/* NOMBRE DEL SEG */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>NOMBRE DEL SEG</strong>
                    </div>
                    {/* FECHA ADQUIRIDA */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>FECHA ADQUIRIDA</strong>
                    </div>
                    {/* FECHA DE VENCIMIENTO */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>FECHA DE VENCIMIENTO</strong>
                    </div>
                    {/* FACTURAS */}
                    <div className={Styles.sistemasdquiridosContainerColumns}>
                        <strong>FACTURAS</strong>
                    </div>
            </div>

            {
                acquisitions

                &&

                acquisitions.map((acquisition,index)=>
                    
                    <div key={index} className={Styles.sistemasadquiridosContainer}>
                          {/* ISOS */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                  acquisition.isos.map((isoId,index)=>
                                    <p key={index}>{isos.find((iso)=>iso.id==isoId)?.name}</p>
                                  )
                              }
                          </div>
              
                          {/* FECHA ADQUIRIDA */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                    <p>{acquisition.acquisitionDate.toDateString()}</p>
                              }
                          </div>
              
                          {/* FECHA DE VENCIMIENTO */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                  <p>{acquisition.expirationDate ? acquisition.expirationDate.toDateString() : "-"}</p>
                              }
                          </div>
              
                          {/* FACTURA */}
                          <div className={Styles.sistemasdquiridosContainerColumns}>
                              {
                                  <p>{acquisition.facturaPDF}</p>
                              }
                          </div>
                    </div>
                )
            }

        </>
      
  );
}

export default SistemasAdquiridos;