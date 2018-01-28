import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  modalHeader : string = 'Login';
  loginStatus : string = 'Sign In'

  constructor(private _router : Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("Id"))
      this.loginStatus = 'Logout';
  }

  headerFromModal(headerValue : string):void{
    this.modalHeader = headerValue;
  }

  logout():void{
    this.loginStatus = 'Sign In';
    sessionStorage.clear();
    this._router.navigateByUrl('/');
  }

}
