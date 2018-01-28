import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAppointmentInfo } from '../imodel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  @Input()
  apptInfo:IAppointmentInfo;

  @Output()
  FormButtonClicked : EventEmitter<IAppointmentInfo> = new EventEmitter<IAppointmentInfo>();

  loading : boolean = false;

  onCancelButtonClick(){
    this.FormButtonClicked.emit(this.apptInfo);
  }

  onSubmitButtonClick(){
    //call web api for appointment
    this.loading = true;
    this._apiservice.postSetAppointment('Appointment/ConfigAppt', JSON.stringify(this.apptInfo))
        .subscribe(
          (result) => {
            this.loading = false;
            this.apptInfo = JSON.parse(result['_body']);
            this.FormButtonClicked.emit(this.apptInfo);
            //console.log("Success : "+JSON.stringify(this.apptInfo));
          },
            (error) => {
              //console.log("Error : "+error);
              this.loading = false; 
              this.FormButtonClicked.emit(this.apptInfo);
            }
          );
    
  }

  constructor(private _apiservice : ApiService) { }

  ngOnInit() {
  }

}
