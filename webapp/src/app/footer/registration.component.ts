import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

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
  registrationError : boolean = false;
  registrationErrorMsg : string;

  constructor(private _apiservice : ApiService) { }

  ngOnInit() {}

  changeModalHeader() {
    //event emitter going back to login modal
    this.modalHeader = 'Login';
    this.modalHeaderChange.emit(this.modalHeader); 
  }

  register()
  {
    this.loading = true;
    //console.log(JSON.stringify(this.registerModel));
    this._apiservice.postRegistrationDetails('Users/Register', JSON.stringify(this.registerModel))
        .subscribe(
          (result) => {
            if(result.toLowerCase() === 'resigtration successful'){
              this.registrationError = true;
              //go to otp Modal
              document.getElementById('otpModal').click();
            } 
            else{
              this.registrationErrorMsg = result;
              this.registrationError = true;
            }
            this.loading = false; 
          },
          (error) => {
            console.log("Error : "+error.message);
            this.registrationErrorMsg = error.message;
            this.registrationError = true;
            this.loading = false; 
          }
        );
  }

}
