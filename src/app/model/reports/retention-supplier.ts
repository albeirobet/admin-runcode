export interface IRetentionSupplier {
    _id?: string;
    company?: string;
    supplierId?: string;
    supplierName?: string;
    postingDate?: string;
    invoiceId?: string;
    invoicePosition?: string;
    amountCompanyCurrency?: string;
    reteFuentePercentage?: string;
    reteFuenteValue?: string;
    reteIcaPercentage?: string,
    reteIcaValue?: string,
    reteIvaPercentage?: string,
    reteIvaValue?: string,
    companyId?: string;
    userId?: string;
}

export class RetentionSupplier implements IRetentionSupplier {
    constructor(
        public _id?: string,
        public company?: string,
        public supplierId?: string,
        public supplierName?: string,
        public postingDate?: string,
        public invoiceId?: string,
        public invoicePosition?: string,
        public amountCompanyCurrency?: string,
        public reteFuentePercentage?: string,
        public reteFuenteValue?: string,
        public reteIcaPercentage?: string,
        public reteIcaValue?: string,
        public reteIvaPercentage?: string,
        public reteIvaValue?: string,
        public companyId?: string,
        public userId?: string) {}
}