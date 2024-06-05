import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import {UserModel} from "../../layouts/models";

@Injectable({
  providedIn: "root",
})
export class TokenManagerService {
  private userSubject: BehaviorSubject<UserModel | null>;
  public user: Observable<UserModel | null>;
  constructor() {
    const token: string = this.getToken();
    const decoded: UserModel | null = token ? jwtDecode<UserModel>(token) : null;
    this.userSubject = new BehaviorSubject<UserModel | null>(decoded);
    this.user = this.userSubject.asObservable();
  }

  // Retrieves the token from localStorage
  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  // Saves the token to localStorage
  setToken(token: string): void {
    localStorage.setItem("authToken", token);
    const decoded: UserModel = jwtDecode<UserModel>(token);
    this.userSubject.next(decoded);
  }

  // Removes the token from localStorage
  removeToken(): void {
    localStorage.removeItem("authToken");
    this.userSubject.next(null);
  }
  // Returns the current user value
  get userValue(): any {
    return this.userSubject.value;
  }
}
