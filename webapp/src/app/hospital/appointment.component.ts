import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAppointmentInfo } from '../imodel';

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

  onCancelButtonClick(){
    this.FormButtonClicked.emit(this.apptInfo);
  }

  onSubmitButtonClick(){
    //call web api for appointment
    this.FormButtonClicked.emit(this.apptInfo);
  }

  constructor() { }

  ngOnInit() {
  }

}
