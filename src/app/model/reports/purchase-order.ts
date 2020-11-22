export interface IPurchaseOrder {
    _id?: string;
    state?: string;
    purchaseOrderId?: string;
    documentId?: string;
    documentType?: string;
    invoiceDate?: string;
    orderDate?: string;
    requestedQuantity?: string;
    deliveredQuantity?: string;
    invoicedValue?: string;
    companyId?: string;
    userId?: string;
}

export class PurchaseOrder implements IPurchaseOrder {
    constructor(
        public _id?: string,
        public state?: string,
        public purchaseOrderId?: string,
        public documentId?: string,
        public documentType?: string,
        public invoiceDate?: string,
        public orderDate?: string,
        public requestedQuantity?: string,
        public deliveredQuantity?: string,
        public invoicedValue?: string,
        public companyId?: string,
        public userId?: string) {}
}