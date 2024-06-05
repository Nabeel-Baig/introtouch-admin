import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginErrorResponse, LoginRequest, LoginResponse } from "../models";
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(loginData: LoginRequest): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("userEmail", loginData.userEmail);
    formData.append("userPassword", loginData.userPassword);

    return this.http.post(`${this.url}/auth/self/login`, loginData).pipe(
      map((value) => {
        console.log("value", value);
        return value;
      }),
      catchError((err, caught) => {
        console.log("err", err);
        console.log("caught", caught);
        return caught;
      }),
    );
  }
}
