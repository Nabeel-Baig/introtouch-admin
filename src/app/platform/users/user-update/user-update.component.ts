import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../form/validation/validation.mustmatch";
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {
  validationForm: UntypedFormGroup; // type validation form
  formsubmit: boolean;
  @Input() public user: User;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public formBuilder: UntypedFormBuilder, public userService: UserService) {
  }
  

  get type() {
    return this.validationForm.controls;
  }

  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      userFirstName: ['', [Validators.required]],
      userLastName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
    this.validationForm.patchValue(this.setUserForm(this.user));
  }

  formSubmit() {
    this.formsubmit = true;
    this.updateUser();

  }

  private setUserForm(user: User) {
    return {
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userEmail: user.userEmail,
    }
  }

  private updateUser() {
    this.userService.updateUser(this.user.userUuid,this.validationForm.value);
    console.log(this.validationForm.value);
    console.log(this.userService.tables$);
    this.passEntry.emit(this.userService.tables$);
  }
}
