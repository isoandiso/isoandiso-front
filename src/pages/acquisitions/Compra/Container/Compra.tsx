import React, { useState } from 'react';
import Header from '../Components/Header';
import Subheader from '../Components/Subheader';
import Countries from '../Components/Countries';
import Isos from '../Components/Isos';
import AcquisitionsTypes from '../Components/AcquisitionsTypes';

function Compra(props) {
  const {user,getUser} = props;
  //TYPES
  type Iso = {
    _id: string;
    name: string;
  };
  type CompanyCountry = {
    _id: string;
    name: string;
    isoIds: (Iso|null)[]; 
  };
  //VARiABLES
  const [selectedCountry, setSelectedCountry] = useState<CompanyCountry | null>(null);
  const [selectedIsos, setSelectedIsos] = useState<Iso[]>([]);

  return <>
            <Header></Header>
            <Subheader></Subheader>
            <Countries user={user} setSelectedCountry={setSelectedCountry} setSelectedIsos={setSelectedIsos}></Countries>
            <Isos user={user} setSelectedIsos={setSelectedIsos} selectedCountry={selectedCountry} selectedIsos={selectedIsos}></Isos>
            <AcquisitionsTypes selectedCountry={selectedCountry} selectedIsos={selectedIsos} user={user} getUser={getUser} setSelectedIsos={setSelectedIsos}></AcquisitionsTypes>
         </>
}

export default Compra;