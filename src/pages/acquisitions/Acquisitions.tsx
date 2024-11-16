import React, { useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";

import Compra from './Compra'
import AreasCargos from './AreasCargos'
import AsignaciónSistemasDigitales from './AsignaciónSistemasDigitales'
import RegistroEmpresa from './RegistroEmpresa'
import ResponsablesDelSistemaDigital from './ResponsablesDelSistemaDigital'
import Sedes from './Sedes'
import SistemasAdquiridos from './SistemasAdquiridos'
import RegistroTrabajador from './RegistroTrabajador'

function Acquisitions() {

  const [currentView, setCurrentView] = useState('compra');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'compra':
        return <Compra />;
      case 'areas/cargos':
        return <AreasCargos />;
      case 'asignación sistemas digitales':
        return <AsignaciónSistemasDigitales />;
      case 'registro empresa':
        return <RegistroEmpresa />;
      case 'responsables del sistema digital':
        return <ResponsablesDelSistemaDigital />;
      case 'sedes':
        return <Sedes />;
      case 'sistemas adquiridos':
        return <SistemasAdquiridos />;
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <div style={{display: 'flex', height: '1000px', flexDirection: 'column'}}>

        <div>
          {/* PRIMERA PARTE */}
             <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '15px'}}>
                <FaCircleUser style={{width:'40px', height: '40px', marginRight: '10px', cursor: 'pointer'}}/>
            </div>
        </div>

        <div style={{display: 'flex'}}>
            {/* SEGUNDA PARTE */}
            <div style={{ width: '20%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <p style={{margin: '40px', cursor: 'pointer'}} onClick={() => handleViewChange('compra')}>COMPRA</p>
                <p style={{margin: '40px', cursor: 'pointer'}} onClick={() => handleViewChange('sistemas adquiridos')}>SISTEMAS ADQUIRIDOS</p>
                <p style={{margin: '40px', cursor: 'pointer'}} onClick={() => handleViewChange('registro empresa')}>REGISTRO EMPRESA</p>
                <p style={{margin: '40px', cursor: 'pointer'}} onClick={() => handleViewChange('sedes')}>SEDES</p>
                <p style={{margin: '40px', cursor: 'pointer'}} onClick={() => handleViewChange('areas/cargos')}>AREAS/CARGOS</p>
                <p style={{margin: '40px', cursor: 'pointer'}} onClick={() => handleViewChange('asignación sistemas digitales')}>ASIGNACIÓN SISTEMAS DIGITALES</p>
                <p style={{margin: '40px', cursor: 'pointer'}} onClick={() => handleViewChange('responsables del sistema digital')}>RESPONSABLES DEL SISTEMA DIGITAL</p>
            </div>
            {/* TERCERA PARTE */}
            <div style={{ width: '100%'}}>
              {renderView()}
            </div>
        </div>

      </div>
    </>
  );
}

export default Acquisitions;