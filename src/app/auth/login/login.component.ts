import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService, TokenManagerService } from "../services";
import { LoginRequest, LoginResponse } from "../models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted: boolean = false;
  error: string = "";
  returnUrl: string;
  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _tokenManager: TokenManagerService,
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      userEmail: ["", [Validators.required, Validators.email]],
      userPassword: ["", [Validators.required]],
    });
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";
  }

  /*get form(): any {
    return this.loginForm.controls;
  }*/

  /**
   * Form submit
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const loginData: LoginRequest = this.loginForm.value;
    this._authService.login(loginData).subscribe({
      next: (response: LoginResponse): void => {
        if (response.data.token) {
          this._tokenManager.setToken(response.data.token);
          this._router.navigate(["/dashboard"]);
          console.log("token", response.data.token);
        }
      },
      error: (error): void => {
        console.error("Error", error);
        this.error = "Request validation failed";
        // this.processServerErrors(error.error.context.validationErrors);
      },
    });
  }

  /*processServerErrors(validationErrors: ValidationErrorItem): void {
    for (const key of Object.keys(validationErrors)) {
      const control = this.loginForm.get(key);
      if (control) {
        console.log("serverError",validationErrors[key][0])
        control.setErrors({ serverError: validationErrors[key][0] });
      }
    }
  }*/
}
