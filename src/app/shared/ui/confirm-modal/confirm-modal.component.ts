import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { User } from 'src/app/layouts/models/user.model';
import { UserService } from 'src/app/platform/users/services/user.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() public user: User;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public modal: NgbActiveModal, public userService: UserService) {
  }


  public deleteUser() {
    this.userService.deleteUser(this.user.userUuid).subscribe(
      (data)=> {
        this.passEntry.emit(this.user);
      },
       (error)=> console.log(error)
      );
    
  }
}
