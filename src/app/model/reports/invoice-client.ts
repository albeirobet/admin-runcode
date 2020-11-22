export interface IInvoiceClient {
    _id?: string;
    clientName?: string;
    clientId?: string;
    invoiceId?: string;
    invoiceDate?: string;
    netValueInvoice?: string;
    tax?: string;
    netInvoicedValue?: string;
    companyId?: string;
    userId?: string;
}

export class InvoiceClient implements IInvoiceClient {
    constructor(
        public _id?: string,
        public clientName?: string,
        public clientId?: string,
        public invoiceId?: string,
        public invoiceDate?: string,
        public netValueInvoice?: string,
        public tax?: string,
        public netInvoicedValue?: string,
        public companyId?: string,
        public userId?: string) {}
}