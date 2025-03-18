import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { CompanyAcquisition,CompanyArea,Iso } from "../../../../models/apiModels";
import apiCalls from '../../../../api/apiCalls'


function AsignaciónSistemasDigitales(props) {

const {company, getCompany} = props;

//VARIABLES

const [companyAreas, setCompanyAreas] = useState<CompanyArea[]>([]);
const [acquiredIsos,setAcquiredIsos] = useState<Iso[]>([]);
const [acquiredIsosNotAssignedInTheAreaSelected,setAcquiredIsosNotAssignedInTheAreaSelected] = useState<Iso[]>([]);

const [selectedArea,setSelectedArea] = useState<CompanyArea | null>(null);
const [selectedIsosIds,setSelectedIsosIds] = useState<string[]>([]);

const [isSubmitting, setIsSubmitting] = useState(false);

//FUNCIONES

//FRONTEND

async function deleteIsosOfArea(areaId:string) {
  await apiCalls.apiCallsCompanyArea._deleteIsosOfArea(areaId);
  await getCompany();
}

async function save(e){
  e.preventDefault();
  setIsSubmitting(true);

  if(selectedArea === null){
    await Swal.fire({
      icon: 'warning',
      text: 'Seleccione un área',
      confirmButtonText: 'Entendido'
    });
    setIsSubmitting(false);
    return
  }

  if(selectedIsosIds.length===0){
    await Swal.fire({
      icon: 'warning',
      text: 'Seleccione al menos una iso',
      confirmButtonText: 'Entendido'
    });
    setIsSubmitting(false);
    return
  }

  //guardamos las isos en el área
  const results = await Promise.all(
    selectedIsosIds.map((isoId) => apiCalls.apiCallsCompanyArea._addIso(selectedArea._id, isoId))
  );
  
  // Verifica si alguna de las llamadas no retorno su dato.
  const failedResults = selectedIsosIds.filter((_, index) => results[index] === undefined);
  
  if (failedResults.length > 0) {
    await Swal.fire({
      icon: 'error',
      text: 'Error en una o más asignaciones de las isos',
      confirmButtonText: 'Entendido'
    })
  } else{
    await Swal.fire({
      icon: 'success',
      text: 'Se agregó/agregaron las isos al área correctamente',
      confirmButtonText: 'Entendido'
    });
  }

  setSelectedIsosIds([]);
  await getCompany();
  setIsSubmitting(false);
}

//USE EFFECT

useEffect(() => {
  //agarramos todas las isos adquiridas
  const _acquiredIsos:Iso[] = company.acquisitionIds.flatMap((acquisition:CompanyAcquisition)=>acquisition.isoIds.map(iso=>iso));

  //si las isos "RRHH" y "ISO 9001" no se encuentran en las isos adquiridas las agregamos porque necesitará asignar dichas isos la empresa 
  async function addIsosRRHHAnd9001(){
    if(!_acquiredIsos.some(iso=>iso.name.startsWith("RRHH"))){ 
      _acquiredIsos.push(await apiCalls.apiCallsIso._getIsoByNameStartWith("RRHH"));
    }
    if(!_acquiredIsos.some(iso=>iso.name.startsWith("ISO 9001"))){
      _acquiredIsos.push(await apiCalls.apiCallsIso._getIsoByNameStartWith("ISO 9001"));
    }
  }
  addIsosRRHHAnd9001();
  
  setAcquiredIsos(_acquiredIsos);
},[]);

useEffect(() => {
  //agarramos todas las áreas de la empresa
  const _companyAreas:CompanyArea[] = company.areaIds; 
  setCompanyAreas(_companyAreas);

  let selectedAreaUpdated;
  if(selectedArea){
    selectedAreaUpdated = _companyAreas.find(area=>area._id===selectedArea._id);
  }

  if(selectedAreaUpdated){
    //actualizamos el area seleccionada con las isos que se le agregaron o eliminaron , si el área ya tiene todas las isos adquiridas asignadas entonces se le pondrá null
    const _acquiredIsos:Iso[] = company.acquisitionIds.flatMap((acquisition:CompanyAcquisition)=>acquisition.isoIds.map(iso=>iso));
    setSelectedArea((selectedAreaUpdated as CompanyArea).isoIds.length != _acquiredIsos.length ? selectedAreaUpdated : null);
    setCompanyAreas(_companyAreas);
  }else{
    setCompanyAreas(_companyAreas);
  }

},[company.areaIds]);

useEffect(() => {
  if(selectedArea){
    const _acquiredIsosNotAssignedInTheAreaSelected = acquiredIsos.filter(iso=>!selectedArea.isoIds.some(_iso=>_iso._id===iso._id));
    setAcquiredIsosNotAssignedInTheAreaSelected(_acquiredIsosNotAssignedInTheAreaSelected);
  }
},[selectedArea]);

//DESIGN

  return (

        <form onSubmit={()=>{}}>   

              <h1 style={{
                                paddingLeft: '60px',
                                fontSize: '30px',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                backgroundColor:'#2c3792',
                                color:'white',
                                textAlign:'center'
                            }}>
                                <strong>ASIGNACIÓN  DE SISTEMAS DIGITALES</strong>
              </h1>
              
              <div style={{
                        display: 'flex', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        padding: '30px',
                        margin: '8px',
                        justifyContent: 'space-around'
                    }}>

                      {/* ÁREAS E ISOS */}
                      <div>
                            <p style={{marginBottom:'15px'}}><strong>Áreas:</strong></p>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              
                              {/* //Mostramos todas las áreas que no tienen asignadas ninguna iso */}
                              <select className={Styles.inputDecorated} onChange={(e)=> {setSelectedArea(companyAreas.find(area=>area._id === e.target.value) || null);setSelectedIsosIds([]);}} value={selectedArea ? selectedArea._id : ""}>
                                <option value="">Seleccione un área</option>
                                {
                                    companyAreas
                                    //filtramos para mostrar solo las áreas que no tienen todas las isos asignadas y que por endé se le pueden seguir asignando isos
                                    .filter(area=>area.isoIds.length != acquiredIsos.length)
                                    .map((companyArea,companyAreaIndex)=>{
                                      return <option key={companyAreaIndex} value={companyArea._id}>{companyArea.name}</option>
                                    })
                                }
                              </select>
                              <br />
                              {
                                selectedArea &&

                                //Mostramos todas las isos adquiridas que no están asignadas al área seleccionada
                                <>
                                  <p style={{marginBottom:'15px'}}><strong>Isos:</strong></p>
                                  <div>
                                      {
                                        acquiredIsosNotAssignedInTheAreaSelected
                                        .map((iso,isoIndex)=>{
                                          return <div key={isoIndex}>
                                                    <input key={isoIndex} type="checkbox" name="ISOS" value={iso._id} 
                                                    checked={selectedIsosIds.includes(iso._id)}
                                                    onChange={(e) => {
                                                    //saca o no el iso del "selectedIsos" dependiendo si el usuario lo checkea o descheckea
                                                    setSelectedIsosIds((prev) => {
                                                      if (e.target.checked) {
                                                        return [...prev, iso._id];
                                                      } else {
                                                        return prev.filter((id) => id !== iso._id);
                                                      }
                                                    })}}/>
                                                    <label style={{marginLeft: '8px'}}>{iso.name}</label>
                                                </div> 
                                        })
                                      }
                                  </div>
                                </>
                              }
                            </div>
                      </div>

                      {/* SUBMIT */}
                      <div style={{alignContent: 'end'}}>
                              <button disabled={isSubmitting} type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: isSubmitting ? 'gray' : '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px' }} onClick={(e)=>save(e)}>
                                Guardar
                              </button>
                      </div>
                </div>

                {/* TABLA */}
                <div style={{padding:'36px', marginBottom:'40px'}}>
                        <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead style={{backgroundColor: '#0B25A4', color: 'white', border: '1px solid black'}}>
                                    <tr>
                                        <th style={{border: '1px solid black', padding: '8px'}}>NOMBRE DEL ÁREA</th>
                                        <th style={{border: '1px solid black', padding: '8px'}}>ISOS ASIGNADAS</th>
                                        <th style={{border: '1px solid black', padding: '8px'}}></th>
                                    </tr>
                                </thead>

                                <tbody style={{textAlign: 'center'}}>
                                {
                                        //Areas con isos asignadas
                                        companyAreas.filter(area=>area.isoIds.length>0)
                                        .map((area: CompanyArea, index) => {

                                          // Generamos la fila de la tabla
                                          return (
                                            <tr key={index} style={{ border: '1px solid black' }}>
                                              <td style={{ border: '1px solid black', padding: '8px' }}>
                                                <p>{area.name}</p>
                                              </td>

                                              <td style={{ border: '1px solid black', padding: '8px' }}>
                                                {area.isoIds.map((iso, isoIndex) => (
                                                    <p key={isoIndex}>{iso.name}</p>
                                                  ))}
                                              </td>

                                              <td style={{ border: '1px solid black', padding: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                  <MdDelete
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                    size={27}
                                                    onClick={()=>deleteIsosOfArea(area._id)}
                                                  />
                                                </div>
                                              </td>
                                            </tr>
                                          );
                                        })
                                }
                                </tbody>
                        </table>
                </div>
        </form>
      
  );
}

export default AsignaciónSistemasDigitales;