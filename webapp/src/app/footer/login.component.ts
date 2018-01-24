import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  modalHeader : string;

  @Output() 
  modalHeaderChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  loginModel: any = {};
  loading : boolean = false;

  ngOnInit() {}

  changeModalHeader() {
    //event emitter going to Register modal
    this.modalHeader = 'Register';
    this.modalHeaderChange.emit(this.modalHeader); 
  }

  login(){
    console.log(this.loginModel);
  }

}
