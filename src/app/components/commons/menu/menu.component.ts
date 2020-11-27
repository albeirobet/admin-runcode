import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access-service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  navbarOpen = true;
  activeURL = "";

  constructor(private userRouteAccessService: UserRouteAccessService,
    private router: Router) { 
      this.activeURL = this.router.url;
    }

  ngOnInit(): void {
  }

  checkUserRole(roleToCheck: string): boolean {
    return this.userRouteAccessService.checkUserRole(roleToCheck);
  }

  userList(): void {
    this.activeURL = '/dashboard/user-list';
    this.router.navigate(['/dashboard/user-list']);
  }

  companyList(): void {
    this.activeURL = '/dashboard/company-list';
    this.router.navigate(['/dashboard/company-list']);
  }

  uploadInfo(): void {
    this.activeURL = '/dashboard/upload-info';
    this.router.navigate(['/dashboard/upload-info']);
  }

  viewReports(): void {
    this.activeURL = '/dashboard/reports';
    this.router.navigate(['/dashboard/reports']);
  }

  genReports(): void {
    this.activeURL = '/dashboard/download-reports';
    this.router.navigate(['/dashboard/download-reports']);
  }

  dashboard(): void {
    this.activeURL = '/dashboard';
    this.router.navigate(['/dashboard']);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
