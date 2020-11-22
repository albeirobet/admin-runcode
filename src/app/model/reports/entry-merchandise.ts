export interface IEntryMerchandise {
    _id?: string;
    state?: string;
    supplier?: string;
    supplierName?: string;
    productId?: string;
    productName?: string;
    entryMerchandiseId?: string;
    positionEntryMerchandiseId?: string;
    purchaseOrderId?: string;
    quantityBaseUnitMeasure?: string;
    quantity?: string,
    netValue?: string,
    netValueCompanyCurrency?: string,
    price?: string,
    priceUnit?: string,
    companyId?: string;
    userId?: string;
}

export class EntryMerchandise implements IEntryMerchandise {
    constructor(
        public _id?: string,
        public state?: string,
        public supplier?: string,
        public supplierName?: string,
        public productId?: string,
        public productName?: string,
        public entryMerchandiseId?: string,
        public positionEntryMerchandiseId?: string,
        public purchaseOrderId?: string,
        public quantityBaseUnitMeasure?: string,
        public quantity?: string,
        public netValue?: string,
        public netValueCompanyCurrency?: string,
        public price?: string,
        public priceUnit?: string,
        public companyId?: string,
        public userId?: string) {}
}