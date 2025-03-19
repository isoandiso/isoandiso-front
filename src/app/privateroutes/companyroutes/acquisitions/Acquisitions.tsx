import React,{ useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Compra from './Compra/Container/Compra'
import AreasCargos from './AreasCargos'
import AsignaciónSistemasDigitales from './AsignaciónSistemasDigitales'
import RegistroEmpresa from './RegistroEmpresa'
import ResponsablesDelSistemaDigital from './ResponsablesDeLosSistemasDigitalizados'
import Sedes from './Sedes'
import SistemasAdquiridos from './SistemasAdquiridos'
import { useCompany } from '../../../main'; 
import apiCalls from '../../../../api/apiCalls'
import { Iso } from "../../../../models/apiModels";

function Acquisitions() {

  const {company,getCompany} = useCompany();
  const [currentView, setCurrentView] = useState('compra');
  const [selectedOption, setSelectedOption] = useState('compra');
  const [isoRRHH, setIsoRRHH] = useState<Iso>();
  const [iso9001, setIso9001] = useState<Iso>();

  const handleViewChange = (view:string) => {
    setCurrentView(view);
    setSelectedOption(view)
  };

  useEffect(()=>{
    async function setIsos(){
      const isoRRHH = await apiCalls.apiCallsIso._getIsoByNameStartWith("RRHH");
      const iso9001 = await apiCalls.apiCallsIso._getIsoByNameStartWith("ISO 9001");
      setIsoRRHH(isoRRHH);
      setIso9001(iso9001);
    }
    setIsos();
  },[]);

  const renderView = () => {
    switch (currentView) {
      case 'compra':
        return <Compra company={company} getCompany={getCompany}/>;
      case 'sistemas adquiridos':
        return <SistemasAdquiridos company={company}/>;
      case 'registro empresa':
        return <RegistroEmpresa company={company} getCompany={getCompany} handleViewChange={handleViewChange}/>;
      case 'sedes':
          return <Sedes company={company} getCompany={getCompany}/>;
      case 'areas/cargos':
        return <AreasCargos company={company} getCompany={getCompany}/>;
      case 'asignación de sistemas digitales':
        return <AsignaciónSistemasDigitales company={company} getCompany={getCompany}/>;
      case 'responsables de los sistemas digitalizados':
        return <ResponsablesDelSistemaDigital company={company} getCompany={getCompany}/>;
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <div style={{padding:'2px'}}>
        <div style={{display: 'flex', backgroundColor:'white'}}>
            <div style={{width:'22.5%',borderRight:'ridge',textAlign:'center'}}>
                <div style={{borderBottom: '1px',borderStyle:'inset'}}>
                  <p 
                    style={{ 
                      padding: '40px', 
                      cursor: 'pointer', 
                      backgroundColor: selectedOption === 'compra' ? '#2c3792' : 'white',
                      color: selectedOption === 'compra' ? 'white' : 'black',
                      fontWeight: selectedOption === 'compra' ? 'bolder' : 'inherit',
                    }} 
                    onClick={() => handleViewChange('compra')}
                  >
                    COMPRA
                  </p>
                </div>
                {
                  (company.acquisitionIds || []).length > 0
                  &&
                  <>
                    <div style={{borderBottom: '1px',borderStyle:'inset'}}>
                      <p 
                        style={{ 
                          padding: '40px', 
                          cursor: 'pointer', 
                          backgroundColor: selectedOption === 'sistemas adquiridos' ? '#2c3792' : 'white',
                          color: selectedOption === 'sistemas adquiridos' ? 'white' : 'black',
                          fontWeight: selectedOption === 'sistemas adquiridos' ? 'bolder' : 'inherit',
                        }} 
                        onClick={() => handleViewChange('sistemas adquiridos')}
                      >
                        SISTEMAS ADQUIRIDOS
                      </p>
                    </div>
                    <div style={{borderBottom: '1px',borderStyle:'inset'}}>
                      <p 
                        style={{ 
                          padding: '40px', 
                          cursor: 'pointer', 
                          backgroundColor: selectedOption === 'registro empresa' ? '#2c3792' : 'white',
                          color: company.ruc===null ? (selectedOption === 'registro empresa' ? 'white' : 'black') : 'gray',
                          opacity:company.ruc===null ? '1':'0.5',
                          fontWeight: selectedOption === 'registro empresa' ? 'bolder' : 'inherit'
                        }} 
                        {...(company.ruc===null ? { onClick: () => handleViewChange('registro empresa')} : {})}
                      >
                        REGISTRO EMPRESA
                      </p>
                    </div>
                  </>
                }
                {
                  company.ruc != null
                  &&
                  <>
                    <div style={{borderBottom: '1px',borderStyle:'inset'}}>
                      <p 
                        style={{ 
                          padding: '40px', 
                          cursor: 'pointer', 
                          backgroundColor: selectedOption === 'sedes' ? '#2c3792' : 'white',
                          color: selectedOption === 'sedes' ? 'white' : 'black',
                          fontWeight: selectedOption === 'sedes' ? 'bolder' : 'inherit'
                        }} 
                        onClick={() => handleViewChange('sedes')}
                      >
                        SEDES
                      </p>
                    </div> 
                    <div style={{borderBottom: '1px',borderStyle:'inset'}}>
                      <p 
                        style={{ 
                          padding: '40px', 
                          cursor: 'pointer', 
                          backgroundColor: selectedOption === 'areas/cargos' ? '#2c3792' : 'white',
                          color: selectedOption === 'areas/cargos' ? 'white' : 'black',
                          fontWeight: selectedOption === 'areas/cargos' ? 'bolder' : 'inherit'
                        }} 
                        onClick={() => handleViewChange('areas/cargos')}
                      >
                        AREAS/CARGOS
                      </p>
                    </div> 
                  </>
                }
                {
                  (company.areaIds || []).length > 0
                  &&
                  <>
                    <div style={{borderBottom: '1px',borderStyle:'inset'}}>
                      <p 
                        style={{ 
                          padding: '40px', 
                          cursor: 'pointer', 
                          backgroundColor: selectedOption === 'asignación de sistemas digitales' ? '#2c3792' : 'white',
                          color: selectedOption === 'asignación de sistemas digitales' ? 'white' : 'black',
                          fontWeight: selectedOption === 'asignación de sistemas digitales' ? 'bolder' : 'inherit'
                        }} 
                        onClick={() => handleViewChange('asignación de sistemas digitales')}
                      >
                        ASIGNACIÓN DE SISTEMAS DIGITALES
                      </p>
                    </div>
                  </> 
                }
                {
                  company.areaIds?.some(area => (area.isoIds || []).length > 0)
                  &&
                  <div style={{borderBottom: '1px',borderStyle:'inset'}}>
                    <p 
                      style={{ 
                        padding: '40px', 
                        cursor: 'pointer', 
                        backgroundColor: selectedOption === 'responsables de los sistemas digitalizado' ? '#2c3792' : 'white',
                        color: selectedOption === 'responsables de los sistemas digitalizado' ? 'white' : 'black',
                        fontWeight: selectedOption === 'responsables de los sistemas digitalizado' ? 'bolder' : 'inherit'
                      }} 
                      onClick={async () => {
                        //si no se detecta que tenga asignadas las isos "RRHH" y "ISO 9001" entonces se le pedirá que las asigne a algún área para poder visualizar la vista de asignación del responsable de los sistemas digitalizados
                        if(!(((company.areaIds?.some(area=>area?.isoIds?.some(iso=>iso.name.startsWith("RRHH")))) && (company.areaIds?.some(area=>area?.isoIds?.some(iso=>iso.name.startsWith("ISO 9001"))))))){
                            await Swal.fire({
                                icon: 'warning',
                                text: `El sistema "${isoRRHH?.name}" e "${iso9001?.name}" deben estár asignadas en algún área para que el programa trabaje adecuadamente. El módulo de estos sistemas son gratuitos, no generan costos.`,
                                confirmButtonText: 'Entendido'
                            });
                        }else{
                            handleViewChange('responsables de los sistemas digitalizados');
                        }
                      }}
                    >
                      RESPONSABLES DE LOS SISTEMAS DIGITALIZADOS
                    </p>
                  </div>
                }
            </div>
            <div style={{ width: '100%' }}>
              {renderView()}
            </div>
        </div>
      </div>
    </>
  );
}

export default Acquisitions;
