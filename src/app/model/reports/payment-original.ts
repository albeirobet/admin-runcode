export interface IPaymentOriginal {
  _id?: string;
  state?: string;
  documentId?: string;
  externalReferenceId?: string;
  createdAt?: string;
  pyamentMethod?: string;
  businessPartnerName?: string;
  bankAccountId?: string;
  minorExpensesId?: string;
  paymentAmount?: string;
  companyIdFile?: string;
  companyId?: string;
  userId?: string;
}

export class PaymentOriginal implements IPaymentOriginal {
  constructor(
      public _id?: string,
      public state?: string,
      public documentId?: string,
      public externalReferenceId?: string,
      public createdAt?: string,
      public pyamentMethod?: string,
      public businessPartnerName?: string,
      public bankAccountId?: string,
      public minorExpensesId?: string,
      public paymentAmount?: string,
      public companyIdFile?: string,
      public companyId?: string,
      public userId?: string) {}
}