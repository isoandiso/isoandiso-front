import React from 'react';
import { MdDelete } from "react-icons/md";
import Styles from './styles.module.css'

function FilaSede({nombre,dirección,ciudad,provincia,deleteSede}) {

  return (
            <tr>
                          <td>
                              <p>{nombre}</p>
                          </td>

                          
                          <td>
                              <p>{dirección}</p>
                          </td>

                          
                          <td>
                              <p>{ciudad}</p>
                          </td>

                          
                          <td>
                              <p>{provincia}</p>
                          </td>

                          <td>
                            <div>
                                <MdDelete key={1} onClick={deleteSede} style={{cursor: 'pointer'}}></MdDelete>
                            </div>                   
                          </td>
            </tr> 
  );
}

export default FilaSede;