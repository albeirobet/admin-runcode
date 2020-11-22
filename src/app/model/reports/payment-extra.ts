export interface IPaymentExtra {
  _id?: string;
  businessPartnerId?: string;
  businessPartnerName?: string;
  documentId?: string;
  documentDate?: string;
  documentType?: string;
  originalDocumentId?: string;
  originalDocumentType?: string;
  postingDate?: string;
  accountingSeatId?: string;
  // Importe en moneda de empresa
  amountCompanyCurrency?: string;
  // Importe en moneda de transacción
  amountTransactionCurrency?: string;
  counter?: string;
  companyId?: string;
  userId?: string;
}

export class PaymentExtra implements IPaymentExtra {
  constructor(
      public _id?: string,
      public businessPartnerId?: string,
      public businessPartnerName?: string,
      public documentId?: string,
      public documentDate?: string,
      public documentType?: string,
      public originalDocumentId?: string,
      public originalDocumentType?: string,
      public postingDate?: string,
      public accountingSeatId?: string,
      // Importe en moneda de empresa
      public amountCompanyCurrency?: string,
      // Importe en moneda de transacción
      public amountTransactionCurrency?: string,
      public counter?: string,
      public companyId?: string,
      public userId?: string) {}
}
