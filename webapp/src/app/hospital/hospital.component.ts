import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IdoctorInfo, IHospitalInfo, IAppointmentInfo } from '../imodel';
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
  arrowSignAppt = 'up';
  divStatus : string = 'showButton';
  showError : boolean = false;

  docInfo : IdoctorInfo;
  hospInfo : IHospitalInfo;
  apptInfo : IAppointmentInfo;

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
          (result) => {this.hospInfo = result;},
          (error) => {this._router.navigateByUrl('/Home');}
        );
    
    // if(sessionStorage.getItem('UserProfile')){
    //   this._apiservice.postAppointmentDetails('Appointment/ConfigAppt', JSON.stringify(""))
    //       .subscribe(
    //         (result) => {this.apptInfo = result;},
    //         (error) => {this._router.navigateByUrl('/Home');}
    //       );
    // }
  }

  takeAppointment(){
    if(!sessionStorage.getItem('userProfile')){ //user not logged in
      this.divStatus = 'showButton';
      this.showError = true;
    }
    else if(sessionStorage.getItem('apptDetails')) //user logged with active appointment
      this.divStatus = 'showDetails';
    else //user logged in but no active appointment
      this.divStatus = 'showForm';
  }
}
