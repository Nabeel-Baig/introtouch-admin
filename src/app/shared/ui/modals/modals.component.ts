import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {
  @Input() closeButtonVisible: boolean = true;
  constructor(public modal: NgbActiveModal) {
  }

  @Input() headerTitle: string = "";

  closeModal() {
    this.modal.close("closed");
  }

}
