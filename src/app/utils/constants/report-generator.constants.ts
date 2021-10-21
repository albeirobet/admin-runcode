export class ReportGeneratorConstants {
  /**
   * Endpoint URL del Microservicio de reportes
   */
  public static get REPORT_GENERATOR_ENDPOINT_URL(): string {
    return 'https://report-generator-ms.herokuapp.com/api/v1/';
    // return 'http://localhost:3001/api/v1/';
  }
}
