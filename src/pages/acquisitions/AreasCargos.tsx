import React, { useState, useEffect } from 'react';
import Styles from './styles.module.css'

function AreasCargos() {

  //FORMULARIO

  ///(ID: MOOKEADO)
  const [id,setId] = useState(0)
  //ÁREA
  const [área,setÁrea] = useState('')
  function áreaChange(event){
    setÁrea(event.target.value)
  }
  //CARGOS
  const [cargos, setCargos] = useState<string[]>(['', '', '', '', '', '', '','','','']);
  function cargoChange(index: number, event) {
    const newCargos = [...cargos];
    newCargos[index] = event.target.value;
    setCargos(newCargos);
  }
  //SUBMIT
  function handleSubmit(event){
    event.preventDefault();
    //(sí ya tiene en la lista el área que quiere agregar no la agrega a la lista)
    if(!áreas.some((áreaa) => áreaa.nombre === área)){
      setId(id => id+1)
      setÁreas(áreas => [...áreas, {id:id,nombre:área,cargos:cargos}])
      setÁrea('')
      setCargos(['', '', '', '', '', '', '','','',''])
      document.getElementById("áreasCargoForm")?.onsubmit
    }
  }

  //

  //LISTA DE ÁREAS

  //ÁREAS CON SUS CARGOS
  type Área = {
    id: number,
    nombre: string,
    cargos:string[]
  };
  const [ áreas,setÁreas] =useState<Área[]>([])  

  //CARGOS DE LA LISTA SELECCIONADA
  const [cargosDelÁreaSeleccionadaEnLaLista,setCargosDelÁreaSeleccionadaEnLaLista] = useState<string[]>([])

  //ÁREA SELECCIONADA EN LA LISTA DE ÁREAS
  function áreaInÁreasListSelected(index){
    setCargosDelÁreaSeleccionadaEnLaLista(áreas[index].cargos )
  }

  //EN LA PRIMERA RENDERIZACIÓN SE LLAMA A LOS DATOS A BACKEND
  useEffect(()=>{
    /*fetch.()...
    */
  },[])
  return (

        <form id="áreasCargoForm" onSubmit={handleSubmit}>   
              
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
                          <div style={{width: '75%'}}>
                              {/* Áreas */}
                              <div>
                                  <p><strong>Área:</strong></p>
                                  <input required name="área" type="text" className={Styles.inputDecorated} placeholder='Área' onChange={áreaChange} value={área}/>
                              </div>
                              
                              {/* Cargos */}
                              <div>
                                  <p><strong>Cargos:</strong></p>
                                  <div className={Styles.divAreasCargos_Cargos}>
                                    {cargos.map((cargo, index) => (
                                      <div key={index}>
                                        <input
                                          required={index==0}
                                          type="text"
                                          className={Styles.inputDecorated}
                                          placeholder={`Cargo ${index + 1}`}
                                          value={cargo}
                                          onChange={(event) => cargoChange(index, event)}
                                        />
                                        {index == 0 && <p style={{fontSize: '12px', color: 'red', marginBottom: '40px'}}> *Colocar aquí el cargo de mayor jerarquía, Ej: Jefe</p>}
                                      </div>
                                      
                                    ))}
                                  </div>
                              </div>
                              
                          </div>

                          <div style={{alignContent: 'end'}}>
                              <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px' }}>
                                Agregar
                              </button>
                          </div>
                      </div>

                      {/* SEGUNDA PARTE */}
                      {
                        áreas.length > 0
                        
                        && 

                        <div style={{ display:'flex', justifyContent: 'space-between', margin:'20px'}}>
                                {/*areas */}
                                <div style={{width:'25%'}}>
                                      <p><strong>Áreas:</strong></p>
                                      <div style={{display:'flex',flexDirection:'column-reverse'}}>
                                      {
                                            áreas.map((Área, index) => 
                                                <div key={Área.id} style={{cursor:'pointer'}} onClick={()=> áreaInÁreasListSelected(index)}>
                                                  <p>{Área.nombre}</p>
                                                </div>
                                            )
                                      }
                                      </div>
                                </div>

                                {/*cargos */}
                                <div style={{width:'75%'}}>
                                              <p><strong>Cargos:</strong></p>
                                              <div style={{maxHeight: '140px', overflowY: 'scroll', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '10px',}}>
                                                  <div style={{cursor:'pointer'}}>
                                                    {
                                                      cargosDelÁreaSeleccionadaEnLaLista.length == 0
                                                      
                                                      ? 

                                                      áreas[áreas.length-1].cargos.map((cargo, index) =>   
                                                        <p key={index} style={{margin:'4px 0px 4px 4px'}}>{cargo}</p>
                                                      )

                                                      :
                                                      
                                                      cargosDelÁreaSeleccionadaEnLaLista.map((cargo, index) =>   
                                                        <p key={index} style={{margin:'4px 0px 4px 4px'}}>{cargo}</p>
                                                      )
                                                    }

                                                </div>
                                              </div>
                                  </div>
                        </div>
                      }
                </div>
        </form>
      
  );
}

export default AreasCargos;