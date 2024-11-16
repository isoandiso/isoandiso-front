import React, { useState, useEffect } from 'react';
import Styles from './styles.module.css'

function RegistroEmpresa() {

  //(representación de la tabla "PAISES" la cual traeremos desde la base de datos)
  type Country={
    id: number,
    name: string
  }
  const [countries,setCountries] = useState<Country[]>([])

  //(representación de la tabla "EMPRESA" la cual traeremos desde la base de datos por medio del id de la empresa)
  type Company={
      id: number,
      email: string,
      phoneNumber: string,
      password: string,
      countryId: number | null
  }
  const [company,setCompany] = useState<Company>()

  useEffect(()=>{
    //(se traen los datos de los paises del backend)
    //fetch..
    setCountries([{id: 1,name: "Perú"},{id: 2,name: "Chile"},{id: 3,name: "Uruguay"}])

    //(se traen desde backend los datos de la companía)
    //fetch..
    setCompany(
      {
        id: 1,
        email: "email@email.com",
        phoneNumber: '1234567',
        password: '1234',
        countryId: 1
      }
    )
  },[])

  //SUBMITT
  function handleSubmit(event){
    event.preventDefault()
    document.getElementById("registroEmpresaForm")?.onsubmit
  }

  return (
              <form id="registroEmpresaForm" onSubmit={handleSubmit} style={{padding: '50px'}}>
                          {/*PRIMERA PARTE*/}
                          <div style={{display:'flex', flexDirection: 'column'}}>
                            <label><strong>Datos de la empresa:</strong></label>
                            <div><label>Ruc:</label><input required type="text" className={Styles.inputDecorated}/></div>
                            <div><label>Razón social:</label><input required type="text" className={Styles.inputDecorated}/></div>
                            <div><label>País:</label><input required type="text" className={Styles.inputDecorated} placeholder={countries.find((country)=>country.id == company?.countryId)?.name || ''} disabled/></div>
                            <div><label>Ciudad:</label><input required type="text" className={Styles.inputDecorated}/></div>
                            <div><label>Dirección:</label><input required type="text" className={Styles.inputDecorated}/></div>
                            <div><label>Actividad económica:</label><input required type="text" className={Styles.inputDecorated}/></div>
                            <div><label>Sector económico:</label><input required type="text" className={Styles.inputDecorated}/></div>
                            <br />
                            <label><strong>Tamaño de la empresa:</strong></label>
                            <select required name="tamañoempresa" className={Styles.inputDecorated}>
                              <option value="Micro Empresa">Micro Empresa</option>
                              <option value="Pequeña">Pequeña</option>
                              <option value="Mediana">Mediana</option>
                              <option value="Grande">Grande</option>
                            </select>
                          </div>

                          {/*SEGUNDA PARTE*/}
                          <div style={{alignContent: 'end'}}>
                              <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '300px' }}>
                                Registrar empresa
                              </button>
                          </div>
              </form>
  )
}

export default RegistroEmpresa;