import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  SearchID : string = sessionStorage.getItem('SearchID');
  constructor() { }

  ngOnInit() {
  }

}
