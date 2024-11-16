import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Styles from './styles.module.css'

function AsignaciónSistemasDigitales() {

///(ID: MOOKEADO)
const [id,setId] = useState(0)

// ÁREAS
const [áreas, setÁreas] = useState<string[]>([]);

//ÁREA SELECCIONADA
const [áreaSelected, setÁreaSelected] = useState('')
function áreaSelectedhandle(index){
  setÁreaSelected(áreas[index])
}

// ISOS
const [isos, setIsos] = useState<{ value: string; label: string }[]>([]);
const [selectedIsos, setSelectedIsos] = useState<{ value: string; label: string }[]>([]);

const handleIsosChange = (selectedOptions) => {
  setSelectedIsos(selectedOptions || []);
};

const handleSubmit = (event) => {
    event.preventDefault();
    //(sí ya tiene en la lista el área que quiere agregar no la agrega a la lista)
    if(áreaSelected==''){
      alert("Seleccione un área")
    }else if(!áreasList.some((área) => área.nombre === áreaSelected)){
      const selectedValues = selectedIsos.map((iso) => iso.value);
      setId(id => id+1)
      setÁreasList(áreasList => [...áreasList, {id:id,nombre:áreaSelected,isos:selectedValues}])
      setSelectedIsos([])
      setÁreaSelected('')
      document.getElementById("asignaciónSistemasDigitalesForm")?.onsubmit
    }
};

//

//LISTA DE ÁREAS

//ÁREAS CON SUS ISOS
type Área = {
  id: number,
  nombre: string,
  isos:string[]
};
const [áreasList,setÁreasList] =useState<Área[]>([])

//ISOS DE LA LISTA SELECCIONADA
const [isosDelÁreaSeleccionadaEnLaLista,setIsosDelÁreaSeleccionadaEnLaLista] = useState<string[]>([])

//ÁREA SELECCIONADA EN LA LISTA DE ÁREAS
function áreaInÁreasListSelected(index){
  setIsosDelÁreaSeleccionadaEnLaLista(áreasList[index].isos)
}

//EN LA PRIMERA RENDERIZACIÓN SE LLAMA A LOS DATOS A BACKEND
useEffect(()=>{
  /*fetch.()...
  */

  //(llamamos a la base de datos para que nos de las áreas que registró el usuario en módulo ÁREAS/CARGOS)
  /*fetch.()...
  */
  //mook
  setÁreas(['Área1','Área2','Área3','Área4'])

  //(llamamos a la base de datos para que nos traiga todas las isos)
  /*fetch.()...
  */
  //mook
  setIsos([
    { value: 'ISO 9001', label: 'ISO 9001' },
    { value: 'ISO 45001', label: 'ISO 45001' },
    { value: 'ISO 14001', label: 'ISO 14001' },
    { value: 'ISO 27001', label: 'ISO 27001' },
    { value: 'ISO 19601', label: 'ISO 19601' },
    { value: 'ISO 20121', label: 'ISO 20121' },
    { value: 'ISO 30301', label: 'ISO 30301' },
    { value: 'ISO 39001', label: 'ISO 39001' },
    { value: 'ISO 13485', label: 'ISO 13485' },
    { value: 'ISO 22001', label: 'ISO 22001' },
    { value: 'ISO 50001', label: 'ISO 50001' },
    { value: 'ISO 21001', label: 'ISO 21001' },
    { value: 'ISO 28001', label: 'ISO 28001' },
    { value: 'ISO 37001', label: 'ISO 37001' },
    { value: 'ISO 17020', label: 'ISO 17020' },
    { value: 'ISO 29001', label: 'ISO 29001' },
    { value: 'ISO 26001', label: 'ISO 26001' },
    { value: 'ISO 15189', label: 'ISO 15189' },
    { value: 'ISO 27701', label: 'ISO 27701' },
    { value: 'ISO 16949', label: 'ISO 16949' },
    { value: 'ISO 17025', label: 'ISO 17025' },
    { value: 'ISO 22716', label: 'ISO 22716' },
    { value: 'ISO 22301', label: 'ISO 22301' },
    { value: 'ISO 24001', label: 'ISO 24001' },
    { value: 'ISO 17021', label: 'ISO 17021' },
  ]);
},[])

  return (

        <form id="asignaciónSistemasDigitalesForm" onSubmit={handleSubmit}>   
              
              <div style={{
                        display: 'flex', 
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        padding: '30px',
                        margin: '8px',
                        justifyContent: 'space-around'
                    }}>



                      {/* PRIMERA PARTE */}
                      <div>
                            <p><strong>Áreas:</strong></p>
                            <br />
                            {
                              áreas.map((área,index)=>{
                                return <p key={index} onClick={()=> áreaSelectedhandle(index)} style={{cursor:'pointer'}}>{área}</p>
                              })
                            }
                      </div>

                      {/* SEGUNDA PARTE */}
                      <div>
                            <p><strong>Isos:</strong></p>
                            <select required style={{ padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', width: '100%'}}>
                                {
                                  isos.length > 0
                                  
                                  &&
                                  
                                  <>
                                      <option value="">Seleccione sistema digital</option>
                                      {
                                        isos.map((iso,index) => 
                                          <option key={index} value={iso.value}>{iso.value}</option>
                                        )
                                      }
                                  </>
                                }
                            </select>
                      </div>

                      {/* TERCERA PARTE */}
                      <div style={{alignContent: 'end'}}>
                              <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px' }}>
                                Agregar
                              </button>
                      </div>
                      
                </div>

                {/*TABLA*/}
                {
                        áreasList.length > 0
                        
                        && 

                        <div style={{ display:'flex', justifyContent: 'space-between', margin:'20px'}}>
                                {/*areas */}
                                <div>
                                      <p><strong>Áreas:</strong></p>
                                      <div style={{display:'flex',flexDirection:'column-reverse'}}>
                                      {   
                                            áreasList.map((área, index) => 
                                                <div key={área.id} style={{cursor:'pointer'}} onClick={()=> áreaInÁreasListSelected(index)}>
                                                  <p>{área.nombre}</p>
                                                </div>
                                            )
                                      }
                                      </div>
                                      
                                </div>

                                {/*isos */}
                                <div style={{width:'75%'}}>
                                              <p><strong>Isos:</strong></p>
                                              <div style={{maxHeight: '140px', overflowY: 'scroll', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '10px',}}>
                                                  <div style={{cursor:'pointer'}}>
                                                    {
                                                      isosDelÁreaSeleccionadaEnLaLista.length == 0
                                                      
                                                      ? 

                                                      áreasList[áreasList.length-1].isos.map((iso, index) =>   
                                                        <p key={index} style={{margin:'4px 0px 4px 4px'}}>{iso}</p>
                                                      )

                                                      :

                                                      isosDelÁreaSeleccionadaEnLaLista.map((iso, index) =>   
                                                        <p key={index} style={{margin:'4px 0px 4px 4px'}}>{iso}</p>
                                                      )
                                                    }

                                                </div>
                                              </div>
                                  </div>
                        </div>
                      }
        </form>
      
  );
}

export default AsignaciónSistemasDigitales;