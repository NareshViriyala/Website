import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input()
  modalHeader : string;

  @Output() 
  modalHeaderChange: EventEmitter<string> = new EventEmitter<string>();

  registerModel: any = {};
  loading : boolean = false;
  constructor() { }

  ngOnInit() {}

  changeModalHeader() {
    //event emitter going back to login modal
    this.modalHeader = 'Login';
    this.modalHeaderChange.emit(this.modalHeader); 
  }

  register()
  {
    console.log(this.registerModel);
  }

}
