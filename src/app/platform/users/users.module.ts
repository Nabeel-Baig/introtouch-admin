import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UIModule} from '../../shared/ui/ui.module';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {UsersRoutingModule} from './users-routing.module';
import {AdvancedSortableDirective} from './services/advanced-sortable.directive';
import {UserTableComponent} from './user-table/user-table.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';


@NgModule({
  declarations: [UserTableComponent, AdvancedSortableDirective, UserCreateComponent, UserUpdateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ]
})
export class UsersModule {
}
