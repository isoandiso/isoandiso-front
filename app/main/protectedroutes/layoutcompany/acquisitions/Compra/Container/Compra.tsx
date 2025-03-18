import React, { useState } from 'react';
import Header from '../Components/Header';
import Subheader from '../Components/Subheader';
import Countries from '../Components/Countries';
import Isos from '../Components/Isos';
import AcquisitionsTypes from '../Components/AcquisitionsTypes';
import { Iso,CompanyCountry } from "../../../../../../models/apiModels";

function Compra(props) {
  const {company,getCompany} = props;
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