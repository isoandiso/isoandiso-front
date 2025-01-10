import React, {useEffect,useState} from "react"
import Swal from 'sweetalert2';
import {apiCallsCompanyAcquisitionType,apiCallsCompany,apiCallsCompanyAcquisition} from '../../../../settings/apiCalls'

export default function AcquisitionsTypes(props){
    const {selectedCountry,selectedIsos,user,getUser,setSelectedIsos} = props;

    //TYPES
    type CompanyAcquisitionType = {
        _id: string;
        name: string;
    };
    type Iso = {
      _id: string;
      name: string;
    };
    type CompanyAcquisition = {
      _id: string;
      isoIds:Iso[];
      acquisitionTypeId:CompanyAcquisitionType;
      acquisitionDate:Date;
      expirationDate:Date | null;
      invoiceLink: string | null; 
    };
    //VARIABLES
    const [companyAcquisitionsTypes, setCompanyAcquisitionsTypes] = useState<CompanyAcquisitionType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    //FUNCTIONS
    async function _setCompanyAcquisitionsTypes(){
        const companyAcquisitionsTypes = await apiCallsCompanyAcquisitionType._getCompanyAcquisitionsTypes();
        if(companyAcquisitionsTypes){
          setCompanyAcquisitionsTypes(companyAcquisitionsTypes);
        }else{
          setCompanyAcquisitionsTypes([]);
        }
    }
    async function handleClickSelectedCompanyAcquisitionType(e) {
      setIsSubmitting(true);
      const _selectedIsos = selectedIsos;
      setSelectedIsos([]); // limpiamos el guardador de isos seleccionadas
      const { value } = e.target;
    
      // Verificamos que haya un país seleccionado si es que el usuario no tiene uno asignado ya y hay que asignarle el que eligió
      if ((user.countryId === null) && (selectedCountry == null)) {
          await Swal.fire({
            icon: 'warning',
            text: 'Seleccione un país',
            confirmButtonText: 'Entendido',
          });
      }else {
            // Verificamos que haya isos seleccionadas
            if (_selectedIsos.length <= 0) {
              await Swal.fire({
                icon: 'warning',
                text: 'Asegúrese de tener al menos una iso seleccionada',
                confirmButtonText: 'Entendido',
              });
            }else{
                  // Verificamos que exista el tipo de adquisición elegida
                  const selectedCompanyAcquisitionType: CompanyAcquisitionType | null = companyAcquisitionsTypes.find(companyAcquisitionType => companyAcquisitionType.name === value) || null;
                  if (!selectedCompanyAcquisitionType) {
                    await Swal.fire({
                      icon: 'warning',
                      text: 'No se encontró el tipo de adquisición',
                      confirmButtonText: 'Entendido',
                    });
                  }else{
                        // Asignamos el país seleccionado a la empresa si es que el usuario no tiene uno asignado ya
                        let company = user;
                        if (company.countryId === null) {
                          company = await apiCallsCompany._updateCompanyCountry(user._id, selectedCountry._id);
                        }

                        if (company.countryId) {
                          const acquisition: CompanyAcquisition = await apiCallsCompanyAcquisition._createAcquisition(_selectedIsos,selectedCompanyAcquisitionType._id);
                          if (acquisition){
                              const companyUpdated = await apiCallsCompany._addAcquisitionIdToCompany(user._id, acquisition._id);
                              if (companyUpdated){
                                  await Swal.fire({
                                    icon: 'success',
                                    text: 'Adquisición agregada correctamente.',
                                    confirmButtonText: 'Entendido',
                                  });
                                  await getUser();
                              }
                          }
                        }
                  }
            }
      }
      //volvemos a habilitar el botón de submit
      setIsSubmitting(false);
    }    

    //USE EFFECT
    useEffect(()=>{
        _setCompanyAcquisitionsTypes();
    },[])

    return <>
             {/* BOTONES TIPO DE ADQUISICIONES */}
             <div style={{display: 'flex', flexDirection: 'row-reverse', paddingBottom: '20px'}}>
                {
                  companyAcquisitionsTypes?.slice().reverse().map((companyAcquisitionType,index)=>
                      <input key={index} value={companyAcquisitionType.name} onClick={(e) => handleClickSelectedCompanyAcquisitionType(e)} type="button" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: isSubmitting ? 'gray' : '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px', marginLeft: '10px' }} disabled={isSubmitting}/>
                  )
                }
             </div>
           </>
}