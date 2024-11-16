import React, { useEffect, useState } from 'react';
import { FiAlertCircle } from "react-icons/fi";

function Compra() {

  //CONSTANTE ID DE LA EMPRESA QUE SE AGARRA DESDE EL TOKEN
  const empresa_id = "1234"

  //TABLAS

  //iso
  type Iso = {
    _id: string;
    nombre: string;
  }

  //pais
  type Pais = {
    _id: string;
    nombre: string;
    isosHabilitadas: Iso[];
  };

  //tipo de adquisicion
  type TipoDeAdquisicion={
    _id: string,
    nombre: string
  }
  
  //adquisicion empresa
  type AdquisicionEmpresa = {
    _id: string;
    isos: Iso[];
  };

  //dato empresa
  type DatoEmpresa = {
    _id: string;
    pais: Pais;
    adquisiciones: AdquisicionEmpresa[];
  };

  //VARiABLES DE ESTADO

  const [isos,setIsos] = useState<Iso[]>([])
  const [paisesConIsosHabilitadas,setPaisesConIsosHabilitadas] = useState<Pais[]>([])
  const [tiposDeAdquisiciones,setTiposDeAdquisiciones] = useState<TipoDeAdquisicion[]>([])
  const [datoEmpresa, setDatoEmpresa] = useState<DatoEmpresa | null>(null);
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>()
  const [tipoDeAdquisicionSeleccionado, setTipoDeAdquisicionSeleccionado] = useState<TipoDeAdquisicion>()

  //HANDLERS

  function selectPaisesChange(event){
    if(event.target.value == ""){
      setPaisSeleccionado(null)
    } else{
      const paisSeleccionado = paisesConIsosHabilitadas.find(pais => pais.nombre === event.target.value)
      setPaisSeleccionado(paisSeleccionado)
    }
  }
  function tipoDeAdquisicionElegida(event){
    setTipoDeAdquisicionSeleccionado(event.target.value)
  }
  function handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target);
    const selectedIsos = formData.getAll("ISOS");

    console.log(selectedIsos[0])


    //(este if de validación es solo por tema de seguridad de "hackeo" del front)
    if(
      (paisesConIsosHabilitadas.some(pais => pais === paisSeleccionado)) && 
      ()
  
  
  
  ){
  
    }

    //agarro el tipo de adquisición seleccionado

    //creamos la adquisición y la guardamos en las adquisiciones de la empresa
    const crearAdquisicion = async () => {
      const data = {
        isos: ["ISO_ID_1", "ISO_ID_2"], // IDs de ISO
        tipoAdquisicion: "TIPO_ADQUISICION_ID", // ID de tipo de adquisición
        fechaAdquisicion: new Date(), // Fecha de adquisición
        linkFactura: "https://enlaceafactura.com/factura123" // Enlace de la factura
      };

      try {
        const response = await fetch("http://localhost:4000/adquisicion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Error al crear la adquisición");
        }

        const nuevaAdquisicion = await response.json();
        console.log("Adquisición creada:", nuevaAdquisicion);
      } catch (error) {
        console.error(error);
      }
    };

  }

  //USE EFFECT

  useEffect(() => {

    //isos
    const fetchIsos = async () => {
      try {
          const response = await fetch('http://localhost:3000/iso');
          if (!response.ok) {
              throw new Error('Error al obtener las isos');
          }
          const data: Iso[] = await response.json();
          setIsos(data);
      } catch (error) {
          alert(error.message);
      }
    };
    fetchIsos();

    //tipos de adquisiciónes
    const fetchTiposDeAdquisiciones = async () => {
      try {
          const response = await fetch('http://localhost:3000/tipodeadquisicion');
          if (!response.ok) {
              throw new Error('Error al obtener los tipos de adquisiciones');
          }
          const data: TipoDeAdquisicion[] = await response.json();
          setTiposDeAdquisiciones(data);
      } catch (error) {
          alert(error.message);
      }
    };
    fetchTiposDeAdquisiciones();
    
    //dato empresa
    const fetchDatoEmpresa = async () => {
      try {
          const response = await fetch(`http://localhost:3000/registroEmpresa/${empresa_id}`);
          if (!response.ok) {
              throw new Error('Error al obtener el registro empresa');
          }
          const data = await response.json();
          if(data.datoEmpresa != null){
            setDatoEmpresa({_id:data.datoEmpresa._id,pais:data.datoEmpresa.pais,adquisiciones:data.datoEmpresa.adquisiciones });
          }
      } catch (error) {
          alert(error.message);
      }
    };
    fetchDatoEmpresa();

    //si DatoEmpresa no es igual a null quiere decir que la empresa nunca hizo una adquisición todavía, entonces no me traigo todos los paises que tienen al menos una iso hbilitada en él
    if(datoEmpresa === null){
        //paises (se traen todos los países en donde se tenga al menos una iso habilitada (el endpoint también trae dichas isos habilitadas en cada país))
        const fetchPaisesConIsosHabilitadas = async () => {
          try {
              const response = await fetch('http://localhost:3000/pais/paisesconisoshabilitadas');
              if (!response.ok) {
                  throw new Error('Error al obtener los países con isos habilitadas');
              }
              const data: Pais[] = await response.json();
              setPaisesConIsosHabilitadas(data);
          } catch (error) {
              alert(error.message);
          }
        };
        fetchPaisesConIsosHabilitadas();
    }
    else{
        //paises (traigo el pais que la empresa había registrado con las isos habilitadas en él)
        const fetchPais = async () => {
          try {
              const response = await fetch(`http://localhost:3000/pais/${datoEmpresa.pais._id}`);
              if (!response.ok) {
                  throw new Error('Error al obtener los países con isos habilitadas');
              }
              const data: Pais[] = await response.json();
              setPaisesConIsosHabilitadas(data);
          } catch (error) {
              alert(error.message);
          }
        };
        fetchPais();
    }

  },[])

  return (
    <form id="compraForm" onSubmit={handleSubmit}>
      <div style={{
          display: 'flex', 
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          padding: '60px',
          margin: '8px',
          flexDirection: 'column'
      }}>
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
        {/* PAISES */}
        {
          (datoEmpresa === null) &&

          <div style={{ fontSize: '18px', width: '100%' }}>
                  <div style={{ marginTop: '30px', marginBottom: '15px', display: 'flex' }}>
                    <p><strong>Seleccione su País</strong></p>
                    <p style={{ color: 'red', marginLeft: '2px' }}>*</p>
                    <FiAlertCircle style={{ alignSelf: 'center', marginLeft: '4px' }} />
                  </div>
                  {/* SELECT DE PAÍSES */}
                  <div>
                    <select required style={{ padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }} onChange={()=>selectPaisesChange}>
                          <option value="">Seleccione un país</option>
                           {
                              paisesConIsosHabilitadas.map((país,index) =>{
                                return  <option key={index} value={país.nombre}>{país.nombre}</option>
                              })
                           }    
                    </select>
                  </div>
          </div>
        }
        {/* ISOS */}
        <div style={{ fontSize: '18px', width: '100%' }}>
          <div style={{ marginTop: '30px', marginBottom: '15px', display: 'flex' }}>
            <p><strong>Seleccione los ISO</strong></p>
            <p style={{ color: 'red', marginLeft: '2px' }}>*</p>
            <FiAlertCircle style={{ alignSelf: 'center', marginLeft: '4px' }} />
          </div>
          {/* CHECKBOXS */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{display: 'flex', flexDirection: 'column', margin: '15px',maxHeight:'140px',flexWrap:'wrap',width: '100%',overflowY:'auto'}}>
              {
                 paisSeleccionado 
                 &&
                 isos.map((iso,index) => {
                    return <div key={index}>
                              <input type="checkbox" name="ISOS" value={iso.nombre} disabled={(!paisSeleccionado.isosHabilitadas.some(isosDelPaisSeleccionado => isosDelPaisSeleccionado.nombre === iso.nombre)) || (datoEmpresa?.adquisiciones.some(adquisicion => adquisicion.isos.some(isoDeAdqusicion => isoDeAdqusicion.nombre === iso.nombre)))}/>
                              <label style={{marginLeft: '8px'}}>{iso.nombre}</label>
                          </div> 
                 })
              }
            </div>
          </div>
        </div>
        {/* BUTTONS */}
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          {
            tiposDeAdquisiciones.map((tipodeadquisicion)=>{
                return <button onClick={()=>tipoDeAdquisicionElegida(tipodeadquisicion)} type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px', marginLeft: '10px' }}>
                          {tipodeadquisicion.nombre}
                      </button>
            })
          }
          </div>
      </div>
    </form>
  )
}

export default Compra;