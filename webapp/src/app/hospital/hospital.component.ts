import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IdoctorInfo, IHospitalInfo } from '../imodel';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  SearchID : string = sessionStorage.getItem('SearchID');
  arrowSignDoc = 'down';
  arrowSignHosp = 'down';
  arrowSignAppt = 'down';
  apptStatus : boolean = false;

  docInfo : IdoctorInfo;
  hospInfo : IHospitalInfo;
  constructor(private _apiservice : ApiService, private _router : Router) { }

  ngOnInit() {
    if(isNullOrUndefined(this.SearchID))
      this._router.navigateByUrl('/Home');

    this._apiservice.getDoctorDetails('Doctor', this.SearchID)
        .subscribe(
          (result) => {
            this.docInfo = result;
            //console.log(this.docInfo);
          },
          (error) => {
            //console.log(error);
            this._router.navigateByUrl('/Home');
          }
        );
    
    this._apiservice.getHospitalDetails('Hospital', this.SearchID, 'Doc')
        .subscribe(
          (result) => {
            this.hospInfo = result;
            //console.log(this.docInfo);
          },
          (error) => {
            //console.log(error);
            this._router.navigateByUrl('/Home');
          }
        );
  }
}
