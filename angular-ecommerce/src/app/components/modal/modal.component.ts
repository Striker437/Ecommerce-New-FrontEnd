import { Component, OnInit, Type, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: "app-modal",
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Product deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete this Product</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" routerLink="/cart-details/{{userId}}" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
 
})
export class ModalComponent implements OnInit {
  userdetails: any;
  userId: any;

  constructor(public modal: NgbActiveModal,
    private loginService:LoginService) {}


    

  

  ngOnInit(): void {
    this.userdetails = JSON.parse(this.loginService.getUserdetail());      
    this.userId=this.userdetails.id;
  }

  









 

  
}

@Component({
  selector: 'ngbd-modal-focus',
  templateUrl: './modal.component.html'
})
export class NgbdModalFocus {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  constructor(private _modalService: NgbModal) {}

  open(name: string) {
    this._modalService.open(MODALS[name]);
  }
}










const MODALS: {[name: string]: Type<any>} = {
  focusFirst: ModalComponent
};




