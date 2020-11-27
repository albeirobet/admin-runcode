export interface IReportUploader {
  _id?: string;
  name?: string;
  code?: string;
  counterRows?: string;
  state?: string;
  percentageCompletition?: string;
  message?: string;
  startDate?: string;
  endDate?: string;
  companyId?: string;
  generatorUserId?: string;
}

export class ReportUploader implements IReportUploader {
  constructor(
      public _id?: string,
      public name?: string,
      public code?: string,
      public counterRows?: string,
      public state?: string,
      public percentageCompletition?: string,
      public message?: string,
      public startDate?: string,
      public endDate?: string,
      public companyId?: string,
      public generatorUserId?: string) {}
}