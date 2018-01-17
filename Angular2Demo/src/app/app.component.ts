import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageHeader = 'Employee details';
  isDisables = true;
  getFullName():string{
    return this.pageHeader;
  }
}
