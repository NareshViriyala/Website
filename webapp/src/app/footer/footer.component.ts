import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  modalHeader : string = 'Login';

  constructor() { }

  ngOnInit() {
  }

  headerFromModal(headerValue : string):void{
    this.modalHeader = headerValue;
  }

}
