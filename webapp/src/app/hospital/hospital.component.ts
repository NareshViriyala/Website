import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IdoctorInfo, IHospitalInfo, IAppointmentInfo, Iuser, IDocQStatus } from '../imodel';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  // templateUrl: './apptdetails.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  SearchID : string = sessionStorage.getItem('SearchID');
  arrowSignDoc = 'down';
  arrowSignHosp = 'down';
  arrowSignAppt = 'up';
  divStatus : string = 'showButton';
  showError : boolean = false;
  loading : boolean = false;

  docInfo : IdoctorInfo ;
  hospInfo : IHospitalInfo;
  docQSts : IDocQStatus;
  apptInfo : IAppointmentInfo= {"ApptID":0,"UserID":0,"Name":'',Age:'',"Gender":'',"DocId":0,"ApptTime":'',"StartTime":''
                               ,"EndTime":'',"IsCancelled":0,"IsServerMap":false,"UType":'',"Remark":''};

  constructor(private _apiservice : ApiService, private _router : Router) { 
    
  }

  ngOnInit() {
    if(isNullOrUndefined(this.SearchID))
      this._router.navigateByUrl('/Home');
    

    //get the doctor details
    this._apiservice.getDoctorDetails('Doctor', this.SearchID)
        .subscribe(
          (result) => {
            this.docInfo = result;
            this.apptInfo.DocId = this.docInfo.DocId;
            //console.log(this.docInfo);
          },
          (error) => {
            //console.log(error);
            this._router.navigateByUrl('/Home');
          }
        );
    


    //get the hospital details
    this._apiservice.getHospitalDetails('Hospital', this.SearchID, 'Doc')
        .subscribe(
          (result) => {this.hospInfo = result;},
          (error) => {this._router.navigateByUrl('/Home');}
        );
    
    //if user logged in then get the appointment details if exists    
    if(sessionStorage.getItem('Id')){
      this.apptInfo.UserID = parseInt(sessionStorage.getItem('Id'));
      this.apptInfo.DocId = parseInt(this.SearchID);
      this.apptInfo.UType = 'Get';
      this._apiservice.postSetAppointment('Appointment/ConfigAppt', JSON.stringify(this.apptInfo))
          .subscribe(
            (result) => {
              this.apptInfo = JSON.parse(result['_body']);
              this.apptInfo.UType = '';
              if (this.apptInfo.ApptID != 0)
                this.divStatus = 'showDetails';
              else
                this.divStatus = 'showButton';
              //console.log("Success : "+JSON.stringify(this.apptInfo));
            },
              (error) => {
                //console.log("Error : "+error);
                this.loading = false;
              }
          );

      this._apiservice.getDocQStatus('Appointment/DocQCount', this.SearchID)
          .subscribe(
            (result) => {
              this.docQSts = JSON.parse(result['_body']);
              //console.log(this.docQSts);
            },
            (error) => {console.log(error)}
          );
    }
    //if user not logged in then get the general doctor q count
    else{
      this._apiservice.getDocQStatus('Appointment/DocQCount', this.SearchID)
          .subscribe(
            (result) => {
              this.docQSts = JSON.parse(result['_body']);
              //console.log(this.docQSts);
            },
            (error) => {console.log(error)}
          );
    }
  }

  cancelAppointment(){
    this.apptInfo.IsCancelled = 2;
    this.apptInfo.IsServerMap = false;
    this.apptInfo.UType = 'Cancel';
    this.loading = true;
    this._apiservice.postSetAppointment('Appointment/ConfigAppt', JSON.stringify(this.apptInfo))
        .subscribe(
          (result) => {
            this.apptInfo = JSON.parse(result['_body']);
            this.apptInfo.ApptID = 0;
            this.divStatus = 'showButton';
            this.loading = false;
            document.getElementById('btnCancel').click();
            //console.log("After cancel : "+JSON.stringify(this.apptInfo));
          },
            (error) => {
              //console.log("Error : "+error);
              this.loading = false;
            }
          );
  }

  takeAppointment(){
    if(!sessionStorage.getItem('Id')){ //user not logged in
      this.divStatus = 'showButton';
      this.showError = true;
    }
    else if(this.apptInfo.ApptID != 0) //user logged with active appointment
      this.divStatus = 'showDetails';
    else {//user logged in but no active appointment
      this.apptInfo.UserID = parseInt(sessionStorage.getItem('Id'));
      this.divStatus = 'showForm';
    }
  }

  apptStatusChanges(response : IAppointmentInfo): void {
    this.apptInfo = response;
    //console.log(this.apptInfo);

    if(this.apptInfo.ApptID == 0)
      this.divStatus = 'showButton';
    else
      this.divStatus = 'showDetails';
  }
}
