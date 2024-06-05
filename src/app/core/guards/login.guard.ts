import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenManagerService } from "../../auth/services";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _tokenManager: TokenManagerService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this._tokenManager.getToken();
    if (token) {
      this._router.navigate(["/dashboard"]); // If token exists, redirect to dashboard
      return false;
    }
    return true;
  }
}
