export interface ISupplier {
    _id?: string;
    state?: string;
    supplier?: string;
    name?: string;
    address?: string;
    paymentConditions?: string;
    city?: string;
    email?: string;
    department?: string;
    bankName?: string;
    bankAccountNumber?: string;
    identificationType?: string;
    identificationNumber?: string;
    country?: string;
    counter?: string;
    companyId?: string;
    userId?: string;
}

export class Supplier implements ISupplier {
    constructor(
        public _id?: string,
        public state?: string,
        public supplier?: string,
        public name?: string,
        public address?: string,
        public paymentConditions?: string,
        public city?: string,
        public email?: string,
        public department?: string,
        public bankName?: string,
        public bankAccountNumber?: string,
        public identificationType?: string,
        public identificationNumber?: string,
        public country?: string,
        public counter?: string,
        public companyId?: string,
        public userId?: string) {}
}