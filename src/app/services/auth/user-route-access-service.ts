import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const authorities = route.data['authorities'];
    return this.checkLogin(authorities, state.url);
  }

  checkLogin(authorities: string[], url: string): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (!authorities || authorities.length === 0) {
          return true;
        }
        console.log(account)
        if (account) {
          const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
          if (hasAnyAuthority) {
            console.log('return true')
            return true;
          }
          console.log('return false accessdeni')
          this.router.navigate(['/accessdenied']);
          return false;
        } 

        console.log('return false login')
        this.router.navigate(['/login']);
        return false;
      })
    );
  }

  checkUserRole(roleToCheck: string): boolean {
    const hasAnyAuthority = this.accountService.hasAnyAuthority(roleToCheck);
    if (hasAnyAuthority) {
      return true;
    } else {
      return false;
    }
  }

}
