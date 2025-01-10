import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import Styles from './styles.module.css'
import {apiCallsCompany,apiCallsCompanySite} from '../../settings/apiCalls'

function Sedes(props) {

const {user,getUser} = props;

//TYPE

//VARIABLES

const [name, setName] = useState<string>('');
const [address, setAddress] = useState<string>('');
const [city, setCity] = useState<string>('');
const [province, setProvince] = useState<string>('');
const [isSubmitting, setIsSubmitting] = useState(false);

//FUNCTIONS

//FRONTEND:

async function deleteOnClick(siteId){
    await apiCallsCompanySite._deleteCompanySite(siteId);
    await getUser();
}

async function _submit(event){
    event.preventDefault();
    setIsSubmitting(true);

    if([name,address,city,province].every((field) => field.trim() !== ""))
        {
            const regexOne = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/;
            const regexTwo = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/;
    
            if (!regexOne.test(city) || !regexOne.test(province) ) {
                await Swal.fire({
                    icon: 'warning',
                    text: '*asegurese de que los campos city y province no tengan números',
                    confirmButtonText: 'Entendido'
                });
                setIsSubmitting(false);
                return;
            }

            if (!regexTwo.test(address) && !regexTwo.test(name)) {
                await Swal.fire({
                    icon: 'warning',
                    text: '*el campo name de la sede y address solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios (solo entre palabras, no al principio ni al final), puntos (.) y guiones (-)',
                    confirmButtonText: 'Entendido'
                });
                setIsSubmitting(false);
                return;
            }
    
            const site = await apiCallsCompanySite._createCompanySite(name.trim(),address.trim(),city.trim(),province.trim());
            const company = site ? await apiCallsCompany._addSedeIdToCompany(user._id,site._id) : null;
    
            if (company) {
              // Si todas las respuestas fueron exitosas
              await Swal.fire({
                icon: 'success',
                text: 'Sede agregada correctamente !!!',
                confirmButtonText: 'Entendido'
              })
              await getUser();
              setIsSubmitting(false);
            }
        } else{
            await Swal.fire({
                icon: 'warning',
                text: '*ningún campo puede solo contener espacios o estár vacío',
                confirmButtonText: 'Entendido'
            });
            setIsSubmitting(false);
        }
};

//USE EFFECT

//DESIGN

  return (

        <form onSubmit={_submit} style={{height:'100%'}}>   

              <h1 style={{
                            paddingLeft: '60px',
                            fontSize: '30px',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                            backgroundColor:'#2c3792',
                            color:'white',
                            textAlign:'center'
                        }}>
                            <strong>SEDES</strong>
              </h1>
              
              <div style={{
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'start',
                        height:'100%'
                    }}>


                      {/* SEDES */}
                      <div style={{display:'flex', justifyContent: 'space-between', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px', borderRadius:'10px',padding:'40px',margin:'40px'}}>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div><label>Nombre de la sede:</label><input required type="text" placeholder='Nombre de la sede' className={Styles.inputDecorated} value={name} onChange={(e) => setName(e.target.value)} maxLength={100}/></div>
                            <div><label>Dirección:</label><input required type="text" placeholder='Dirección' className={Styles.inputDecorated} value={address} onChange={(e) => setAddress(e.target.value)} maxLength={200}/></div>
                            <div><label>Ciudad:</label><input required type="text" placeholder='Ciudad' className={Styles.inputDecorated} value={city} onChange={(e) => setCity(e.target.value)} maxLength={100}/></div>
                            <div><label>Provincia:</label><input required type="text" placeholder='Provincia' className={Styles.inputDecorated} value={province} onChange={(e) => setProvince(e.target.value)} maxLength={100}/></div>
                          </div>
                          <div style={{alignContent: 'end'}}>
                              <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: isSubmitting ? 'gray' : '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px' }} disabled={isSubmitting}>
                                Agregar
                              </button>
                          </div>
                      </div>

                      {/* TABLA */}
                      <div style={{padding:'36px', marginBottom:'40px'}}>
                      <table style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead style={{backgroundColor: '#0B25A4', color: 'white', border: '1px solid black'}}>
                                <tr>
                                    <th style={{border: '1px solid black', padding: '8px'}}>NOMBRE DE LA SEDE</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}>DIRECCIÓN</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}>CIUDAD</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}>PROVINCIA</th>
                                    <th style={{border: '1px solid black', padding: '8px'}}></th>
                                </tr>
                            </thead>

                            <tbody style={{textAlign: 'center'}}>
                                {
                                    user.siteIds.map((site, index) => {
                                        //no mostramos la sede principal para que no la pueda eliminar
                                        if (index > 0) return (
                                            <tr key={index} style={{border: '1px solid black'}}>
                                                <td style={{border: '1px solid black', padding: '8px'}}>
                                                    <p>{site.name}</p>
                                                </td>
                                                <td style={{border: '1px solid black', padding: '8px'}}>
                                                    <p>{site.address}</p>
                                                </td>
                                                <td style={{border: '1px solid black', padding: '8px'}}>
                                                    <p>{site.city}</p>
                                                </td>
                                                <td style={{border: '1px solid black', padding: '8px'}}>
                                                    <p>{site.province}</p>
                                                </td>
                                                <td style={{border: '1px solid black', padding: '8px'}}>
                                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                                        <MdDelete key={1} onClick={() => deleteOnClick(site._id)} style={{cursor: 'pointer', color: 'red'}} size={27}></MdDelete>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                      </div>

                </div>
        </form>
      
  );
}

export default Sedes;