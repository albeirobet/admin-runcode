import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
    constructor(public auth: AccountService, public router: Router) { }


    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;

    }
}
