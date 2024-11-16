import React, { useEffect, useState } from 'react';
import FilaSede from './FilaSede'
import Styles from './styles.module.css'

function Sedes() {

//ID
//(ID mookeado, borrar cuando se utilice los id de la sede que viene desde backend)
const [id, setId] = useState(0);
 
//SEDES
type Sede = {
    id: number,
    nombre: string,
    dirección: string,
    ciudad: string,
    provincia:string,
};

const [sedes, setSedes] = useState<Sede[]>([]);

//INPUTS
const [nombre, setNombre] = useState('');
const [dirección, setDirección] = useState('');
const [ciudad, setCiudad] = useState('');
const [provincia, setProvincia] = useState('');

function nombreChange(event){
    setNombre(event.target.value)
}
function direcciónChange(event){
    setDirección(event.target.value)
}
function ciudadChange(event){
    setCiudad(event.target.value)
}
function provinciaChange(event){
    setProvincia(event.target.value)
}


const handleSubmit = (event) => {
    event.preventDefault();
    
    //(validar todos los campos)
    //...

    //IF son todos válidos
    //(agrega los datos a backend)
    //...

    //IF se guarda correctamente en el backend
    //(agregamos la sede en la lista)
    //...
   
    //mook 
    setSedes(sedes => [
        ...sedes,
        {
            id: id,
            nombre: nombre,
            dirección: dirección,
            ciudad: ciudad,
            provincia: provincia,
        }
    ]);
    setId((prevId) => prevId + 1)

    //(limpiar inputs)
    setNombre('')
    setCiudad('')
    setDirección('')
    setProvincia('')

    document.getElementById("compraForm")?.onsubmit
    
};

function deleteSede(sedeId){
    //IF se borra correctamente en el backend
    //(sacamos la sede en la lista)
    //...

    //mook
    setSedes(sedes => sedes.filter(sede => sede.id !== sedeId));
}

//EN LA PRIMERA RENDERIZACIÓN SE LLAMA A LOS DATOS A BACKEND
useEffect(()=>{
    /*fetch.()...
    setSedes(sedes => [
        {
            id: id,
            nombre: nombre,
            dirección: dirección,
            ciudad: ciudad,
            provincia: provincia,
        }
    ]);*/
},[])

  return (

        <form id="sedesForm" onSubmit={handleSubmit}>   
              
              <div style={{
                        display: 'flex', 
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        padding: '60px',
                        margin: '8px',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>



                      {/* PRIMERA PARTE */}
                      <div style={{display:'flex', justifyContent: 'space-between', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px', borderRadius:'10px',padding:'15px', margin: '20px'}}>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div><label>Nombre de la sede:</label><input onChange={nombreChange} required type="text" placeholder='Nombre de la sede' className={Styles.inputDecorated} value={nombre}/></div>
                            <div><label>Dirección:</label><input onChange={direcciónChange} required type="text" placeholder='Dirección' className={Styles.inputDecorated} value={dirección}/></div>
                            <div><label>Ciudad:</label><input onChange={ciudadChange} required type="text" placeholder='Ciudad' className={Styles.inputDecorated} value={ciudad}/></div>
                            <div><label>Provincia:</label><input onChange={provinciaChange} required type="text" placeholder='Provincia' className={Styles.inputDecorated} value={provincia}/></div>
                          </div>
                          <div style={{alignContent: 'end'}}>
                              <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px' }}>
                                Agregar
                              </button>
                          </div>
                      </div>

                      {/* SEGUNDA PARTE */}

                      <table className={Styles.sede_table}>
                            <thead className={Styles.sede_table_th}>
                                <tr>
                                    <th>NOMBRE DE LA SEDE</th>
                                    <th>DIRECCIÓN</th>
                                    <th>CIUDAD</th>
                                    <th>PROVINCIA</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {/* TERCERA PARTE */}
                            {
                                sedes.map((sede)=>{
                                    return <FilaSede key={sede.id} nombre={sede.nombre} dirección={sede.dirección} ciudad={sede.ciudad} provincia={sede.provincia} deleteSede={()=> deleteSede(sede.id)}></FilaSede> 
                                })
                            }
                            </tbody>
                      </table>
                </div>
        </form>
      
  );
}

export default Sedes;