import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { TokenManagerService } from "../../auth/services";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
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
    const token: string = this._tokenManager.getToken();
    if (token) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(["/auth/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
