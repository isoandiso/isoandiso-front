import React, { useEffect,useState } from "react"
import { FiAlertCircle } from "react-icons/fi";
import { FaCheckSquare,FaSquare } from "react-icons/fa";
import {apiCallsIso} from '../../../../settings/apiCalls'

export default function Isos(props){
    const {user,setSelectedIsos,selectedIsos,selectedCountry} = props;
    //TYPES
    type Iso = {
        _id: string;
        name: string;
    };
    //VARIABLES
    const [isos, setIsos] = useState<Iso[]>([]);
    //FUNCTIONS
    async function setAllIsos(){
        const isos:Iso[] = await apiCallsIso._getAllIsos();
        if(isos){
            setIsos(isos);
        }else{
            setIsos([]);
        }
    }
    function _handleIsoCheckboxChange(e) {
        const { value, checked } = e.target;
        const isoSelected: Iso | null = selectedCountry ? selectedCountry.isoIds.find((isoOfCountry) => isoOfCountry.name === value) || null : null;
        if(isoSelected !== null){
            if (checked) {
                setSelectedIsos((prev) => [...prev, isoSelected]);
            } else {
                setSelectedIsos((prev) => prev.filter((iso) => iso._id !== isoSelected._id));
            }
        }
    }
    //USE EFFECT
    useEffect(()=>{
        setAllIsos();
    },[])

    return <div style={{padding:'0 30px'}}>
                {/* ISOS */}
                <div style={{ fontSize: '18px', width: '100%' }}>
                    <div style={{ marginTop: '30px', marginBottom: '15px', display: 'flex' }}>
                        <p><strong>Seleccione las ISOS</strong></p>
                        <p style={{ color: 'red', marginLeft: '2px' }}>*</p>
                        <FiAlertCircle style={{ alignSelf: 'center', marginLeft: '4px' }} />
                    </div>
                    {/* CHECKBOXS */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{display: 'flex', flexDirection: 'column', margin: '15px',maxHeight:'140px',flexWrap:'wrap',width: '100%',overflowY:'auto'}}>
                            {
                            isos.map((iso,index)=>{
                                return <div key={index}>
                                            {
                                                //si la empresa ya tiene adquirida la iso entonces se mostrará seleccionada
                                                user.acquisitionIds?.some(acquisition=>acquisition.isoIds.some(acquiredIso=>acquiredIso._id===iso._id))
                                                ?
                                                <FaCheckSquare style={{ cursor:'pointer',color: "gray", fontSize: "16px",display:'inline',alignSelf:'center' }} />
                                                :
                                                <>
                                                    {
                                                        //si la iso no se encuenta en el país seleccionado entonces se mostrará pero no se podrá seleccionar
                                                        !selectedCountry?.isoIds.some(isoOfCountry=>isoOfCountry._id === iso._id)
                                                        ?
                                                        <FaSquare style={{ cursor:'pointer',color: "darkgray", fontSize: "16px",display:'inline',alignSelf:'center',opacity:'0.5' }} />
                                                        :
                                                        <input type="checkbox" name="ISOS" value={iso.name} style={{cursor: "pointer",marginLeft:'1.990px'}} onChange={(e) => _handleIsoCheckboxChange(e)} checked={selectedIsos.some((selectedIso) => selectedIso._id === iso._id)}/>                                                      
                                                    }
                                                </>
                                            }
                                            <label style={{marginLeft: '8px'}}>{iso.name}</label>
                                        </div>
                            })
                            }
                        </div>
                    </div>
                </div>
                <div style={{fontSize: 'small',fontStyle: 'italic'}}>*las isos marcadas ya están adquiridas</div>
                <div style={{fontSize: 'small',fontStyle: 'italic'}}>*las isos inhabilitadas no están habilitadas en dicho país por el momento, pero pronto lo estarán</div>
           </div>
}