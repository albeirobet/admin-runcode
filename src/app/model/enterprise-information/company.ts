export interface ICompany {
    _id?: string;
    identificationType?: string;
    identificationNumber?: string;
    name?: string;
    principalAddress?: string;
    secondaryAddress?: string;
    email?: string;
    phoneNumber?: string;
    nameContactPerson?: string;
    logoUrl?: string;
    reportsUploader?: any[];
    reportsGenerate?: any[];
}

export class Company implements ICompany {
    constructor(
        public _id?: string,
        public identificationType?: string,
        public identificationNumber?: string,
        public name?: string,
        public principalAddress?: string,
        public secondaryAddress?: string,
        public email?: string,
        public phoneNumber?: string,
        public nameContactPerson?: string,
        public logoUrl?: string,
        public reportsUploader?: any[],
        public reportsGenerate?: any[]) {}
}