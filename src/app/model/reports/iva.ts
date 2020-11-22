export interface IIva {
  _id?: string;
  //Cuenta de mayor (neta)
  mayorAccountNetId?: string;
  //Nombre Cuenta de mayor (neta)
  mayorAccountNetName?: string;
  //ID de asiento contable
  accountingSeatId?: string;
  //ID de documento original
  originalDocumentId?: string;
  //Tipo de documento original
  originalDocumentType?: string;
  //Código de impuesto
  taxCode?: string;
  //Tasa de impuesto
  taxRate?: string;
  //Tipo de impuesto
  taxType?: string;
  //Importe neto (moneda de empresa)
  netAmountCompanyCurrency?: string;
  //Importe deducible (moneda de transacción)
  deductibleAmountTransactionCurrency?: string;
  //Importe de impuesto interno (moneda de transacción)
  internalTaxAmountTransactionCurrency?: string;
  //Importe neto (moneda de transacción)
  netAmountTransactionCurrency?: string;
  //Importe de impuesto (moneda de transacción)
  taxAmountTransactionCurrency?: string;
  //Importe base de impuesto (moneda de transacción)
  taxBaseAmountTransactionCurrency?: string;
  //Importe de impuesto interno (moneda de declaración de impues
  internalTaxAmountTaxDlecarationCurrency?: string;
  //Importe no deducible (moneda de transacción)
  noDeductibleAmountTransactionCurrency?: string;
  //Contador
  counter?: string;
  companyId?: string;
  userId?: string;
}

export class Iva implements IIva {
  constructor(
      public _id?: string,
      //Cuenta de mayor (neta)
      public mayorAccountNetId?: string,
      //Nombre Cuenta de mayor (neta)
      public mayorAccountNetName?: string,
      //ID de asiento contable
      public accountingSeatId?: string,
      //ID de documento original
      public originalDocumentId?: string,
      //Tipo de documento original
      public originalDocumentType?: string,
      //Código de impuesto
      public taxCode?: string,
      //Tasa de impuesto
      public taxRate?: string,
      //Tipo de impuesto
      public taxType?: string,
      //Importe neto (moneda de empresa)
      public netAmountCompanyCurrency?: string,
      //Importe deducible (moneda de transacción)
      public deductibleAmountTransactionCurrency?: string,
      //Importe de impuesto interno (moneda de transacción)
      public internalTaxAmountTransactionCurrency?: string,
      //Importe neto (moneda de transacción)
      public netAmountTransactionCurrency?: string,
      //Importe de impuesto (moneda de transacción)
      public taxAmountTransactionCurrency?: string,
      //Importe base de impuesto (moneda de transacción)
      public taxBaseAmountTransactionCurrency?: string,
      //Importe de impuesto interno (moneda de declaración de impues
      public internalTaxAmountTaxDlecarationCurrency?: string,
      //Importe no deducible (moneda de transacción)
      public noDeductibleAmountTransactionCurrency?: string,
      //Contador
      public counter?: string,
      public companyId?: string,
      public userId?: string) {}
}
