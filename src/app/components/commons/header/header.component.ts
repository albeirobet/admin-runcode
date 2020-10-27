import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { IAccount } from 'src/app/model/access-control/account';
import { AccountService } from 'src/app/services/auth/account.service';
import { LoginService } from 'src/app/services/auth/login.service';

declare function menuTgg(): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {

  account: IAccount = null;

  constructor(private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,
    public dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account.data;
      }
    });
  }

  menuToggle(){
    menuTgg();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  openAccountUser(): void {
    this.router.navigate(['/dashboard/account']);
  }

  void(): void{
  }

}
