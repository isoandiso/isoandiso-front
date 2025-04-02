import { useState } from 'react';
import Header from '../Components/Header';
import Subheader from '../Components/Subheader';
import Countries from '../Components/Countries';
import Isos from '../Components/Isos';
import AcquisitionsTypes from '../Components/AcquisitionsTypes';
import { Company } from 'src/models/apimodels/Company';
import { Iso } from 'src/models/apimodels/Iso';
import { CompanyCountry } from 'src/models/apimodels/CompanyCountry';

function Compra({company,getCompany}:{ company: Company; getCompany: () => Promise<void> }) {

  //VARiABLES

  const [selectedCountry, setSelectedCountry] = useState<CompanyCountry | null>(null);
  const [selectedIsos, setSelectedIsos] = useState<Iso[]>([]);

  return <>
            <Header></Header>
            <Subheader></Subheader>
            <Countries company={company} setSelectedCountry={setSelectedCountry} setSelectedIsos={setSelectedIsos}></Countries>
            <Isos company={company} setSelectedIsos={setSelectedIsos} selectedCountry={selectedCountry} selectedIsos={selectedIsos}></Isos>
            <AcquisitionsTypes selectedCountry={selectedCountry} selectedIsos={selectedIsos} company={company} getCompany={getCompany} setSelectedIsos={setSelectedIsos}></AcquisitionsTypes>
         </>
}

export default Compra;