import { SelectItem } from 'primeng/api';

export class AppConstants {
  public static get APP_VERSION(): string {
    return '2.0.0';
  }

  public static get URL_IP_ADDRESS(): string {
    return 'https://jsonip.com';
  }

  /**
   * Regex para validacion de email
   */
  public static get REGEX_EMAIL(): string {
    return "[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])";
  }

  /**
   * Titulo mensaje exito
   */
  public static get SUCCESS_MSG_TITLE(): string {
    return 'ÉXITO';
  }

  /**
   * Titulo mensaje error
   */
  public static get ERROR_MSG_TITLE(): string {
    return 'ERROR';
  }

  /**
   * Rol de usuario generico en el registro
   */
  public static get ROL_GENERIC_USER(): string {
    return 'user';
  }

  /**
   * Lista de tipos de identificacion
   */
  public static get IDENTIFICATION_TYPE_LIST(): SelectItem[] {
    return [
      { label: 'CC', value: 'CEDULA' },
      { label: 'NIT', value: 'NIT' },
      { label: 'CE', value: 'CEDULA EXTRANJERIA' },
    ];
  }

  public static get REPORT_DATOS_DOCUMENTOS_FACTURAS(): string {
    return 'ASITM';
  }

  public static get REPORT_DATOS_CLIENTES(): string {
    return 'CLITM';
  }

  public static get REPORT_SEGUIMIENTO_ENTRADA_MERCANCIAS(): string {
    return 'EMETM';
  }

  public static get REPORT_ENTRADA_MERCANCIAS(): string {
    return 'EMSTM';
  }

  public static get REPORT_FACTURAS_VENTAS(): string {
    return 'INCTM';
  }

  public static get REPORT_FACTURAS_PROVEEDORES(): string {
    return 'INSTM';
  }

  public static get REPORT_DOCUMENTOS_IVA(): string {
    return 'IVATM';
  }

  public static get REPORT_CUENTAS_CONTABLES_DOCUMENTOS(): string {
    return 'MASTM';
  }

  public static get REPORT_PLAN_CUENTAS(): string {
    return 'PCUTM';
  }

  public static get REPORT_REGISTRO_DIARIO_CUENTAS(): string {
    return 'RDCTM';
  }

  public static get REPORT_DEUDAS_SUSCRIPTORES(): string {
    return 'SDTTM';
  }

  public static get REPORT_MATERIALES(): string {
    return 'MATTM';
  }

  public static get REPORT_EXTRA_PAGOS_DEPOSITOS(): string {
    return 'PAETM';
  }

  public static get REPORT_PAGOS_DEPOSITOS(): string {
    return 'PAOTM';
  }

  public static get REPORT_PEDIDOS_COMPRA(): string {
    return 'PORTM';
  }

  public static get REPORT_SEGUIMIENTO_PEDIDOS_COMPRA(): string {
    return 'POTTM';
  }

  public static get REPORT_RETENCIONES_PROVEEDORES(): string {
    return 'RESTM';
  }

  public static get REPORT_SERVICIOS(): string {
    return 'SERTM';
  }

  public static get REPORT_PROVEEDORES(): string {
    return 'SUPTM';
  }

  public static get REPORT_GEN_SEGUIMIENTO_ENTRADA_SERVICIOS(): string {
    return 'EMEGR';
  }

  public static get REPORT_GEN_1001(): string {
    return '1001GR';
  }

  public static get REPORT_GEN_1005(): string {
    return '1005GR';
  }
  public static get REPORT_GEN_1006(): string {
    return '1006GR';
  }
  public static get REPORT_GEN_1007(): string {
    return '1007GR';
  }

  public static get REPORT_GEN_1008(): string {
    return '1008GR';
  }
  public static get REPORT_GEN_1009(): string {
    return '1009GR';
  }
}
