import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { IdoctorInfo, IHospitalInfo, IAppointmentInfo, Iuser } from './imodel'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  private apibaseurl : string =  window.location.protocol.toString() + "//" + window.location.hostname + ':8080/';
  //private apibaseurl : string = 'http://ec2-54-157-237-224.compute-1.amazonaws.com:8080/';

  
  
  constructor(private _http : Http) { }

  getHeader() : RequestOptions {
    let headers = new Headers();  
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer '+sessionStorage.getItem("authToken"));
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  postRegistrationDetails(ControllerName: string, BodyInfo: string) : Observable<string> {
    return this._http.post(this.apibaseurl+ControllerName, BodyInfo, this.getHeader())
                     .map((response : Response) => response["_body"])
                     .catch(this.handleApiError);
  }

  postLoginDetails(ControllerName: string, BodyInfo: string) : Observable<Iuser> {
    return this._http.post(this.apibaseurl+ControllerName, BodyInfo, this.getHeader())
                     .map((response : Response) => response)
                     .catch(this.handleApiError);
  }

  getSearchIDResult(ControllerName: string, Id : string) : Observable<string> {
    return this._http.get(this.apibaseurl+ControllerName+"/get?id="+Id)
                     .map((response : Response) => <string>response.json())
                     .catch(this.handleApiError);

  }

  getDoctorDetails(ControllerName: string, Id : string) : Observable<IdoctorInfo> {
    return this._http.get(this.apibaseurl+ControllerName+"/get?id="+Id)
                     .map((response : Response) => <IdoctorInfo>response.json())
                     .catch(this.handleApiError);
  }

  getHospitalDetails(ControllerName: string, Id : string, Type : string) : Observable<IHospitalInfo> {
    return this._http.get(this.apibaseurl+ControllerName+"/get?id="+Id+"&type="+Type)
                     .map((response : Response) => <IHospitalInfo>response.json())
                     .catch(this.handleApiError);
  }

  postAppointmentDetails(ControllerName: string, BodyInfo: string) : Observable<IAppointmentInfo> {
    return this._http.post(this.apibaseurl+ControllerName, BodyInfo, this.getHeader())
                     .map((response : Response) => <IAppointmentInfo>response.json())
                     .catch(this.handleApiError);
  }
    
  handleApiError(error: Response){
    //console.error("This is custom error :"+error['_body']);
    return Observable.throw(error);
  }
}
