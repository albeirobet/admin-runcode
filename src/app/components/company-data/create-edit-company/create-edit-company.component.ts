import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/model/commons/response/general-response';
import { ICompany, Company } from 'src/app/model/enterprise-information/company';
import { IReportEnable } from 'src/app/model/reports/report-enable';
import { IReportUploader } from 'src/app/model/reports/report-uploader';
import { NotificationService } from 'src/app/services/common/notification.service';
import { CompanyDataService } from 'src/app/services/enterprise-information/company-data.service';
import { ReportGeneratorService } from 'src/app/services/report-generator/report-generator.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-create-edit-company',
  templateUrl: './create-edit-company.component.html',
  styleUrls: ['./create-edit-company.component.css']
})
export class CreateEditCompanyComponent implements OnInit {

  // --- Empresa a crear o editar
  company?: ICompany;

  // --- Lista de reportes a subir
  reportsUpload?: IReportEnable[];

  // --- Lista de reportes a generar
  reportsGenerate?: IReportEnable[];

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
    logoUrl: [null, [Validators.required]],
    reportsUploader: [null, [Validators.nullValidator]],
    reportsGenerate: [null, [Validators.nullValidator]]
  });

  constructor(
    protected companyDataService: CompanyDataService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notificationService: NotificationService,
    private reportGeneratorService: ReportGeneratorService) { 
      console.log(config)
      if(config.data) {
        this.company = config.data;
      }
    }

  ngOnInit(): void {
    this.idTypeList = AppConstants.IDENTIFICATION_TYPE_LIST;
    this.getReportEnable();
  } 

  /**
   * Obtiene la configuracion de reportes
   */
  getReportEnable() {
    this.loading = true;
    this.reportGeneratorService.getReportEnable().subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        console.log(res)
        this.reportsUpload = res.body.data.filter(report => report.type === 'TEMPLATE');
        this.reportsGenerate = res.body.data.filter(report => report.type === 'GENERATED_REPORT');
        if(this.company) {
          this.updateForm(this.company);
        }
        this.loading = false;
      },
      error => {
        console.dir(error.error);
        this.loading = false;
      }
    );
  }

  /**
   * Actualizar valores de la empresa en el formulario
   * @param company
   */
  updateForm(company: ICompany): void {
    // --- Setear rep uploader
    let repUploader = [];
    this.reportsUpload.forEach(ru => {
      company.reportsUploader.forEach(ruant => {
        if(ru.code === ruant.code) {
          repUploader.push(ru);
        }
      });
    });

    // --- Setear rep generate
    let repGenerate = [];
    this.reportsGenerate.forEach(ru => {
      company.reportsGenerate.forEach(ruant => {
        if(ru.code === ruant.code) {
          repGenerate.push(ru);
        }
      });
    });

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
      logoUrl: company.logoUrl,
      reportsUploader: repUploader,
      reportsGenerate: repGenerate
    });
  }

  /**
   * Guardar informacion de la empresa en el sistema
   */
  save(): void {
    const company = this.createFromForm();  
    this.loading = true;
    if (company._id) {
      this.updateCompany(company);
    } else {
      this.createCompany(company);
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
      logoUrl: this.editForm.get(['logoUrl'])!.value,
      reportsUploader: this.editForm.get(['reportsUploader'])!.value,
      reportsGenerate: this.editForm.get(['reportsGenerate'])!.value
    };
  }

  async createCompany(company) {

    try{
      let res = await this.createCompanyOnly(company);
      console.log('company: ', res)
      let repUploaders = this.editForm.get(['reportsUploader'])!.value;
      let repGenerate = this.editForm.get(['reportsGenerate'])!.value;

      if(repUploaders) {
        let repup = this.getRepUploaders(res.data._id);
        await this.createReportUploaders(repup);
      } 
      if(repGenerate) {
        let repgen = this.getRepGenerates(res.data._id);
        await this.createReportCreator(repgen);
      } 
      this.loading = false;
      this.ref.close(true);
    }
    catch(error) {
      console.log(error)
      if(error.error.apiError.code == 'EM_COMMON_07') {
        this.notificationService.error('El correo ingresado ya ha sido registrado, por favor verifique los datos.');
      } else {
        this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
      }
      this.loading = false;
    }
  }

  updateCompany(company) {
    this.companyDataService.update(company).subscribe(
      (res: HttpResponse<GeneralResponse>) => {
        console.log('company: ', res)
        this.updateReportUploaders(res.body.data._id);
      },
      error => {
        console.log(error)
        if(error.error.apiError.code == 'EM_COMMON_07') {
          this.notificationService.error('El correo ingresado ya ha sido registrado, por favor verifique los datos.');
        } else {
          this.notificationService.error('Se ha presentado un error en el sistema, por favor intente nuevamente.');
        }
        this.loading = false;
      }
    );
  }

  /**
   * Obtener el array de reportes que puede generar una empresa
   * @param companyId 
   */
  getRepGenerates(companyId): any[] {
    let repGenerates = this.editForm.get(['reportsGenerate'])!.value;
    let repGeneratesToConfig = [];
    repGenerates.forEach(element => {
      repGeneratesToConfig.push(
        {
          "name": element.name,
          "code": element.code,
          "companyId": companyId
        }
      );
    });
    return repGeneratesToConfig;
  }

  getRepUploaders(companyId): any[] {
    let repUploaders = this.editForm.get(['reportsUploader'])!.value;
    let repUploaderToConfig = [];
    repUploaders.forEach(element => {
      repUploaderToConfig.push(
        {
          "name": element.name,
          "code": element.code,
          "companyId": companyId
        }
      );
    });
    return repUploaderToConfig;
  }

  /**
   * Crear la empresa
   */
  async createCompanyOnly(company) {
    const value = <GeneralResponse>await 
      this.companyDataService.create(company).toPromise();
    return value;
  }

  /**
   * Crear la configuracion de reportes a subir
   */
  async createReportUploaders(repUploaderToConfig) {
    const value = <GeneralResponse>await 
      this.reportGeneratorService.createReportUploader(repUploaderToConfig).toPromise();
    return value;
  }

  /**
   * Eliminar la configuracion de reportes a subir
   */
  async deleteReportUploaders(repUploaderToConfig) {
    const value = <GeneralResponse>await 
      this.reportGeneratorService.deleteReportUploader(repUploaderToConfig).toPromise();
    return value;
  }

  /**
   * Crear la configuracion de reportes a descargar
   */
  async createReportCreator(repGeneratesToConfig) {
    const value = <GeneralResponse> await 
    this.reportGeneratorService.createReportCreator(repGeneratesToConfig).toPromise();
    return value;
  }

  /**
   * Eliminar la configuracion de reportes a subir
   */
  async deleteReportCreator(repGenToDelete) {
    const value = <GeneralResponse>await 
      this.reportGeneratorService.deleteReportCreator(repGenToDelete).toPromise();
    return value;
  }

  /**
   * Actualizar la configuracion de reportes a subir
   */
  async updateReportUploaders(companyId) {
    this.loading = true;
    let repUploadersNew = this.editForm.get(['reportsUploader'])!.value;

    let deleteru = [];
    this.company.reportsUploader.forEach(ruant => {
      let found = false;
      repUploadersNew.forEach(runew => {
        if(ruant.code === runew.code) {
          found = true;
        }
      });
      if(!found) {
        deleteru.push(ruant);
      }
    });

    let newru = [];
    repUploadersNew.forEach(ruant => {
      let found = false;
      this.company.reportsUploader.forEach(runew => {
        if(ruant.code === runew.code) {
          found = true;
        }
      });
      if(!found) {
        newru.push(ruant);
      }
    });

    let repUploaderToConfig = [];
    newru.forEach(element => {
      repUploaderToConfig.push(
        {
          "name": element.name,
          "code": element.code,
          "companyId": companyId
        }
      );
    });

    let repUploaderToDelete = [];
    deleteru.forEach(element => {
      repUploaderToDelete.push(
        {
          "code": element.code,
          "companyId": companyId
        }
      );
    });

    let repGenerateNew = this.editForm.get(['reportsGenerate'])!.value;

    let deleteGenru = [];
    this.company.reportsGenerate.forEach(ruant => {
      let found = false;
      repGenerateNew.forEach(runew => {
        if(ruant.code === runew.code) {
          found = true;
        }
      });
      if(!found) {
        deleteGenru.push(ruant);
      }
    });

    let newGenru = [];
    repGenerateNew.forEach(ruant => {
      let found = false;
      this.company.reportsGenerate.forEach(runew => {
        if(ruant.code === runew.code) {
          found = true;
        }
      });
      if(!found) {
        newGenru.push(ruant);
      }
    });

    let repGenToConfig = [];
    newGenru.forEach(element => {
      repGenToConfig.push(
        {
          "name": element.name,
          "code": element.code,
          "companyId": companyId
        }
      );
    });

    let repGenToDelete = [];
    deleteGenru.forEach(element => {
      repGenToDelete.push(
        {
          "code": element.code,
          "companyId": companyId
        }
      );
    });

    try {
      if(repUploaderToConfig && repUploaderToConfig.length > 0) {
        await this.createReportUploaders(repUploaderToConfig);
      }
      if(repGenToConfig && repGenToConfig.length > 0) {
        await this.createReportCreator(repGenToConfig);
      }
      if(repUploaderToDelete) {
        console.log(deleteru)
        await this.deleteReportUploaders(repUploaderToDelete);
      }
      if(repGenToDelete) {
        await this.deleteReportCreator(repGenToDelete);
      }

      this.loading = false;
      this.ref.close(true);

    } catch (error) {
      console.log('error: ', error);
      this.loading = false;
    }
    
  }

  close(): void {
    this.ref.close(null);
  }

}
