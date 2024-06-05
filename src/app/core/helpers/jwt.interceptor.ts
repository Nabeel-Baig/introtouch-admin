import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenManagerService } from "../../auth/services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _tokenManager: TokenManagerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token: string = this._tokenManager.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
