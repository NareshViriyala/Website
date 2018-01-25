import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpValue: string;
  regSuccess : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  sendOtp(){
    this.regSuccess = true; 
    console.log(this.otpValue);
  }

}
