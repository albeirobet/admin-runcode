import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { ICompany, Company } from 'src/app/model/enterprise-information/company';
import { NotificationService } from 'src/app/services/common/notification.service';
import { CompanyDataService } from 'src/app/services/enterprise-information/company-data.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-create-edit-company',
  templateUrl: './create-edit-company.component.html',
  styleUrls: ['./create-edit-company.component.css']
})
export class CreateEditCompanyComponent implements OnInit {

  // --- Empresa a crear o editar
  company?: ICompany;

  // --- Lista de tipos de identificacion
  idTypeList: SelectItem[];

  loading: boolean = false;

  editForm = this.fb.group({
    _id: [],
    identificationType: [null, [Validators.required]],
    identificationNumber: [null, [Validators.required]],
    name: [null, [Validators.required]],
    principalAddress: [null, [Validators.required]],
    secondaryAddress: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(AppConstants.REGEX_EMAIL)]],
    phoneNumber: [null, [Validators.required]],
    nameContactPerson: [null, [Validators.required]],
    logoUrl: [null, [Validators.nullValidator]]
  });

  constructor(
    protected companyDataService: CompanyDataService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notificationService: NotificationService) { 
      console.log(config)
      if(config.data) {
        this.company = config.data;  
        this.updateForm(this.company);
      }
    }

  ngOnInit(): void {
    this.idTypeList = AppConstants.IDENTIFICATION_TYPE_LIST;
  }

  /**
   * Actualizar valores de la empresa en el formulario
   * @param company
   */
  updateForm(company: ICompany): void {
    this.editForm.patchValue({
      _id: company._id,
      identificationType: company.identificationType,
      identificationNumber: company.identificationNumber,
      name: company.name,
      principalAddress: company.principalAddress,
      secondaryAddress: company.secondaryAddress,
      email: company.email, 
      phoneNumber: company.phoneNumber,
      nameContactPerson: company.nameContactPerson,
      logoUrl: company.logoUrl 
    });
  }

  /**
   * Guardar informacion de la empresa en el sistema
   */
  save(): void {
    const company = this.createFromForm();
    this.loading = true;
    if (company._id) {
      this.subscribeToSaveResponse(this.companyDataService.update(company));
    } else {
      this.subscribeToSaveResponse(this.companyDataService.create(company));
    }
  }

  private createFromForm(): ICompany {
    return {
      ...new Company(),
      _id: this.editForm.get(['_id'])!.value,
      identificationType: this.editForm.get(['identificationType'])!.value,
      identificationNumber: this.editForm.get(['identificationNumber'])!.value,
      name: this.editForm.get(['name'])!.value,
      principalAddress: this.editForm.get(['principalAddress'])!.value,
      secondaryAddress: this.editForm.get(['secondaryAddress'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      nameContactPerson: this.editForm.get(['nameContactPerson'])!.value,
      logoUrl: this.editForm.get(['logoUrl'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<GeneralResponse>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      (error) => this.onSaveError(error)
    );
  }

  protected onSaveSuccess(): void {
    this.loading = false;
    this.ref.close(true);
  }

  protected onSaveError(error): void {
    console.log(error)
    if(error.error.apiError.code == 'EM_COMMON_07') {
      this.notificationService.error('El correo ingresado ya ha sido registrado, por favor verifique los datos.');
    } else {
      this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
    }
    this.loading = false;
  }

  close(): void {
    this.ref.close(null);
  }

}
