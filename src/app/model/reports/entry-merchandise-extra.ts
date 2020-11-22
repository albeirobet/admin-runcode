export interface IEntryMerchandiseExtra {
  _id?: string;
  entryMerchandiseState?: string;
  supplierId?: string;
  supplierName?: string;
  entryMerchandiseId?: string;
  purchaseOrderId?: string;
  quantity?: string;
  netValueCompanyCurrency?: string;
  price?: string;
  priceUnit?: string;
  companyId?: string;
  userId?: string;
}

export class EntryMerchandiseExtra implements IEntryMerchandiseExtra {
  constructor(
      public _id?: string,
      public entryMerchandiseState?: string,
      public supplierId?: string,
      public supplierName?: string,
      public entryMerchandiseId?: string,
      public purchaseOrderId?: string,
      public quantity?: string,
      public netValueCompanyCurrency?: string,
      public price?: string,
      public priceUnit?: string,
      public companyId?: string,
      public userId?: string) {}
}
