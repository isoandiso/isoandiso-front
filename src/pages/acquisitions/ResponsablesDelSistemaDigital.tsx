import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css'

function ResponsablesDelSistemaDigital() {

const handleSubmit = (event) => {
   
};


  return (

        <form id="asignaciónSistemasDigitalesForm" onSubmit={handleSubmit}>   
              
              <div style={{
                        display: 'flex', 
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        padding: '30px',
                        margin: '8px',
                        justifyContent: 'space-around'
                    }}>



                      {/* PRIMERA PARTE */}
                      <div>
                            <p><strong>AREA</strong></p>
                            <br />
                            <div>Area 1</div>
                            <div>Area 2</div>
                            <div>Area 3</div>
                      </div>

                      <div>
                            <p><strong>SISTEMA DIGITALIZADO</strong></p>
                            <br />
                            <div>ISO 1</div>
                            <div>ISO 1</div>
                            <div>ISO 3</div>
                      </div>

                      {/* SEGUNDA PARTE */}
                      <div>
                            <p><strong>RESPONSABLE</strong></p>
                            <br />
                            <div><input type="text" name="" id="" style={{backgroundColor:'#f9f9f9'}} /></div>
                            <div><input type="text" name="" id="" style={{backgroundColor:'#f9f9f9'}}/></div>
                            <div><input type="text" name="" id="" style={{backgroundColor:'#f9f9f9'}}/></div>
                      </div>

                      
                      
                </div>

                {/* TERCERA PARTE */}
                <div style={{alignContent: 'end'}}>
                      <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0B25A4', color: 'white', border: 'none', cursor: 'pointer', width: '250px' }}>
                                Agregar
                      </button>
                </div>
        </form>
        
      
  );
}

export default ResponsablesDelSistemaDigital;