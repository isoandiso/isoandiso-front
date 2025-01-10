import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css';
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { apiCallsCompanyArea,apiCallsWorkerNationality,apiCallsRol,apiCallsCompany } from '../../settings/apiCalls';

function ResponsablesDelSistemaDigital(props) {
  const { user, getUser } = props;

  //TYPE

  type CompanyArea = {
    _id: string;
    name: string;
    charges: string[];
    isoIds:Iso[];
    responsibleWorkerId: Worker;
  }

  type Iso = {
    _id: string;
    name: string;
  };

  type Worker = {
    _id: string;
    name: string | null;
    lastname: string | null;
    email: string;
    password: string | null;
    dni: string;
    mothers_lastname: string;
    fathers_lastname: string;
    birthDate: Date;
    companyAreaId: string;
    charge: string;
    entryDate: Date;
    contractTerminationDate: Date | null;
    areaEntryDate: Date;
    province: string;
    city: string;
    address: string;
    district: string;
    corporateEmail: string;
    nationalityId: string;
    gender: "Masculino" | "Femenino" | "";
    civilStatus: "Soltero/a" | "Casado/a" | "Divorciado/a" | "Conviviente" | "Viudo/a" | "";
    personalPhone: string;
    facialRecognition: string | null;
    digitalSignature: string | null;
    status: "Activo" | "Inactivo";
    workSiteId: string;
    rolId: string;
    sizePants: 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44;
    sizePolo: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    sizeShoe: 36 | 38 | 40 | 42 | 44;
    companyIds: string[];
  };  

  type workerNationality = {
    _id: string;
    name: string;
  };

  type CompanySite = {
    _id: string;
    name: string;
    address: string;
    city: string;
    province: string;
  };

  type rol = {
    _id: string;
    name: string;
  };
  
  //VARIABLES DE ESTADO
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [companyAreasWithIso, setCompanyAreasWithIso] = useState<CompanyArea[]>([]);
  const [companyAreasWithIsoAndWorkerAsigned, setCompanyAreasWithIsoAndWorkerAsigned] = useState<CompanyArea[]>([]);
  const [nationalities, setNationalities] = useState<workerNationality[]>([]);
  const [sites,setSites] = useState<CompanySite[]>([]);
  const [area,setArea] = useState<CompanyArea>();
  const [rols,setRols] = useState<rol[]>([]);
  const [workerData, setWorkerData] = useState<Worker>({
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
    workSiteId: "",
    rolId: "",
    sizePants: 26,
    sizePolo: 'XS',
    sizeShoe: 36,
    companyIds: [],
  });
  const [modal, setModal] = useState<Boolean>(false);
  const [haveFinalizationDate, setHaveFinalizationDate] = useState<Boolean>(false);

  //FUNCTIONS

  async function deleteWorkerOfArea(areaId) {
    await apiCallsCompanyArea._deleteWorkerOfArea(areaId);
    await getUser();
  }

  function showModal(area:CompanyArea){
      setArea(area);

      //le seteamos al workerData el "companyId","companyAreaId" y "rolId"
      setWorkerData((prevWorkerData) => ({
        ...prevWorkerData,
        companyIds: prevWorkerData.companyIds.includes(user._id)
        ? prevWorkerData.companyIds
        : [...prevWorkerData.companyIds, user._id], // Solo agrega si no existe
        companyAreaId: area?._id || prevWorkerData.companyAreaId,
        rolId: rols.find(rol=>rol.name="Jefe")?._id || prevWorkerData.rolId 
      }));

      setModal(true);
  }

  function closeModal(){
    setModal(false);
    setWorkerData({ ...workerData, contractTerminationDate:null });
    setHaveFinalizationDate(false);
    //vaceamos los datos de WorkerData
    setWorkerData({
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
      workSiteId: "",
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
    const _alreadyAssignedWorker = companyAreasWithIsoAndWorkerAsigned.some(area=>area.responsibleWorkerId.email === workerData.email);

    if(_alreadyAssignedWorker){
        await Swal.fire({
          icon: "warning",
          text: `El trabajador con dicho email (${workerData.email}) ya está asignado a otra área`,
          confirmButtonText: "Entendido",
        })
    }else{
        //creamos el trabajador
        const { _id, ...workerDataWithoutId } = workerData; //(quitamos el campo "_id" para que no intente guardarlo ya que es automático cuando se crea en la tabla)
        const createdWorker:Worker = await apiCallsCompany._createWorker(workerDataWithoutId);
        if(createdWorker){
            //agregamos el trabajador al área
            const companyArea:CompanyArea = await apiCallsCompanyArea._updateResponsibleWorker(createdWorker.companyAreaId,createdWorker._id);
            if(companyArea){
              await Swal.fire({
                icon: "success",
                text: `Se asignó correctamente el trabajador responsable al área`,
                confirmButtonText: "Entendido",
              });
              await getUser();
            }
        }  
    }

    closeModal();
    setIsSubmitting(false);
  };

  //USE EFFECT

  useEffect(() => {
    //áreas de la empresa que tienen isos asignadas y que dichas isos "no tienen" un responsable ya asignado
    const companyAreasWithIso = (user.areaIds as CompanyArea[]).filter((companyArea) => (companyArea.isoIds.length>0) && !companyArea.responsibleWorkerId);
    //áreas de la empresa que tienen isos asignadas y que dichas isos "tienen" un responsable ya asignado
    const companyAreasWithIsoAndWorkerAsigned = (user.areaIds as CompanyArea[]).filter((companyArea) => companyArea.responsibleWorkerId!==null);
    
    //setters
    setCompanyAreasWithIso(companyAreasWithIso);
    setCompanyAreasWithIsoAndWorkerAsigned(companyAreasWithIsoAndWorkerAsigned);
  }, [user]);

  useEffect(()=>{
    //seteamos las nacionalidades
    const _getNationalities = async ()=>{
      const _nationalities = await apiCallsWorkerNationality._getNationalities();
      if(_nationalities){
        setNationalities(_nationalities);  
      }else{
        setNationalities([]);  
      }
   };
   _getNationalities();

   //seteamos los roles
   const _getRols = async ()=>{
      const _rols = await apiCallsRol._getRols()
      if(_rols){
        setRols(_rols);  
      }else{
        setRols([]);  
      }
    };
   _getRols();

   //seteamos las sedes de la empresa
   const sites:CompanySite[] = user.siteIds;
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
                                        companyAreasWithIsoAndWorkerAsigned
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
                                                    <p >{area.responsibleWorkerId.email}</p>
                                              </td>

                                              <td style={{ border: '1px solid black', padding: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                  <MdDelete
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                    size={27}
                                                    onClick={()=>deleteWorkerOfArea(area._id)}
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
                                setWorkerData({ ...workerData, email: value });
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
                                setWorkerData({ ...workerData, corporateEmail: value });
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
                            type="text" required className={Styles.inputDecorated} placeholder="Teléfono" value={workerData.personalPhone} onChange={(e) => {
                              const phoneRegex = /^[0-9+\-\(\)\s]*$/;
                              const value = e.target.value;
                              if (phoneRegex.test(value)) {
                                setWorkerData({ ...workerData, personalPhone: value });
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
                              setWorkerData({ ...workerData, birthDate });
                            }}
                            style={{ marginBottom: "10px" }}
                          />

                          {/*DNI*/}
                          <p>DNI <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required maxLength={20} className={Styles.inputDecorated} placeholder="DNI" value={workerData.dni} onChange={(e) => {
                              const value = e.target.value.trim();
                              setWorkerData({ ...workerData, dni: value });
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
                          <select required className={Styles.inputDecorated} value={workerData.gender}onChange={(e) => setWorkerData({ ...workerData, gender: e.target.value as "Masculino" | "Femenino" })}>
                                <option value="">Seleccione una opción</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                          </select>

                          {/*Estado civil */}
                          <p>Estado civil <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} value={workerData.civilStatus}onChange={(e) => setWorkerData({ ...workerData, civilStatus: e.target.value as "Soltero/a" | "Casado/a" | "Divorciado/a" | "Conviviente" | "Viudo/a" })}>
                                <option value="">Seleccione una opción</option>
                                <option value="Soltero/a">Soltero/a</option>
                                <option value="Casado/a">Casado/a</option>
                                <option value="Divorciado/a">Divorciado/a</option>
                                <option value="Conviviente">Conviviente</option>
                                <option value="Viudo/a">Viudo/a</option>
                          </select>
                          
                          {/*Nacionalidad */}
                          <p>Nacionalidad <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} value={workerData.nationalityId} onChange={(e) => {setWorkerData({ ...workerData, nationalityId: e.target.value })}}>
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
                            type="text" required className={Styles.inputDecorated} placeholder="Provincia" value={workerData.province} onChange={(e) => {
                              const provinceRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/;
                              const value = e.target.value;
                              if (provinceRegex.test(value)) {
                                setWorkerData({ ...workerData, province: value });
                              }
                            }}
                          />

                          {/*Ciudad*/}
                          <p>Ciudad <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Ciudad" value={workerData.city} onChange={(e) => {
                              const cityRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/;
                              const value = e.target.value;
                              if (cityRegex.test(value)) {
                                setWorkerData({ ...workerData, city: value });
                              }
                            }}
                          />

                          {/*Dirección*/}
                          <p>Dirección <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Dirección" value={workerData.address} onChange={(e) => {
                              const adressRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/;
                              const value = e.target.value;
                              if (adressRegex.test(value)) {
                                setWorkerData({ ...workerData, address: value });
                              }
                            }}
                          />

                          {/*Distrito*/}
                          <p>Distrito <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required className={Styles.inputDecorated} placeholder="Distrito" value={workerData.district} onChange={(e) => {
                              const districtRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.-]+$/;
                              const value = e.target.value;
                              if (districtRegex.test(value)) {
                                setWorkerData({ ...workerData, district: value });
                              }
                            }}
                          />

                          {/*Apellido paterno*/}
                          <p>Apellido paterno <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required maxLength={20} className={Styles.inputDecorated} placeholder="Apellido paterno" value={workerData.fathers_lastname} onChange={(e) => {
                              const value = e.target.value;
                              setWorkerData({ ...workerData, fathers_lastname: value });
                            }}
                          />
                          
                          {/*Apellido materno*/}
                          <p>Apellido materno <strong style={{color:'red'}}>*</strong></p>
                          <input
                            type="text" required maxLength={20} className={Styles.inputDecorated} placeholder="Apellido materno" value={workerData.mothers_lastname} onChange={(e) => {
                              const value = e.target.value;
                              setWorkerData({ ...workerData, mothers_lastname: value });
                            }}
                          />

                          {/*Talla pantalón*/}
                          <p>Talla pantalón <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} onChange={(e) => setWorkerData({ ...workerData, sizePants: Number(e.target.value) as 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44 })}>
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
                          <select required className={Styles.inputDecorated} onChange={(e) => setWorkerData({ ...workerData, sizePolo: e.target.value as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' })}>
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
                          <select required className={Styles.inputDecorated} onChange={(e) => setWorkerData({ ...workerData, sizeShoe: Number(e.target.value) as 36 | 38 | 40 | 42 | 44 })}>
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
                              setWorkerData({ ...workerData, entryDate });
                            }}
                            style={{ marginBottom: "10px" }}
                          />
                          
                          <div style={{display:'flex', alignItems:'center', marginLeft:'6px', marginBottom:'10px', fontSize:'14px'}}>
                              <input type="checkbox" name="checkbox_haveFinalizationDate" onChange={(e)=>{
                                if(!e.target.checked){
                                  setWorkerData({ ...workerData, contractTerminationDate:null });
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
                                  if (workerData.entryDate && contractTerminationDate <= workerData.entryDate) {
                                    await Swal.fire({
                                            icon: "warning",
                                            text: `La fecha de finalización del contrato debe ser mayor que la fecha de ingreso.`,
                                            confirmButtonText: "Entendido",
                                          });
                                    e.target.value=""
                                    return;
                                  }else{
                                    setWorkerData({ ...workerData, contractTerminationDate });
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
                              setWorkerData({ ...workerData, areaEntryDate });
                            }}
                            style={{ marginBottom: "10px" }}
                          />

                          {/*Sede */}
                          <p>Sede de trabajo <strong style={{color:'red'}}>*</strong></p>
                          <select required className={Styles.inputDecorated} value={workerData.workSiteId} onChange={(e) => setWorkerData({ ...workerData, workSiteId: e.target.value })}>
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
                          <select required className={Styles.inputDecorated} value={workerData.charge} onChange={(e) => setWorkerData({ ...workerData, charge: e.target.value })}>
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