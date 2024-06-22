import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { DecimalPipe } from "@angular/common";

import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from "../models/user.model";

import { UserService } from "../services/user.service";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "../services/advanced-sortable.directive";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserCreateComponent } from "../user-create/user-create.component";
import { UserUpdateComponent } from "../user-update/user-update.component";
import { ConfirmModalComponent } from "src/app/shared/ui/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-services",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
  providers: [UserService, DecimalPipe],
})

/**
 * Advanced table component
 */
export class UserTableComponent implements OnInit {
  title: string = "User";
  // bread crumb data
  breadCrumbItems: Array<{}>;
  // Table data
  tables$: Observable<User[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;

  constructor(
    public service: UserService,
    private modalService: NgbModal,
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Users" },
      { label: "Users Lists", active: true },
    ];
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  createModal() {
    this.modalService.open(UserCreateComponent, { centered: true });
  }

  updateModal(user: User) {
    const modalRef = this.modalService.open(UserUpdateComponent, { centered: true });
    modalRef.componentInstance.user = user;
  }

  deleteModal(user: User) {
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true });
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.passEntry.subscribe((data)=> {
    modalRef.close();
    console.log(data);
    this.tables$ = this.tables$.pipe(map(tables => tables.filter(x => x.userUuid != data.userUuid)));
    this.total$ = this.total$.pipe(map(value => value - 1));
    });
  }

}