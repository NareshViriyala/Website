import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  loginModel: any = {};
  registerModel: any = {};
  loading : boolean = false;

  ngOnInit() {
  }

  login(){
    console.log('login');
  }

  register()
  {
    console.log('register');
  }

}
