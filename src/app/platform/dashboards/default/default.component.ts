import { Component, OnInit } from "@angular/core";
import { User, UserModel } from "../../../layouts/models";
import { TokenManagerService } from "../../../auth/services";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  constructor(private _tokenManager: TokenManagerService) {}
  user: User | null;

  ngOnInit() {
    this._tokenManager.user.subscribe((userInfo: UserModel) => {
      if (userInfo) {
        this.user = userInfo.properties;
      }
    });
  }
}
