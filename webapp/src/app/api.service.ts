import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { IdoctorInfo } from './imodel'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()
export class ApiService {

  private apibaseurl : string = 'http://localhost/';
  constructor(private _http : Http) { }

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
    
  handleApiError(error: Response){
    console.error("This is custom error :"+error);
    return Observable.throw(error);
  }
}
