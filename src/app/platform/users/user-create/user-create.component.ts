import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../form/validation/validation.mustmatch";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit{
  validationForm: UntypedFormGroup; // type validation form
  formsubmit: boolean;

  constructor(public formBuilder: UntypedFormBuilder) {
  }

  get type() {
    return this.validationForm.controls;
  }

  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      userFirstName: ['', [Validators.required]],
      userLastName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('userPassword', 'confirmpwd'),
    });
  }

  formSubmit() {
    this.formsubmit = true;
  }

}
