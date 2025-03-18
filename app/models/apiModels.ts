export interface Company {
    _id?: string;
    email: string;
    phone: string;
    ruc?: string | null;
    socialReason?: string | null;
    countryId?: string | null;
    province?: string | null;
    city?: string | null;
    address?: string | null;
    economicActivity?: string | null;
    economicSector?: string | null;
    companySize?: "Micro" | "Pequeña" | "Mediana" | "Grande" | null;
    acquisitionIds?: string[];
    siteIds?: string[];
    areaIds?: CompanyArea[];
}

export interface Iso {
  _id: string;
  name: string;
};

export interface CompanyCountry {
  _id: string;
  name: string;
  isoIds: (Iso|null)[]; 
};

export interface CompanyAcquisitionType {
  _id: string;
  name: string;
};

export interface CompanyAcquisition {
  _id: string;
  isoIds:Iso[];
  acquisitionTypeId:CompanyAcquisitionType;
  acquisitionDate:Date;
  expirationDate:Date | null;
  invoiceLink: string | null; 
};

export interface CompanyArea {
  _id: string;
  name: string;
  charges: string[];
  isoIds:Iso[];
  responsibleEmployeeId: Employee;
};

export interface Employee {
  _id: string;
    name: string | null;
    lastname: string | null;
    email: string;
    password: string | null;
    dni: string;
    mothers_lastname: string;
    fathers_lastname: string;
    birthDate: Date;
    companyAreaId: string;
    charge: string;
    entryDate: Date;
    contractTerminationDate: Date | null;
    areaEntryDate: Date;
    province: string;
    city: string;
    address: string;
    district: string;
    corporateEmail: string;
    nationalityId: string;
    gender: "Masculino" | "Femenino" | "";
    civilStatus: "Soltero/a" | "Casado/a" | "Divorciado/a" | "Conviviente" | "Viudo/a" | "";
    personalPhone: string;
    facialRecognition: string | null;
    digitalSignature: string | null;
    status: "Activo" | "Inactivo";
    workSiteId: string;
    rolId: string;
    sizePants: 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44;
    sizePolo: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    sizeShoe: 36 | 38 | 40 | 42 | 44;
    companyIds: string[];
};  

export interface employeeNationality {
  _id: string;
  name: string;
};

export interface CompanySite {
  _id: string;
  name: string;
  address: string;
  city: string;
  province: string;
};

export interface Rol {
  _id: string;
  name: string;
};