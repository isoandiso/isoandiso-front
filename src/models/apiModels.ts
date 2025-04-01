//Company

export interface Company {
  _id: string;
  email: string;
  phone: string;
  password?: string;
  ruc: string | null;
  socialReason: string | null;
  countryId: CompanyCountry | null;
  province: string | null;
  city: string | null;
  address: string | null;
  economicActivity: string | null;
  economicSector: string | null;
  companySize: 'Micro' | 'Pequeña' | 'Mediana' | 'Grande' | null;
  acquisitionIds: CompanyAcquisition[];
  siteIds: CompanySite[] | null;
  areaIds: CompanyArea[] | null;
  createdAt?: string;
  updatedAt?: string;
}

//Iso

export interface Iso {
  _id: string;
  name: string;
};

//CompanyCountry

export interface CompanyCountry {
  _id: string;
  name: string;
  isoIds: (Iso|null)[]; 
};

//CompanyAcquisitionType

export interface CompanyAcquisitionType {
  _id: string;
  name: string;
};

//CompanyAcquisition

export interface CompanyAcquisition {
  _id: string;
  isoIds:Iso[];
  acquisitionTypeId:CompanyAcquisitionType;
  acquisitionDate:Date;
  expirationDate:Date | null;
  invoiceLink: string | null; 
};

//CompanyArea

export interface CompanyArea {
  _id: string;
  name: string;
  charges: string[];
  isoIds:Iso[] | null;
  responsibleEmployeeId: Employee| null;
};

//Employee

export interface Employee {
	_id: string;
	name: string | null;
	lastname: string | null;
	email: string;
	password: string | null;
	dni: string;
	mothers_lastname: string;
	fathers_lastname: string;
	birthDate: Date | string;
	companyAreaId: string;
	charge: string;
	entryDate: Date | string;
	contractTerminationDate: Date | string | null;
	areaEntryDate: Date | string;
	province: string;
	city: string;
	address: string;
	district: string;
	corporateEmail: string;
	nationalityId: string;
	gender: 'Masculino' | 'Femenino' | '';
	civilStatus: 'Soltero/a' | 'Casado/a' | 'Divorciado/a' | 'Conviviente' | 'Viudo/a' | '';
	personalPhone: string;
	facialRecognition: string | null;
	digitalSignature: string | null;
	status: 'Activo' | 'Inactivo';
	employeeSiteId: string;
	rolId: string;
	sizePants: 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44;
	sizePolo: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
	sizeShoe: 36 | 38 | 40 | 42 | 44;
	companyIds: string[];
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

//EmployeeNationality

export interface EmployeeNationality {
  _id: string;
  name: string;
};

//CompanySite

export interface CompanySite {
  _id: string;
  name: string;
  address: string;
  city: string;
  province: string;
};

//Rol

export interface Rol {
  _id: string;
  name: 'Jefe' | 'Asistente' | 'Supervisor' | 'Colaborador' | '';
};