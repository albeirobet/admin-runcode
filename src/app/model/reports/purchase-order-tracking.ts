export interface IPurchaseOrderTracking {
    _id?: string;
    supplierId?: string;
    supplierName?: string;
    purchaseOrderId?: string;
    purchaseOrderDate?: string;
    requestedAmount?: string;
    netPriceCompanyCurrency?: string;
    deliveredQuantity?: string;
    deliveredValue?: string;
    deliveredValueCompanyCurrency?: string;
    invoicedAmount?: string;
    invoicedValue?: string;
    invoicedValueCompanyCurrency?: string;
    companyId?: string;
    userId?: string;
}

export class PurchaseOrderTraking implements IPurchaseOrderTracking {
    constructor(
        public _id?: string,
        public supplierId?: string,
        public supplierName?: string,
        public purchaseOrderId?: string,
        public purchaseOrderDate?: string,
        public requestedAmount?: string,
        public netPriceCompanyCurrency?: string,
        public deliveredQuantity?: string,
        public deliveredValue?: string,
        public deliveredValueCompanyCurrency?: string,
        public invoicedAmount?: string,
        public invoicedValue?: string,
        public invoicedValueCompanyCurrency?: string,
        public companyId?: string,
        public userId?: string) {}
}

