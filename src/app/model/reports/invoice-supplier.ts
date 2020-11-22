export interface IInvoiceSupplier {
    _id?: string;
    state?: string;
    documentId?: string;
    externalDocumentId?: string;
    documentDate?: string;
    expirationDate?: string;
    invoiceAmount?: string;
    netAmount?: string;
    taxAmount?: string;
    grossAmount?: string;
    companyId?: string;
    userId?: string;
}

export class InvoiceSupplier implements IInvoiceSupplier {
    constructor(
        public _id?: string,
        public state?: string,
        public documentId?: string,
        public externalDocumentId?: string,
        public documentDate?: string,
        public expirationDate?: string,
        public invoiceAmount?: string,
        public netAmount?: string,
        public taxAmount?: string,
        public grossAmount?: string,
        public companyId?: string,
        public userId?: string) {}
}