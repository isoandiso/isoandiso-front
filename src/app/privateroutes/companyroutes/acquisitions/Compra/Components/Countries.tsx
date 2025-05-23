import React, { useEffect,useState } from "react"
import { FiAlertCircle } from "react-icons/fi";
import _api_calls_company_country from "src/api/apicalls/_api_calls_company_country";
import { Iso } from "src/models/apimodels/Iso";
import { CompanyCountry } from "src/models/apimodels/CompanyCountry";
import { Company } from "src/models/apimodels/Company";

export default function Countries({company,setSelectedCountry,setSelectedIsos}:{company:Company,setSelectedCountry:React.Dispatch<React.SetStateAction<CompanyCountry | null>>,setSelectedIsos:React.Dispatch<React.SetStateAction<Iso[]>>}){
    
    //VARIABLES
    const [countries, setCountries] = useState<CompanyCountry[]>([]);

    //FUNCTIONS
    async function getAllCountries(){
        const countries = await _api_calls_company_country._getAllCountries();
        if(countries){
            setCountries(countries);
        }else{
            setCountries([]);
        }
    }
    function _handlecountrySelectChange(e:React.ChangeEvent<HTMLSelectElement>){
        setSelectedIsos([]); // limpiamos el guardador de isos seleccionadas
        const {value} = e.target;
        const country = countries.find(country=>country.name===value);
        country ? setSelectedCountry(country) : setSelectedCountry(null);        
    }
    //USE EFFECT
    useEffect(()=>{
        company.countryId === null ? getAllCountries() : setSelectedCountry(company.countryId);
    },[])

    return <div style={{padding:'0 30px'}}>
                <div style={{ fontSize: '18px', width: '100%' }}>
                    <div style={{ marginTop: '30px', marginBottom: '15px', display: 'flex' }}>
                        <p><strong>Seleccione su País</strong></p>
                        <p style={{ color: 'red', marginLeft: '2px' }}>*</p>
                        <FiAlertCircle style={{ alignSelf: 'center', marginLeft: '4px' }} />
                    </div>
                    <div>
                    {/* SELECT DE PAÍSES */}
                    {
                        company.countryId ?
                            <select style={{ padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', width: '100%', cursor:"pointer" }} disabled>
                                <option value="">{company.countryId.name}</option>
                            </select>
                            :
                            <select style={{ padding: '8px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', width: '100%', cursor:"pointer" }} onChange={(e)=>_handlecountrySelectChange(e)}>
                                <option value="">Seleccione un país</option>
                                {countries.map((country,index) =>
                                <option key={index} value={country.name}>{country.name}</option>
                                )}        
                            </select>
                    }
                    </div>
                </div>
           </div>
}