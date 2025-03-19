import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css';
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { Company,CompanyArea,Employee,employeeNationality,CompanySite,Rol } from "../../../../models/apiModels";
import apiCalls from '../../../../api/apiCalls'

function ResponsablesDelSistemaDigital({company, getCompany}:{ company: Company; getCompany: () => Promise<void> }) {
  
  //VARIABLES

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [companyAreasWithIso, setCompanyAreasWithIso] = useState<CompanyArea[]>([]);
  const [companyAreasWithIsoAndEmployeeAsigned, setCompanyAreasWithIsoAndEmployeeAsigned] = useState<CompanyArea[]>([]);
  const [nationalities, setNationalities] = useState<employeeNationality[]>([]);
  const [sites,setSites] = useState<CompanySite[]>([]);
  const [area,setArea] = useState<CompanyArea>();
  const [rols,setRols] = useState<Rol[]>([]);
  const [employeeData, setEmployeeData] = useState<Employee>({
    _id: "",
    name: null,
    lastname: null,
    email: "",
    password: null,
    dni: "",
    mothers_lastname: "",
    fathers_lastname: "",
    birthDate: new Date(1920, 1, 1),
    companyAreaId: "",
    charge: "",
    entryDate: new Date(1920, 1, 1),
    contractTerminationDate: null,
    areaEntryDate: new Date(1920, 1, 1),
    province: "",
    city: "",
    address: "",
    district: "",
    corporateEmail: "",
    nationalityId: "",
    gender: "",
    civilStatus: "",
    personalPhone: "",
    facialRecognition: null,
    digitalSignature: null,
    status: "Activo",
    employeeSiteId: "",
    rolId: "",
    sizePants: 26,
    sizePolo: 'XS',
    sizeShoe: 36,
    companyIds: [],
  });
  const [modal, setModal] = useState<Boolean>(false);
  const [haveFinalizationDate, setHaveFinalizationDate] = useState<Boolean>(false);

  //FUNCTIONS

  async function deleteEmployeeOfArea(areaId:string) {
    await apiCalls.apiCallsCompanyArea._deleteEmployeeOfArea(areaId);
    await getCompany();
  }

  function showModal(area:CompanyArea){
      setArea(area);

      //le seteamos al employeeData el "companyId","companyAreaId" y "rolId"
      setEmployeeData((prevEmployeeData) => ({
        ...prevEmployeeData,
        companyIds: prevEmployeeData.companyIds.includes(company._id)
        ? prevEmployeeData.companyIds
        : [...prevEmployeeData.companyIds, company._id], // Solo agrega si no existe
        companyAreaId: area?._id || prevEmployeeData.companyAreaId,
        rolId: rols.find(rol=>rol.name="Jefe")?._id || prevEmployeeData.rolId 
      }));

      setModal(true);
  }

  function closeModal(){
    setModal(false);
    setEmployeeData({ ...employeeData, contractTerminationDate:null });
    setHaveFinalizationDate(false);
    //vaceamos los datos de EmployeeData
    setEmployeeData({
      _id: "",
      name: null,
      lastname: null,
      email: "",
      password: null,
      dni: "",
      mothers_lastname: "",
      fathers_lastname: "",
      birthDate: new Date(1920, 1, 1),
      companyAreaId: "",
      charge: "",
      entryDate: new Date(1920, 1, 1),
      contractTerminationDate: null,
      areaEntryDate: new Date(1920, 1, 1),
      province: "",
      city: "",
      address: "",
      district: "",
      corporateEmail: "",
      nationalityId: "",
      gender: "",
      civilStatus: "",
      personalPhone: "",
      facialRecognition: null,
      digitalSignature: null,
      status: "Activo",
      employeeSiteId: "",
      rolId: "",
      sizePants: 26,
      sizePolo: 'XS',
      sizeShoe: 36,
      companyIds: [],
    })
  }

  async function handleSubmit(e){
    e.preventDefault();
    setIsSubmitting(true);

    //primero verificamos que el trabajador ya no esté asignado en ninguna área (no debería repetirse el email del trabajador en la misma compañia)
    const _alreadyAssignedEmployee = companyAreasWithIsoAndEmployeeAsigned.some(area=>area.responsibleEmployeeId.email === employeeData.email);

    if(_alreadyAssignedEmployee){
        await Swal.fire({
          icon: "warning",
          text: `El trabajador con dicho email (${employeeData.email}) ya está asignado a otra área`,
          confirmButtonText: "Entendido",
        })
    }else{
        //creamos el trabajador
        const createdEmployee:Employee = await apiCalls.apiCallsCompany._createEmployee(employeeData);
        if(createdEmployee){
            //agregamos el trabajador al área
            const companyArea:CompanyArea = await apiCalls.apiCallsCompanyArea._updateResponsibleEmployee(createdEmployee.companyAreaId,createdEmployee._id);
            if(companyArea){
              await Swal.fire({
                icon: "success",
                text: `Se asignó correctamente el trabajador responsable al área`,
                confirmButtonText: "Entendido",
              });
              await getCompany();
            }
        }  
    }

    closeModal();
    setIsSubmitting(false);
  };

  //USE EFFECT

  useEffect(() => {
    //áreas de la empresa que tienen isos asignadas y que dichas isos "no tienen" un responsable ya asignado
    const companyAreasWithIso = (company.areaIds as CompanyArea[]).filter((companyArea) => (companyArea.isoIds.length>0) && !companyArea.responsibleEmployeeId);
    //áreas de la empresa que tienen isos asignadas y que dichas isos "tienen" un responsable ya asignado
    const companyAreasWithIsoAndEmployeeAsigned = (company.areaIds as CompanyArea[]).filter((companyArea) => companyArea.responsibleEmployeeId!==null);
    
    //setters
    setCompanyAreasWithIso(companyAreasWithIso);
    setCompanyAreasWithIsoAndEmployeeAsigned(companyAreasWithIsoAndEmployeeAsigned);
  }, [company]);

  useEffect(()=>{
    //seteamos las nacionalidades
    const _getNationalities = async ()=>{
      const _nationalities = await apiCalls.apiCallsEmployeeNationality._getNationalities();
      if(_nationalities){
        setNationalities(_nationalities);  
      }else{
        setNationalities([]);  
      }
   };
   _getNationalities();

   //seteamos los roles
   const _getRols = async ()=>{
      const _rols = await apiCalls.apiCallsRol._getRols()
      if(_rols){
        setRols(_rols);  
      }else{
        setRols([]);  
      }
    };
   _getRols();

   //seteamos las sedes de la empresa
   const sites:CompanySite[] = company.siteIds;
   setSites(sites);

  },[])



  return (
          <>
              <h1 style={{
                    paddingLeft: '60px',
                    fontSize: '30px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    backgroundColor:'#2c3792',
                    color:'white',
                    textAlign:'center'
                }}>
                    <strong>RESPONSABLES DE LOS SISTEMAS DIGITALIZADOS</strong>
              </h1>
              <div className={Styles.responsablesdelossistemasdigitalizadosContainer}>
                      {/* ÁREA */}
                      <div className={Styles.responsableDelSistemaDigitaColumns}>
                          <strong>ÁREA</strong>
                      </div>
                      {/* SISTEMAS DIGITALES */}
                      <div className={Styles.responsableDelSistemaDigitaColumns}>
                          <strong>SISTEMAS DIGITALES</strong>
                      </div>
                      {/* RESPONSABLE */}
                      <div className={Styles.responsableDelSistemaDigitaColumns}>
                          <strong>RESPONSABLE</strong>
                      </div>
              </div>
  
              {
                  companyAreasWithIso.map((companyArea,companyAreaIndex)=>
                      
                      <div key={companyAreaIndex} className={Styles.responsablesdelossistemasdigitalizadosContainer}>
                            {/* ÁREA */}
                            <div className={Styles.responsableDelSistemaDigitaColumns}>
                                    <p >{companyArea.name}</p>
                            </div>
                                
                            {/* SISTEMAS DIGITALES */}
                            <div className={Styles.responsableDelSistemaDigitaColumns}>
                                  {
                                    companyArea.isoIds.map((iso,isoIndex)=> <p key={isoIndex}>{iso.name}</p> )
                                  }
                            </div>
                            
                            {/* RESPONSABLE */}
                            <div className={Styles.responsableDelSistemaDigitaColumns}>
                              <input onClick={()=>showModal(companyArea)} type="button" value={"Asignar responsable"} style={{ padding: '6px 12px', borderRadius: '5px', backgroundColor: isSubmitting ? 'gray' : '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px', marginLeft: '10px' }}/>
                            </div>
                      </div>
                  )
              }

              {/* TABLA */}
              <div style={{padding:'36px', marginBottom:'40px'}}>
                        <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead style={{backgroundColor: '#0B25A4', color: 'white', border: '1px solid black'}}>
                                    <tr>
                                        <th style={{border: '1px solid black', padding: '8px'}}>ÁREA</th>
                                        <th style={{border: '1px solid black', padding: '8px'}}>SISTEMAS DIGITALES</th>
                                        <th style={{border: '1px solid black', padding: '8px'}}>RESPONSABLE ASIGNADO</th>
                                        <th style={{border: '1px solid black', padding: '8px'}}></th>
                                    </tr>
                                </thead>

                                <tbody style={{textAlign: 'center'}}>
                                {
                                        //Areas con responsable asignado
                                        companyAreasWithIsoAndEmployeeAsigned
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
                                                    <p >{area.responsibleEmployeeId.email}</p>
                                              </td>

                                              <td style={{ border: '1px solid black', padding: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                  <MdDelete
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                    size={27}
                                                    onClick={()=>deleteEmployeeOfArea(area._id)}
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

              {
                modal
                ?
                  <div
                  style={{
                    position:'fixed',
                    top:0,
                    left:0,
                    width:'100vw',
                    height:'100vh',
                    backgroundColor:'rgba(0, 0, 0, 0.5)',
                    display:'flex',
                    alignContent:'center',
                    justifyContent: 'center',
                    zIndex:'1000'
                  }}
                  
                  >
                    <div
                    style={{
                      background:'white',
                      padding:'33px',
                      borderRadius:'10px',
                      width:'400px',
                      boxShadow:'0 4px 8px rgba(0, 0, 0, 0.2)',
                      margin:'20px 0',
                      overflow:'auto'
                    }}
                    >
                        <form onSubmit={(e)=>handleSubmit(e)} style={{display:'flex', flexDirection:'column'}}>
                          {/*Email personal*/}
                          <p>Email personal <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Email"
                            onBlur={async (e) => {
                              const value = e.target.value;
                              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                              if (emailRegex.test(value) && value.endsWith('@gmail.com')) {
                                setEmployeeData({ ...employeeData, email: value });
                              }else{
                                await Swal.fire({
                                  icon: "warning",
                                  text: `Por favor, ingrese un email personal válido, y debe ser un correo de google (@gmail.com).`,
                                  confirmButtonText: "Entendido",
                                });
                                e.target.value="";
                                return;
                              }
                            }}
                          />

                          {/*Email corporativo*/}
                          <p>Email corporativo <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Email"
                            onBlur={async (e) => {
                              const value = e.target.value;
                              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                              if (emailRegex.test(value)) {
                                setEmployeeData({ ...employeeData, corporateEmail: value });
                              }else{
                                await Swal.fire({
                                  icon: "warning",
                                  text: `Por favor, ingrese un email corporativo válido.`,
                                  confirmButtonText: "Entendido",
                                });
                                e.target.value="";
                                return;
                              }
                            }}
                          />

                          {/*Teléfono*/}
                          <p>Teléfono(con código de área país) <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Teléfono" value={employeeData.personalPhone} onChange={(e) => {
                              const phoneRegex = /^[0-9+\-\(\)\s]*$/;
                              const value = e.target.value;
                              if (phoneRegex.test(value)) {
                                setEmployeeData({ ...employeeData, personalPhone: value });
                              }
                            }}
                          />

                          {/*Fecha de nacimiento*/}
                          <p>Fecha de nacimiento <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="date"
                            required
                            min="1921-01-01"
                            className={Styles.inputDecorated}
                            onChange={(e) => {
                              const birthDate = new Date(e.target.value);
                              setEmployeeData({ ...employeeData, birthDate });
                            }}
                            style={{ marginBottom: "10px" }}
                          />

                          {/*DNI*/}
                          <p>DNI <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required maxLength={20} className={Styles.inputDecorated} placeholder="DNI" value={employeeData.dni} onChange={(e) => {
                              const value = e.target.value.trim();
                              setEmployeeData({ ...employeeData, dni: value });
                            }}
                            onBlur={async (e) => {
                              const dniRegex = /^[A-Za-z0-9- ]{5,15}$/;
                              const value = e.target.value.trim();
                              if (!dniRegex.test(value)) {
                                await Swal.fire({
                                  icon: "warning",
                                  text: `El dni ingresado no es válido.`,
                                  confirmButtonText: "Entendido",
                                });
                                e.target.value="";
                                return;
                              }
                            }}
                          />

                          {/*Género */}
                          <p>Género <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} value={employeeData.gender}onChange={(e) => setEmployeeData({ ...employeeData, gender: e.target.value as "Masculino" | "Femenino" })}>
                                <option value="">Seleccione una opción</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                          </select>

                          {/*Estado civil */}
                          <p>Estado civil <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} value={employeeData.civilStatus}onChange={(e) => setEmployeeData({ ...employeeData, civilStatus: e.target.value as "Soltero/a" | "Casado/a" | "Divorciado/a" | "Conviviente" | "Viudo/a" })}>
                                <option value="">Seleccione una opción</option>
                                <option value="Soltero/a">Soltero/a</option>
                                <option value="Casado/a">Casado/a</option>
                                <option value="Divorciado/a">Divorciado/a</option>
                                <option value="Conviviente">Conviviente</option>
                                <option value="Viudo/a">Viudo/a</option>
                          </select>
                          
                          {/*Nacionalidad */}
                          <p>Nacionalidad <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} value={employeeData.nationalityId} onChange={(e) => {setEmployeeData({ ...employeeData, nationalityId: e.target.value })}}>
                                <option value="">Seleccione una opción</option>
                                {
                                  nationalities.map((nationality,indexNationality)=> {
                                    return <option key={indexNationality} value={nationality._id}>{nationality.name}</option>
                                  })
                                }
                          </select>

                          {/*Provincia*/}
                          <p>Provincia <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Provincia" value={employeeData.province} onChange={(e) => {
                              const provinceRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/;
                              const value = e.target.value;
                              if (provinceRegex.test(value)) {
                                setEmployeeData({ ...employeeData, province: value });
                              }
                            }}
                          />

                          {/*Ciudad*/}
                          <p>Ciudad <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Ciudad" value={employeeData.city} onChange={(e) => {
                              const cityRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/;
                              const value = e.target.value;
                              if (cityRegex.test(value)) {
                                setEmployeeData({ ...employeeData, city: value });
                              }
                            }}
                          />

                          {/*Dirección*/}
                          <p>Dirección <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Dirección" value={employeeData.address} onChange={(e) => {
                              const adressRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/;
                              const value = e.target.value;
                              if (adressRegex.test(value)) {
                                setEmployeeData({ ...employeeData, address: value });
                              }
                            }}
                          />

                          {/*Distrito*/}
                          <p>Distrito <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Distrito" value={employeeData.district} onChange={(e) => {
                              const districtRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/;
                              const value = e.target.value;
                              if (districtRegex.test(value)) {
                                setEmployeeData({ ...employeeData, district: value });
                              }
                            }}
                          />

                          {/*Apellido paterno*/}
                          <p>Apellido paterno <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required maxLength={20} className={Styles.inputDecorated} placeholder="Apellido paterno" value={employeeData.fathers_lastname} onChange={(e) => {
                              const value = e.target.value;
                              setEmployeeData({ ...employeeData, fathers_lastname: value });
                            }}
                          />
                          
                          {/*Apellido materno*/}
                          <p>Apellido materno <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required maxLength={20} className={Styles.inputDecorated} placeholder="Apellido materno" value={employeeData.mothers_lastname} onChange={(e) => {
                              const value = e.target.value;
                              setEmployeeData({ ...employeeData, mothers_lastname: value });
                            }}
                          />

                          {/*Talla pantalón*/}
                          <p>Talla pantalón <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} onChange={(e) => setEmployeeData({ ...employeeData, sizePants: Number(e.target.value) as 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44 })}>
                                <option value="">Seleccione una opción</option>
                                <option value={26}>26</option>
                                <option value={28}>28</option>
                                <option value={30}>30</option>
                                <option value={32}>32</option>
                                <option value={34}>34</option>
                                <option value={36}>36</option>
                                <option value={38}>38</option>
                                <option value={40}>40</option>
                                <option value={42}>42</option>
                                <option value={44}>44</option>
                          </select>

                          {/*Talla polo*/}
                          <p>Talla polo <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} onChange={(e) => setEmployeeData({ ...employeeData, sizePolo: e.target.value as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' })}>
                                <option value="">Seleccione una opción</option>
                                <option value='XS'>XS</option>
                                <option value='S'>S</option>
                                <option value='M'>M</option>
                                <option value='L'>L</option>
                                <option value='XL'>XL</option>
                                <option value='XXL'>XXL</option>
                                <option value='XXXL'>XXXL</option>
                          </select>

                          {/*Talla zapato/zapatilla*/}
                          <p>Talla zapato/zapatilla <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} onChange={(e) => setEmployeeData({ ...employeeData, sizeShoe: Number(e.target.value) as 36 | 38 | 40 | 42 | 44 })}>
                                <option value="">Seleccione una opción</option>
                                <option value={36}>36</option>
                                <option value={38}>38</option>
                                <option value={40}>40</option>
                                <option value={42}>42</option>
                                <option value={44}>44</option>
                          </select>

                          {/*Fecha de ingreso*/}
                          <p>Fecha de ingreso a la empresa <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="date"
                            required
                            min="1921-01-01"
                            className={Styles.inputDecorated}
                            onChange={(e) => {
                              const entryDate = new Date(e.target.value);
                              setEmployeeData({ ...employeeData, entryDate });
                            }}
                            style={{ marginBottom: "10px" }}
                          />
                          
                          <div style={{display:'flex', alignItems:'center', marginLeft:'6px', marginBottom:'10px', fontSize:'14px'}}>
                              <input type="checkbox" name="checkbox_haveFinalizationDate" onChange={(e)=>{
                                if(!e.target.checked){
                                  setEmployeeData({ ...employeeData, contractTerminationDate:null });
                                  setHaveFinalizationDate(false);
                                }else{
                                  setHaveFinalizationDate(true);
                                }
                              }
                              }
                              style={{marginRight:'3px'}}
                              />
                              <label>Añadir fecha de finalización de contrato</label>
                          </div>
                          
                          {/*Fecha de finalización del contrato*/}
                          {
                            haveFinalizationDate
                            &&
                            <>
                              <p>Fecha de finalización del contrato <strong style={{color:'red'}}>*</strong></p>
                              <input
                                type="date"
                                required
                                min="1921-01-01"
                                className={Styles.inputDecorated}
                                onChange={(e) => {
                                }}
                                onBlur={async (e)=>{
                                  const contractTerminationDate = new Date(e.target.value);
                                  if (employeeData.entryDate && contractTerminationDate <= employeeData.entryDate) {
                                    await Swal.fire({
                                            icon: "warning",
                                            text: `La fecha de finalización del contrato debe ser mayor que la fecha de ingreso.`,
                                            confirmButtonText: "Entendido",
                                          });
                                    e.target.value=""
                                    return;
                                  }else{
                                    setEmployeeData({ ...employeeData, contractTerminationDate });
                                  }
                                }}
                                style={{ marginBottom: "10px" }}
                              />
                            </>
                          }

                          {/*Fecha de ingreso al área*/}
                          <p>Fecha de ingreso al área <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="date"
                            required
                            min="1921-01-01"
                            className={Styles.inputDecorated}
                            onChange={(e) => {
                              const areaEntryDate = new Date(e.target.value);
                              setEmployeeData({ ...employeeData, areaEntryDate });
                            }}
                            style={{ marginBottom: "10px" }}
                          />

                          {/*Sede */}
                          <p>Sede de trabajo <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} value={employeeData.employeeSiteId} onChange={(e) => setEmployeeData({ ...employeeData, employeeSiteId: e.target.value })}>
                                <option value="">Seleccione una opción</option>
                                {
                                  sites.map((site,indexSite) => <option key={indexSite} value={site._id}>{site.name}</option>)
                                }
                          </select>

                          {/*Rol*/}
                          <p>Rol</p>
                          <select className={Styles.inputDecorated} disabled>
                                <option value="">Jefe</option>
                          </select>

                          {/*Área*/}
                          <p>Área</p>
                          <select className={Styles.inputDecorated} disabled>
                                <option value="">{area?.name}</option>
                          </select>

                          {/*Cargos */}
                          <p>Cargos <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} value={employeeData.charge} onChange={(e) => setEmployeeData({ ...employeeData, charge: e.target.value })}>
                                <option value="">Seleccione una opción</option>
                                {
                                  area?.charges.map((charge,indexCharge) => <option key={indexCharge} value={charge}>{charge}</option>)
                                }
                          </select>

                          {/*Guardar y Cancelar*/}
                          <div style={{display:'flex',flexDirection:'row', marginTop:'10px'}}>
                              <button type="submit" disabled={isSubmitting} style={{
                                    backgroundColor: isSubmitting ? 'gray' : '#0B25A4',
                                    borderRadius:'5px',
                                    color:'white',
                                    width:'100%',
                                    height:'40px',
                              }}>
                                Guardar
                              </button>
                              <button type="button" onClick={closeModal} style={{
                                    backgroundColor: isSubmitting ? 'gray' : '#0B25A4',
                                    borderRadius:'5px',
                                    color:'white',
                                    width:'100%',
                                    height:'40px',
                              }}>
                                Cancelar
                              </button>
                          </div>
                          
                        </form>
                    </div>
                    
                </div> 
                :
                null
              }
  
          </>
        
    );
}

export default ResponsablesDelSistemaDigital;