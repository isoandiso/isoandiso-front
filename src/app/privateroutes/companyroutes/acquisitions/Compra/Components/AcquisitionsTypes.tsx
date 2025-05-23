import React, {useEffect,useState} from "react"
import Swal from 'sweetalert2';
import _api_calls_company from "src/api/apicalls/_api_calls_company";
import _api_calls_company_acquisition_type from "src/api/apicalls/_api_calls_company_acquisition_type";
import _api_calls_company_acquisition from "src/api/apicalls/_api_calls_company_acquisition";
import { Iso } from "src/models/apimodels/Iso";
import { CompanyCountry } from "src/models/apimodels/CompanyCountry";
import { CompanyAcquisitionType } from "src/models/apimodels/CompanyAcquisitionType";
import { CompanyAcquisition } from "src/models/apimodels/CompanyAcquisition";
import { Company } from "src/models/apimodels/Company";

export default function AcquisitionsTypes({selectedCountry,selectedIsos,company,getCompany,setSelectedIsos}:{selectedCountry: CompanyCountry | null,selectedIsos:Iso[],company:Company,getCompany:() => Promise<void>,setSelectedIsos:React.Dispatch<React.SetStateAction<Iso[]>>}){

    //VARIABLES
    const [companyAcquisitionsTypes, setCompanyAcquisitionsTypes] = useState<CompanyAcquisitionType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    //FUNCTIONS
    async function _setCompanyAcquisitionsTypes(){
        const companyAcquisitionsTypes = await _api_calls_company_acquisition_type._getCompanyAcquisitionsTypes();

        if(companyAcquisitionsTypes){
          setCompanyAcquisitionsTypes(companyAcquisitionsTypes);
        }else{
          setCompanyAcquisitionsTypes([]);
        }
    }
    async function handleClickSelectedCompanyAcquisitionType(e:React.MouseEvent<HTMLInputElement, MouseEvent>) {
      setIsSubmitting(true);
      const _selectedIsos = selectedIsos;
      setSelectedIsos([]); // limpiamos el guardador de isos seleccionadas
      const { value } = (e.target as HTMLInputElement);
    
      // Verificamos que haya un país seleccionado si es que el usuario no tiene uno asignado ya y hay que asignarle el que eligió
      if ((company.countryId === null) && (selectedCountry == null)) {
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
              })
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
                        let _company = company;
                        if (_company.countryId === null) {
                          if(selectedCountry){
                          _company = await _api_calls_company._updateCompanyCountry(company._id, selectedCountry._id);
                          }
                        }

                        if (_company.countryId) {
                          const acquisition: CompanyAcquisition = await _api_calls_company_acquisition._createAcquisition(_selectedIsos,selectedCompanyAcquisitionType._id);
                          if (acquisition){
                              const companyUpdated = await _api_calls_company._addAcquisitionIdToCompany(company._id, acquisition._id);
                              if (companyUpdated){
                                  await Swal.fire({
                                    icon: 'success',
                                    text: 'Adquisición agregada correctamente.',
                                    confirmButtonText: 'Entendido',
                                  });
                                  await getCompany();
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