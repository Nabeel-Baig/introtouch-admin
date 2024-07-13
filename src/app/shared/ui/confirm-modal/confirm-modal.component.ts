import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/layouts/models/user.model";
import { UserService } from "src/app/platform/users/services/user.service";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.scss"],
})
export class ConfirmModalComponent {
  @Input() public user: User;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  deleteButton: boolean = false;
  constructor(
    public modal: NgbActiveModal,
    public userService: UserService,
  ) {}

  public deleteUser(): void {
    this.deleteButton = true;
    this.userService.deleteUser(this.user.userUuid).subscribe(
      (data: void): void => {
        this.passEntry.emit(this.user);
      },
      (error) => console.log(error),
    );
  }
}
