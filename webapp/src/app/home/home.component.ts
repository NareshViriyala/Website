import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home', //this line is not required as this is being fed thru route
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  btnValue : string = 'Search';
  tbxvalue : string = null;
  btnstatus : boolean = false;
  isError : boolean = false;
  statusmessage:string;

  constructor(private _apiservice : ApiService, private _router : Router) { }

  ngOnInit() {}

  searchClick():void{
    if(isNullOrUndefined(this.tbxvalue))
      return;
    this.btnstatus = true;
    this.btnValue = 'Searching...';
    this._apiservice.getSearchIDResult('Search', this.tbxvalue)
        .subscribe(
          (result) => {
            this.btnstatus = false;
            this.btnValue = 'Search';
            if(result['Type'] == 'None')
            {
              this.statusmessage = 'No result found';
              this.isError = true
              return;
            }
            sessionStorage.setItem("SearchID",this.tbxvalue);
            this._router.navigateByUrl('/'+result['Type']);
            //console.log("Search type = "+result['Type']);  
          },
          (error) => {
            this.btnstatus = false;
            this.btnValue = 'Search';
            this.isError = true
            this.statusmessage = 'Something wrong, please try after some time';
          }
        );
      
  }
}
