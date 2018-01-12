import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  firstName = 'Tom';
  lastName = 'Hopkins';
  gender = 'Male';
  age = '35';
  constructor() { }

  ngOnInit() {
  }

}
