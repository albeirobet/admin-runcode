export interface IClient {
    _id?: string;
    state?: string;
    client?: string;
    name?: string;
    address?: string;
    city?: string;
    email?: string;
    department?: string;
    identificationType?: string;
    identificationNumber?: string;
    country?: string;
    companyId?: string;
    userId?: string;
}

export class Client implements IClient {
    constructor(
        public _id?: string,
        public state?: string,
        public client?: string,
        public name?: string,
        public address?: string,
        public city?: string,
        public email?: string,
        public department?: string,
        public identificationType?: string,
        public identificationNumber?: string,
        public country?: string,
        public companyId?: string,
        public userId?: string) {}
}