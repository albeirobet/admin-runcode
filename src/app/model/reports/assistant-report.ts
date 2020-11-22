export interface IAssistantReport {
  _id?: string;
  invoiceId?: string;
  invoiceDate?: string;
  supplierId?: string;
  supplierName?: string;
  entryMerchandiseId?: string;
  inboundDeliveryConfirmedId?: string;
  purchaseOrderId?: string;
  supplierCoName?: string;
  supplierCoId?: string;
  refundCo?: string;
  externalDocumentId?: string;
  invoicePosition?: string;
  counter?: string;
  grossAmountCompanyCurrency?: string;
  netAmountCompanyCurrency?: string;
  grossValue?: string;
  netValue?: string;
  companyId?: string;
  userId?: string;
}

export class AssistantReport implements IAssistantReport {
  constructor(
      public _id?: string,
      public invoiceId?: string,
      public invoiceDate?: string,
      public supplierId?: string,
      public supplierName?: string,
      public entryMerchandiseId?: string,
      public inboundDeliveryConfirmedId?: string,
      public purchaseOrderId?: string,
      public supplierCoName?: string,
      public supplierCoId?: string,
      public refundCo?: string,
      public externalDocumentId?: string,
      public invoicePosition?: string,
      public counter?: string,
      public grossAmountCompanyCurrency?: string,
      public netAmountCompanyCurrency?: string,
      public grossValue?: string,
      public netValue?: string,
      public companyId?: string,
      public userId?: string) {}
}