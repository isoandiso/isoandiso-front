import { useState } from 'react';
import Swal from 'sweetalert2';
import Styles from './styles.module.css'
import apiCalls from '../../../../api/apiCalls'
import { Company } from 'src/models/apimodels/Company';

function RegistroEmpresa({company,getCompany,handleViewChange}:{ company: Company; getCompany: () => Promise<void>; handleViewChange:(view: string) => void }) {

  //VARIABLES

  const [ruc, setRuc] = useState<string>("");
  const [socialReason, setsocialReason] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [economicActivity, setEconomicActivity] = useState<string>("");
  const [economicSector, setEconomicSector] = useState<string>("");
  const [companySize, setCompanySize] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  //FUNCTIONS

  //FRONTEND:

  async function _submit(event:React.FormEvent){
    event.preventDefault()
    setIsSubmitting(true);

    if([ruc, socialReason, province, city, address, economicActivity, economicSector, companySize].every((field) => field.trim() !== ""))
    {
        const regexOne = /^[a-zA-Z0-9.-]+$/;
        const regexTwo = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/;
        const regexThree = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/;

        if((!regexOne.test(ruc))){
            await Swal.fire({
              icon: 'warning',
              title: 'INGRESE UN RUC VÁLIDO',
              text: '*no debe haber ningún espacio y se permiten solo números, letras (mayúsculas y minúsculas), guiones (-) y puntos (.)',
              confirmButtonText: 'Entendido'
            });
            setIsSubmitting(false);
            return;
        }

        if (!regexTwo.test(socialReason)) {
            await Swal.fire({
                icon: 'warning',
                title: 'REVISE EL CAMPO RAZÓN SOCIAL',
                text: '*el campo solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios (solo entre palabras, no al principio ni al final), puntos (.) y guiones (-)',
                confirmButtonText: 'Entendido'
            });
            setIsSubmitting(false);
            return;
        }

        if (!regexThree.test(province)) {
          await Swal.fire({
              icon: 'warning',
              title: 'REVISE EL CAMPO PROVINCIA',
              text: '*el campo provincia no acepta números.',
              confirmButtonText: 'Entendido'
          });
          setIsSubmitting(false);
          return;
        }

        if (!regexThree.test(city)) {
            await Swal.fire({
                icon: 'warning',
                title: 'REVISE EL CAMPO CIUDAD',
                text: '*el campo ciudad no acepta números.',
                confirmButtonText: 'Entendido'
            });
            setIsSubmitting(false);
            return;
        }

        if (!regexTwo.test(address)) {
            await Swal.fire({
                icon: 'warning',
                title: 'REVISE EL CAMPO DIRECCIÓN',
                text: '*el campo solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios (solo entre palabras, no al principio ni al final), puntos (.) y guiones (-)',
                confirmButtonText: 'Entendido'
            });
            setIsSubmitting(false);
            return;
        }

        if (!regexTwo.test(economicActivity)) {
            await Swal.fire({
                icon: 'warning',
                title: 'REVISE EL CAMPO ACTIVIDAD ECONÓMICA',
                text: '*el campo solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios (solo entre palabras, no al principio ni al final), puntos (.) y guiones (-)',
                confirmButtonText: 'Entendido'
            });
            setIsSubmitting(false);
            return;
        }

        if (!regexTwo.test(economicSector)) {
            await Swal.fire({
                icon: 'warning',
                title: 'REVISE EL CAMPO SECTOR ECONÓMICO',
                text: '*el campo solo acepta letras (incluyendo acentos y caracteres latinos especiales), números, espacios (solo entre palabras, no al principio ni al final), puntos (.) y guiones (-)',
                confirmButtonText: 'Entendido'
            });
            setIsSubmitting(false);
            return;
        }

        const rucResponse = await apiCalls.apiCallsCompany._updateRuc(company._id,ruc.trim());
        const socialReasonResponse = await apiCalls.apiCallsCompany._updateSocialReason(company._id,socialReason.trim());
        const provinceResponse = await apiCalls.apiCallsCompany._updateProvince(company._id,province.trim());
        const cityResponse = await apiCalls.apiCallsCompany._updateCity(company._id,city.trim());
        const addressResponse = await apiCalls.apiCallsCompany._updateAddress(company._id,address.trim());
        const economicActivityResponse = await apiCalls.apiCallsCompany._updateEconomicActivity(company._id,economicActivity.trim());
        const economicSectorResponse = await  apiCalls.apiCallsCompany._updateEconomicSector(company._id,economicSector.trim());
        const companySizeResponse = await apiCalls.apiCallsCompany._updateCompanySize(company._id,companySize);
        //creamos y agregamos la sede principal
        const mainSite = await apiCalls.apiCallsCompanySite._createCompanySite("Sede principal",address,city,province);
        const updatedCompany = mainSite ? await apiCalls.apiCallsCompany._addSedeIdToCompany(company._id,mainSite._id) : null;

        if (
          rucResponse &&
          socialReasonResponse &&
          provinceResponse &&
          cityResponse &&
          addressResponse &&
          economicActivityResponse &&
          economicSectorResponse &&
          companySizeResponse &&
          updatedCompany
        ) {
          await Swal.fire({
            icon: 'success',
            text: 'Los datos de la empresa se agregaron satisfactoriamente',
            confirmButtonText: 'Entendido'
          })
          await getCompany();
          handleViewChange('sedes');
        }
    } else{
      await Swal.fire({
        icon: 'warning',
        text: '*ningún campo puede solo contener espacios o estár vacío',
        confirmButtonText: 'Entendido'
    });
    setIsSubmitting(false);
    }
  }

  //USE EFFECT
  
  //DESIGN

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
                                    <strong>REGISTO EMPRESA</strong>
                        </h1>

                        <div style={{padding: '15px'}}>
                          {/*PRIMERA PARTE*/}
                          <div style={{display:'flex', flexDirection: 'column'}}>
                            <label><strong>Datos de la empresa:</strong></label>
                            <div><label>Ruc:</label><input required type="text" className={Styles.inputDecorated} value={ruc} onChange={(e) => setRuc(e.target.value)} maxLength={14}/></div>
                            <div><label>Razón social:</label><input required type="text" className={Styles.inputDecorated} value={socialReason} onChange={(e) => setsocialReason(e.target.value)} maxLength={200}/></div>
                            <div><label>País:</label><input required type="text" className={Styles.inputDecorated} placeholder={company.countryId?.name} disabled/></div>
                            <div><label>Provincia:</label><input required type="text" className={Styles.inputDecorated} value={province} onChange={(e) => setProvince(e.target.value)} maxLength={50}/></div>
                            <div><label>Ciudad:</label><input required type="text" className={Styles.inputDecorated} value={city} onChange={(e) => setCity(e.target.value)} maxLength={50}/></div>
                            <div><label>Dirección:</label><input required type="text" className={Styles.inputDecorated} value={address} onChange={(e) => setAddress(e.target.value)} maxLength={200}/></div>
                            <div><label>Actividad económica:</label><input required type="text" className={Styles.inputDecorated} value={economicActivity} onChange={(e) => setEconomicActivity(e.target.value)} maxLength={100}/></div>
                            <div><label>Sector económico:</label><input required type="text" className={Styles.inputDecorated} value={economicSector} onChange={(e) => setEconomicSector(e.target.value)} maxLength={50}/></div>
                            <br />
                            <label><strong>Tamaño de la empresa:</strong></label>
                            <select required name="tamañoempresa" className={Styles.inputDecorated} value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
                              <option value="">Seleccione una opción</option>
                              <option value="Micro">Micro</option>
                              <option value="Pequeña">Pequeña</option>
                              <option value="Mediana">Mediana</option>
                              <option value="Grande">Grande</option>
                            </select>
                          </div>

                          {/*SEGUNDA PARTE*/}
                          <div style={{alignContent: 'end'}}>
                              <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: isSubmitting ? 'gray' : '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '300px' }} disabled={isSubmitting}>
                                Registrar empresa
                              </button>
                          </div>
                        </div>
              </form>
  )
}

export default RegistroEmpresa;