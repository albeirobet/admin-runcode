export interface IReportEnable {
  _id?: string;
  name?: string;
  code?: string;
  state?: string;
  message?: string;
  instructions?: string;
  type?: string;
}

export class ReportEnable implements IReportEnable {
  constructor(
      public _id?: string,
      public name?: string,
      public code?: string,
      public state?: string,
      public message?: string,
      public instructions?: string,
      public type?: string) {}
}
