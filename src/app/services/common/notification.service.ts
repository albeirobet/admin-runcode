import { Injectable } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { AppConstants } from 'src/app/utils/constants/app-constants';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(public iziToast: Ng2IzitoastService) {}

  success(desc: string): void {
    this.iziToast.show({
      icon: 'ico-success',
      color: 'green',
      position: 'topRight',
      title: AppConstants.SUCCESS_MSG_TITLE,
      message: desc
    });
  }

  error(desc: string): void {
    this.iziToast.show({
      icon: 'ico-error',
      color: 'red',
      position: 'topRight',
      title: AppConstants.ERROR_MSG_TITLE,
      message: desc
    });
  }

}