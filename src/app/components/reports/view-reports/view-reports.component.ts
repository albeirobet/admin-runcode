import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/services/common/notification.service';
import {ConfirmationService} from 'primeng/api';
import { AppConstants } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css'],
  providers: [DialogService]
})
export class ViewReportsComponent implements OnInit {

  // --- Titulo de los componentes
  titleComponent = 'Reportes';

  report = '';

  // --- Lista de tipos de reportes
  reportTypeList: SelectItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.reportTypeList = AppConstants.REPORTS_TYPE_LIST;
  }

}
