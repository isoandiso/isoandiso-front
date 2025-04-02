import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import Styles from './styles.module.css'
import _api_calls_company from 'src/api/apicalls/_api_calls_company';
import _api_calls_company_area from 'src/api/apicalls/_api_calls_company_area';
import { Company } from 'src/models/apimodels/Company';

function AreasCargos({company,getCompany}:{ company: Company; getCompany: () => Promise<void> }) {

  //VARIABLES

  const [name,setName] = useState('')
  const [charges, setCharges] = useState<string[]>(Array(10).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);

  //FUNCIONES

  //FRONTEND

  async function deleteOnClick(siteId:string){
    await _api_calls_company_area._deleteCompanyArea(siteId);
    await getCompany();
  }

  function _handleInputChange(index: number, value: string) {
    const newCargos = [...charges];
    newCargos[index] = value;
    setCharges(newCargos);
  };
  
  async function _submit(event:React.FormEvent){
    event.preventDefault();
    setIsSubmitting(true)
    const filteredCargos = charges.filter((charge) => charge.trim() !== "");
    if(name!='' && filteredCargos.length != 0){
      const area = await _api_calls_company_area._createCompanyArea(name.trim(),filteredCargos)
      const _company = area ? await _api_calls_company._addAreaIdToCompany(company._id,area._id) : null;
      if (_company){
        // Si todas las respuestas fueron exitosas
        await Swal.fire({
          icon: 'success',
          text: 'Area agregada correctamente !!!',
          confirmButtonText: 'Entendido'
        })
        await getCompany();
        setIsSubmitting(false);
      }
    }
  }

  //USE EFFECT

  //DESSIGN
  
  return (

        <form onSubmit={_submit}>   

              <h1 style={{
                                paddingLeft: '60px',
                                fontSize: '30px',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                backgroundColor:'#2c3792',
                                color:'white',
                                textAlign:'center'
                            }}>
                                <strong>AREAS/CARGOS</strong>
              </h1>
              
              <div style={{
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>

                      <div style={{display:'flex', justifyContent: 'space-between', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px', borderRadius:'10px',padding:'15px', margin: '20px'}}>
                          
                          {/* ÁREAS Y CARGOS */}
                          <div style={{width: '75%'}}>
                              {/* Área */}
                              <div>
                                  <p><strong>Área:</strong></p>
                                  <input required name="área" type="text" className={Styles.inputDecorated} placeholder='Área' value={name} onChange={(e) => setName(e.target.value)} maxLength={100}/>
                              </div>
                              
                              {/* Cargos */}
                              <div>
                                  <p>
                                    <strong>Cargos:</strong>
                                  </p>
                                  <div style={{display:'flex',flexWrap:'wrap'}}>
                                      {charges.map((charge, index) => (
                                        <div key={index} style={{ marginBottom: "10px" }}>
                                          <input
                                            type="text"
                                            className={Styles.inputDecorated}
                                            placeholder={`Cargo ${index + 1}`}
                                            value={charge}
                                            onChange={(e)=> _handleInputChange(index, e.target.value)}
                                            maxLength={100}
                                            required={index === 0}
                                          />
                                          {index === 0 && <p style={{fontSize: '12px', color: 'red', fontStyle:'italic'}}> *colocar aquí el cargo de mayor jerarquía, Ej: Jefe.</p>}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                          </div>

                          {/* SUBMIT */}
                          <div style={{alignContent: 'end'}}>
                                  <button disabled={isSubmitting} type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: isSubmitting ? 'gray' : '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px' }}>
                                    Agregar
                                  </button>
                          </div>

                      </div>

                      {/* TABLA */}
                      <div style={{padding:'36px', marginBottom:'40px'}}>
                      <table style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead style={{backgroundColor: '#0B25A4', color: 'white', border: '1px solid black'}}>
                                <tr>
                                    <th style={{border: '1px solid black', padding: '8px'}}>NOMBRE DEL ÁREA</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}>CARGOS</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}></th>
                                </tr>
                            </thead>

                            <tbody style={{textAlign: 'center'}}>
                                {
                                    company.areaIds?.map((area, index) => {
                                        return (
                                            <tr key={index} style={{border: '1px solid black'}}>
                                                <td style={{border: '1px solid black', padding: '8px'}}>
                                                    <p>{area.name}</p>
                                                </td>
                                                
                                                <td style={{border: '1px solid black', padding: '8px'}}>
                                                    {area.charges.map((charge,index)=>{
                                                      return (
                                                        <p key={index}>{charge}</p>
                                                      )
                                                    })}
                                                </td>

                                                <td style={{border: '1px solid black', padding: '8px'}}>
                                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                                        <MdDelete key={1} onClick={() => deleteOnClick(area._id)} style={{cursor: 'pointer', color: 'red'}} size={27}></MdDelete>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                      </div>
                </div>
        </form>
      
  );
}

export default AreasCargos;