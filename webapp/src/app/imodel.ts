export interface IdoctorInfo {
    DocId:number;
    DocGUID:string;
    FirstName:string;
    LastName:string;
    Email:string;
    Phone:string;
    Fee:string;
    Specialty:string;
    Experience: string;
    HospId:number;
    RegisterDate:string;
}


export interface IHospitalInfo {
    HospId:number;
    Name:string;
    Address1:string;
    Address2:string;
    City:string;
    State:string;
    Zip:string;
    Country:string;
    Phone1: string;
    Email:string;
    WebSite:string;
}

export interface IAppointmentInfo {
    ApptID:number;
    UserID:number;
    Name:string;
    Age:string;
    Gender:string;
    DocId:number;
    ApptTime:string;
    StartTime:string;
    EndTime:string;
    IsCancelled: number;
    IsServerMap:boolean;
    UType:string;
    Remark:string;
}