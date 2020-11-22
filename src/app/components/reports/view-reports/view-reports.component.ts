import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { DialogService } from 'primeng/dynamicdialog';
import { AppConstants } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css'],
  providers: [DialogService]
})
export class ViewReportsComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Visualización de Información';

  report = '';

  // --- Lista de tipos de reportes
  reportTypeList: SelectItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.reportTypeList = AppConstants.REPORTS_TYPE_LIST;
  }

}
