import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Iuser } from '../imodel';
import { ApiService } from '../api.service';

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

  constructor(private _apiservice : ApiService) {}

  loginErrorMsg: string;
  loginError: boolean = false;

  loginModel: any = {"phone":"9985265352","password":"1253"};
  loading : boolean = false;
  user : Iuser;

  ngOnInit() {}

  changeModalHeader() {
    //event emitter going to Register modal
    this.modalHeader = 'Register';
    this.modalHeaderChange.emit(this.modalHeader); 
  }

  login(){
    //console.log(this.loginModel);
    this.loading = true;
    this.loginError = false;

    //console.log(JSON.stringify(this.registerModel));
    this._apiservice.postLoginDetails('Users/Authenticate', JSON.stringify(this.loginModel))
        .subscribe(
          (result) => {
            this.loading = false;
            this.user = JSON.parse(result['_body']);
            sessionStorage.setItem("Id", this.user.id.toString());
            sessionStorage.setItem("FirstName", this.user.firstName);
            sessionStorage.setItem("LastName", this.user.lastName);
            sessionStorage.setItem("Email", this.user.email);
            sessionStorage.setItem("Phone", this.user.phone.toString());
            sessionStorage.setItem("Token", this.user.token);
            //console.log("Success : "+this.user);
          },
          (error) => {
            //console.log("Error : "+error);
            this.loading = false; 
            this.loginErrorMsg = error['_body'];
            this.loginError = true;
          }
        );
  }

}
