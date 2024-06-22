import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalsComponent } from './modals/modals.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
@NgModule({
  declarations: [PagetitleComponent,  LoaderComponent, ModalsComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule
  ],
    exports: [PagetitleComponent, LoaderComponent, ModalsComponent, ConfirmModalComponent]
})
export class UIModule { }
