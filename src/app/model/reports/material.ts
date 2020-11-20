export interface IMaterial {
    _id?: string;
    materialId?: string;
    name?: string;
    baseUnitMeasure?: string;
    productCategory?: string;
    type?: string;
    createdAt?: string;
    modifiedAt?: string;
    companyId?: string;
    userId?: string;
}

export class Material implements IMaterial {
    constructor(
        public _id?: string,
        public materialId?: string,
        public name?: string,
        public baseUnitMeasure?: string,
        public productCategory?: string,
        public type?: string,
        public createdAt?: string,
        public modifiedAt?: string,
        public companyId?: string,
        public userId?: string) {}
}