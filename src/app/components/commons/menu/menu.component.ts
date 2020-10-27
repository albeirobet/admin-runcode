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

  constructor(private userRouteAccessService: UserRouteAccessService,
    private router: Router) { }

  ngOnInit(): void {
  }

  checkUserRole(roleToCheck: string): boolean {
    return this.userRouteAccessService.checkUserRole(roleToCheck);
  }

  userList(): void {
    this.router.navigate(['/dashboard/user-list']);
  }

  dashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
