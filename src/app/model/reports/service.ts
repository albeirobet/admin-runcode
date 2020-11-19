export interface IService {
    _id?: string;
    serviceId?: string;
    name?: string;
    baseUnitMeasure?: string;
    productCategory?: string;
    type?: string;
    createdAt?: string;
    modifiedAt?: string;
    companyId?: string;
    userId?: string;
}

export class Service implements IService {
    constructor(
        public _id?: string,
        public serviceId?: string,
        public name?: string,
        public baseUnitMeasure?: string,
        public productCategory?: string,
        public type?: string,
        public createdAt?: string,
        public modifiedAt?: string,
        public companyId?: string,
        public userId?: string) {}
}